import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

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
