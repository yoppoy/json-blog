process.env.NODE_ENV = 'test';

const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai');
const expect = chai.expect;
const app = require('../index');
const mongoose = require('mongoose');
const config = require('../config/');
const Article = require('./article.model');
const ArticleCtrl = require('./article.controller');

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.connection.close();
    done();
});

before((done) => {
    mongoose.connection.once('connected', () => {
        mongoose.connection.db.dropDatabase();
        done();
    });
});

describe('## Article testing', () => {
    describe('Article Model', () => {
        const articleData = {
            title: "Hello world",
            description: "Hello world this is special",
            author: "World",
            summary: "Blablabla",
            link: "......",
            categories: [],
        };
        it('should save an article in the database', (done) => {
            let Article = new Article(articleData);
            console.log(Article);
            /*request(app)
                .get('/api/user')
                .send(userCredentials)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.user.email)
                        .to
                        .equal(userCredentials.email);
                    expect(res.body.user.Token)
                        .to
                        .not
                        .equal(null);
                    jwt.verify(res.body.token, config.jwtSecret, (err, decoded) => {
                        expect(err).to.not.be.ok; // eslint-disable-line no-unused-expressions
                        expect(decoded.email)
                            .to
                            .equal(userCredentials.email);
                        user = res.body.user;
                        user.token = res.body.token;
                        done();
                    });
                });*/
        });
        /*it('should create an admin', (done) => {
            const initialAdmin = new User({
                name: 'admin',
                email: 'admin@test.gmail',
                scope: 'admin'
            });
            const adminCred = {
                name: 'admin',
                email: 'admin@testing.com',
                password: 'express'
            };

            request(app)
                .post('/api/admin')
                .send(adminCred)
                .set('Authorization', `Bearer ${initialAdmin.generateJWT()}`)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.user.email)
                        .to
                        .equal(adminCred.email);
                    expect(res.body.token)
                        .to
                        .not
                        .equal(null);
                    jwt.verify(res.body.token, config.jwtSecret, (err, decoded) => {
                        expect(err).to.not.be.ok;
                        expect(decoded.email)
                            .to
                            .equal(adminCred.email);
                        admin = res.body.user;
                        admin.token = res.body.token;
                        done();
                    });
                })
                .catch(done);
        });*/
    });
});
