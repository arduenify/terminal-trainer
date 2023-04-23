require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const passportConfig = require('./config/passport');

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

    app.use('/api', require('./routes/index'));

    app.listen(3000, () => {
        if (process.env.NODE_ENV === 'development') {
            console.log(
                'Terminal Trainer Backend Server is listening on port 3000.',
            );
        }
    });

    return app;
}

const app = initializeApp();
