const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express();
const createDomPurify = require('dompurify'); 
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('DB connection successful'));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use('/articles', articleRouter);

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ 
        createdAt: 'desc'
    });
    res.render('articles/index', { articles: articles });
});

app.listen(5000);
