const express = require('express');
const articleCtrl = require('./article.controller');
const router = express.Router(); // eslint-disable-line new-cap

router.route('/article/list')
/** GET /article/list - Get list of articles */
    .get(articleCtrl.list)
    .delete(articleCtrl.list);

router.route('/article/:articleId')
    /** GET /api/article - Get article by id */
    .get(articleCtrl.get)
    /** DELETE /api/article/:articleId - set article as deleted */
    .delete(articleCtrl.deleteArticle);

/** Load locker when API with lockerId route parameter is hit */
router.param('articleId', articleCtrl.load);

module.exports = router;
