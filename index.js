const express = require('express');
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const config = require('./config/index');
const routes = require('./server/article.route');
const ArticleCtrl = require('./server/article.controller');
let app = express();

const startMongo = async () => {
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    await mongoose.connect(config.mongo.host, {
        useNewUrlParser: true,
        user: config.mongo.user,
        pass: config.mongo.password,
        authSource: 'admin'
    });
};

startMongo().then(() => {
    ArticleCtrl.readArticleFiles();
    app.use(cors());
    app.use('/api', routes);
    app.use(express.static(path.join(__dirname + '/client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
    app.listen(config.port, () => console.log('Server running on localhost:', config.port));
}).catch((e) => {
});
