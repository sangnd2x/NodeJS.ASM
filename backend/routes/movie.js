const path = require('path');
const express = require('express');
const auth = require('../models/auth');

const movieController = require('../controller/movie');
const pagination = require('../utils/paging');

const router = express.Router();

// GET trending movies
router.get('/api/movies/trending/:token', auth.isAuthorized, movieController.getTrendingMovies);

// GET top rated movies 
router.get('/api/movies/top-rate/:token',auth.isAuthorized, movieController.getTopRatingMovies);

// GET movies based on genre
router.get('/api/movies/discover/:genreId/:token',auth.isAuthorized, movieController.getGenreMovies);

// GET movies based on genre but no genre params
router.get('/api/movies/discover/:token',auth.isAuthorized, movieController.getGenreMoviesError);

// POST movies trailer
router.post('/api/movies/video/:token',auth.isAuthorized, movieController.getTrailer);

// POST search movie
router.post('/api/movies/search/:token',auth.isAuthorized, movieController.searchMovies);

module.exports = router;