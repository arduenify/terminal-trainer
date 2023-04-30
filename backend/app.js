require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const passportConfig = require('./config/passport');

const API_PORT = process.env.API_PORT;

/**
 * Creates an Express application and adds some standard configuration.
 */
function initializeApp() {
    const app = express();

    passportConfig(passport);

    app.use(
        morgan(
            '\x1b[36m:method :url :status :response-time ms - :res[content-length] \x1b[0m',
        ),
    );

    app.use(passport.initialize());
    app.use(express.json());
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.use('/api', require('./routes/index'));

    app.listen(API_PORT, () => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`Listening at http://localhost:${API_PORT}/`);
        }
    });

    return app;
}

const app = initializeApp();
