const express = require('express');
const morgan = require('morgan');
const movieData = require('./movie-data-small');

const app = express();

app.use(morgan('dev'));

app.get('/movie', (req, res) => {
    res.status(200).json({ message: 'hello world'});
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Express is listening at http://localhost:${PORT}`)
});