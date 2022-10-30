const Genres = require('../models/genreList');
const MediaTypes = require('../models/mediaType');
const Movies = require('../models/moviesList');
const UserToken = require('../models/userToken');
const Videos = require('../models/videoList');
const { trendingPaging, topRatePaging, genresPaging, basicSearchPaging, advancedSearchPaging } = require('../utils/paging');
const GenreList = require('../data/genreList.json');
const VideosList = require('../data/videoList.json');

// get trending movies
exports.getTrendingMovies = (req, res, next) => {
    Movies.fetchAll(movies => {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = 20;
        const results = trendingPaging(movies, page, limit);
        res.statusCode = 200;
        res.send(results);
    });
}

// get top rate movies
exports.getTopRatingMovies = (req, res, next) => {
    Movies.fetchAll(movies => {
        const genreId = +req.params.genreId
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = 20;
        const results = topRatePaging(movies, page, limit, genreId);
        res.statusCode = 200;
        res.send(results);
    })
}

// get movies based on genreId, send error msg if no genreId found in the list
exports.getGenreMovies = (req, res, next) => {
    Movies.fetchAll(movies => {
        const genreId = +req.params.genreId;
        const isAvailable = GenreList.find(genre => genre.id === genreId);
        if (!isAvailable) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify({ msg: 'Not found that genre id' }));
            res.end();
            return;
        } else {
            const page = req.query.page ? parseInt(req.query.page) : 1;
            const limit = 20;
            const results = genresPaging(movies, page, limit, genreId);
            res.statusCode = 200;
            res.send(results);
        }
    })
}


// get movies based on genreId, send error msg if no genre params found
exports.getGenreMoviesError = (req, res, next) => {
    Movies.fetchAll(movies => {
        const path = req.path;

        if (path) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify({ msg: 'Not found genre params' }));
            res.end();
            return;
        }
    })
}

// get movies trailer
exports.getTrailer = (req, res, netx) => {
    Videos.fetchAll(video => {
        const filmId = +req.body.movieId;
        
        if (!filmId) {
            res.statusCode = 400;
            res.setHeader('Content-type', 'application/json');
            res.write(JSON.stringify({ msg: 'Not found filmId params' }));
            res.end();
            return;
        } else {
            const found = video.filter(video => video.id === filmId)[0];
            if (!found) {
                res.statusCode = 400;
                res.setHeader('Content-type', 'application/json');
                res.write(JSON.stringify({ msg: 'Not found video' }));
                res.end();
                return;
            } else {
                const isSuitable = found.videos.filter(vid => {
                    if (vid.official && vid.site === 'YouTube') {
                        if (vid.type === 'Trailer') {
                            return vid;
                        } else {
                            if (vid.type === 'Teaser') {
                                return vid;
                            }
                        }
                    }
                });
                if (isSuitable !== []) {
                    const latestPublishedDate = new Date(Math.max(...isSuitable.map(e => new Date(e.published_at)))).toISOString();
                    const latestTrailer = isSuitable.filter(s => s.published_at === latestPublishedDate);
                    res.statusCode = 200;
                    res.send(latestTrailer);
                } else {
                    res.statusCode = 400;
                    res.setHeader('Content-type', 'application/json');
                    res.write(JSON.stringify({ msg: 'Not found video' }));
                    res.end();
                    return;
                }
            }
        }
    })
}

// Search movies
exports.searchMovies = (req, res, next) => {
    Movies.fetchAll(movies => {
        const query = req.body.query;
        const genre = req.body.genre;
        const type = req.body.type;
        const language = req.body.language;

        if (!query || query === '') {
            res.statusCode = 400;
            res.setHeader('Content-type', 'application/json');
            res.write(JSON.stringify({ msg: 'Not found keyword parram' }));
            res.end();
            return
        } else {
            const page = req.query.page ? parseInt(req.query.page) : 1;
            const limit = 20;
            // basic search with no genre, type and language provided
            if (!genre && !type && !language) {
                const results = basicSearchPaging(movies, page, limit, query);
                res.statusCode = 200;
                res.send(results);
            }
            // advanced search with genre, type or language provided
            if (genre || type || language) {
                const results = advancedSearchPaging(movies, page, limit, query, genre, type, language);
                res.statusCode = 200;
                res.send(results);
            }
        }
    })
}

// Fetch all genres
exports.fetchAllGenres = (req, res, next) => {
    Genres.fetchAll(genres => {
        res.statusCode = 200;
        res.send(genres);
    })
}

// Fetch all media types
exports.fetchAllMediaType = (req, res, next) => {
    MediaTypes.fetchAll(media => {
        res.statusCode = 200;
        res.send(media);
    })
}