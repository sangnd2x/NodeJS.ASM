const Genre = require('../models/genreList');
const Media = require('../models/mediaType');
const Movies = require('../models/moviesList');
const UserToken = require('../models/userToken');
const Videos = require('../models/videoList');
const { trendingPaging, topRatePaging, genresPaging, searchPaging } = require('../utils/paging');
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
        console.log(filmId);
        
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
                    console.log(latestTrailer)
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
        const regex = /\s/g;
        if (!query || query === '' || query.match(regex)) {
            res.statusCode = 400;
            res.setHeader('Content-type', 'application/json');
            res.write(JSON.stringify({ msg: 'Not found keyword parram' }));
            res.end();
            return
        } else {
            const page = req.query.page ? parseInt(req.query.page) : 1;
            const limit = 20;
            const results = searchPaging(movies, page, limit, query);
            res.statusCode = 200;
            res.send(results);
        }
    })
}