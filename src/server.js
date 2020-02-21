require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const movieData = require('./movie-data-small.json');

const app = express();

const morganSetting = process.env.NODE_ENV === 'production'? 'tiny' : 'common';
app.use(morgan(morganSetting));
app.use(helmet());
app.use(cors());

// endpoint ONLY responds when a valid Authorization header with Bearer API token value
app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_KEY;
  const authToken = req.get('Authorization');

  if(!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request'});
  }

  next();
});

function handleGetMovies(req, res) {
  let response = movieData; // our JSON data

  if (req.query.genre) {
    response = response.filter ( movie =>
      movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    );
  }
  if (req.query.country) {
    response = response.filter ( movie =>
      movie.country.toLowerCase().includes(req.query.country.toLowerCase())
    );
  }
  if (req.query.avg_vote) {
    response = response.filter ( movie =>
      Number(movie.avg_vote) >= Number(req.query.avg_vote)
    );
  }
  
  res.status(200).json(response);
}
// have search for genre/country/avg_vote
// api responds with an array of full movie entries for search results
// the endpoint should have security with CORS and best pracitce headers
app.get('/movie', handleGetMovies);
  

const PORT = process.env.PORT || 8000;
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