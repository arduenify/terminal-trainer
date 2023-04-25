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
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
            searchPath: process.env.DB_SCHEMA,
        },
    },
};
