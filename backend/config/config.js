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
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            searchPath: process.env.DB_SCHEMA,
        },
    },
};
