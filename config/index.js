const Joi = require('joi');
require('dotenv').config();

const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow(['development', 'production', 'test', 'provision'])
        .default('development'),
    PORT: Joi.number()
        .default(5000),
    ARTICLES_DIRECTORY: Joi.string()
        .default('/json-data'),
    MONGOOSE_DEBUG: Joi.boolean()
        .when('NODE_ENV', {
            is: Joi.string().equal('development'),
            then: Joi.boolean().default(true),
            otherwise: Joi.boolean().default(false)
        }),
    MONGO_AUTH: Joi.boolean()
        .default(true),
    MONGO_USER: Joi.string().required()
        .description('Mongo username required for auth'),
    MONGO_PWD: Joi.string().required()
        .description('Mongo password required for auth'),
    MONGO_HOST: Joi.string().default('mongodb://localhost:27017/')
}).unknown().required();

const {error, value: envVars} = Joi.validate(process.env, envVarsSchema);

if (error) {
    console.log(`Config validation error: ${error.message}`);
    throw `Config validation error: ${error.message}`;
}

const index = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    articlesDirectory: envVars.ARTICLES_DIRECTORY,
    mongooseDebug: envVars.MONGOOSE_DEBUG,
    mongo: {
        host: `${envVars.MONGO_HOST}-${envVars.NODE_ENV}`,
        user: envVars.MONGO_USER,
        password: envVars.MONGO_PWD
    }
};

module.exports = index;
