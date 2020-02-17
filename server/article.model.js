const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Article Schema
 */
const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        //required: true
    },
    summary: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        required: false,
        //default: []
    },
    publishDate: {
        type: Date,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
ArticleSchema.method({
    delete() {
        return new Promise((resolve, reject) => {
            this.update({content: undefined, deleted: true})
                .then(() => {
                    resolve(this.deleted === true ? httpStatus.OK : httpStatus.INTERNAL_SERVER_ERROR);
                })
                .catch((e) => reject(e));
        });
    },
});

/**
 * Statics
 */
ArticleSchema.statics = {
    /**
     * Get article
     * @param {ObjectId} id - The objectId of article.
     * @returns {Promise<Article, APIError>}
     */
    get(id) {
        return this.findById(id)
            .exec()
            .then((article) => {
                if (article) {
                    return article;
                }
                const err = new APIError('No such article exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    create(data) {
        const articleProperties = ['title', 'description', 'author', 'summary', 'link', 'categories', 'pubDate'];

        return new Promise((resolve, reject) => {
            if (!articleProperties.every(x => x in data))
                reject("Missing article information");
            const article = new this({
                title: data.title,
                description: data.description,
                author: data.author,
                summary: data.summary,
                link: data.link,
                categories: data.categories,
                publishDate: new Date(data.pubDate),
            });

            article.save((err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    },
    /**
     * List article in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of article to be skipped.
     * @param {number} limit - Limit number of article to be returned.
     * @returns {Promise<Article[]>}
     */
    list({skip = 0, limit = 50} = {}) {
        return this.find({deleted: false})
            .sort({publishDate: -1})
            .skip(+skip)
            .limit(+limit)
            .exec();
    }
};

/**
 * @typedef Article
 */
module.exports = mongoose.model('Article', ArticleSchema);
