//const httpStatus = require('http-status');
const Promise = require('bluebird');
const Article = require('./article.model');
const glob = require("glob");
const config = require('../config/index');
const path = require('path');
const fs = require('fs');
const DUPLICATED_ARTICLE_CODE = 11000;

/**
 * Parse articles present in json and save them in db
 * @param json
 * @returns {Promise<void>}
 */
async function parseFileContent(json) {
    const parsed = JSON.parse(json);
    let index = 0;
    let article;

    while (index < parsed.length) {
        try {
            article = new Article({
                title: parsed[index].title,
                description: parsed[index].description,
                author: parsed[index].author,
                summary: parsed[index].summary,
                link: parsed[index].link,
                categories: parsed[index].categories,
                publishDate: new Date(parsed[index].pubDate),
            });
            await article.save();
        } catch (e) {
            if (e.code !== DUPLICATED_ARTICLE_CODE) {
                console.log('Error parsing: ', article.title ? article.title : '?');
                console.log(' = ', e.message);
            }
        }
        index++;
    }
}


/**
 * Read articles and save them in db
 */
function readArticleFiles() {
    glob(`${path.join(__dirname)}/..${config.articlesDirectory}/*.json`, (err, files) => {
        if (!err) {
            files.forEach(file => {
                fs.readFile(file, 'utf8', async (errRead, json) => { // Read each file
                    if (errRead) {
                        console.log(errRead);
                    } else {
                        await parseFileContent(json);
                    }
                });
            });
        }
    });
}

/**
 * Load article and append to req.
 */
function load(req, res, next, id) {
    Article.get(id)
        .then((article) => {
            req.article = article; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
}

/**
 * Load article and append to req.
 */
function deleteArticle(req, res, next) {
    const {articleId} = req.params;

    Article.get(articleId)
        .then((article) => {
            article.delete().then((article) => {
                res.json(article)
            });
        })
        .catch(e => next(e));
}

/**
 * Get article
 * @returns {Article}
 */
function get(req, res) {
    return res.json(req.article);
}

/**
 * Get article list.
 * @property {number} req.query.skip - Number of articles to be skipped.
 * @property {number} req.query.limit - Limit number of articles to be returned.
 * @returns {Article[]}
 */
async function list(req, res, next) {
    const {limit = 50, skip = 0} = req.query;


    Article.list({limit, skip})
        .then(articles => res.json(articles))
        .catch(e => next(e));

}

module.exports = {load, get, list, deleteArticle, readArticleFiles};
