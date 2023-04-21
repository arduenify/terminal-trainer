require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(
    morgan(
        '\x1b[36m:method :url :status :response-time ms - :res[content-length] \x1b[0m'
    )
);

app.get('/ping', (req, res) => {
    res.send();
});

app.listen(3000, () => {
    if (process.env.NODE_ENV === 'development') {
        console.log(
            'Terminal Trainer Backend Server is listening on port 3000.'
        );
    }
});
