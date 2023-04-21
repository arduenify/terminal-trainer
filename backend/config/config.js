require('dotenv').config();

module.exports = {
    development: {
        dialect: 'sqlite',
        storage: 'database.sqlite',
    },
    test: {
        dialect: 'sqlite',
        storage: ':memory:',
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false,
    },
};
