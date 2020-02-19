require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const movieData = require('./movie-data-small');

const app = express();

app.use(morgan('dev'));

app.use(function validateBearerToken(req, res, next) {
    console.log('validate bearer token middleware');

    next();
});

function handleGetMovies(req, res) {
    res.status(200).json({ message: 'hello world'});
}
// have search for genre/country/avg_vote
// api responds with an array of full movie entries for search results
// endpoint ONLY responds when a valid Authorization header with Bearer API token value
// the endpoint should have security with CORS and best pracitce headers
app.get('/movie', handleGetMovies);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Express is listening at http://localhost:${PORT}`)
});


// Users can search for Movies by genre, country or avg_vote
// The search options for genre, country, and/or average vote are provided in query string parameters.
// When searching by genre, users are searching for whether the Movie's genre includes a specified string. The search should be case insensitive.
// When searching by country, users are searching for whether the Movie's country includes a specified string. The search should be case insensitive.
// When searching by average vote, users are searching for Movies with an avg_vote that is greater than or equal to the supplied number.
// The API responds with an array of full movie entries for the search results
// The endpoint only responds when given a valid Authorization header with a Bearer API token value.
// The endpoint should have general security in place such as best practice headers and support for CORS.