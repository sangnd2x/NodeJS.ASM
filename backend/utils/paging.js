const GenreList = require('../data/genreList.json');

const trendingPaging = (movies, page, limit) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const totalResults = movies.sort((a, b) => b.popularity - a.popularity);

    results.page = page;
    results.results = totalResults.slice(startIndex, endIndex);
    results.total_pages = totalResults.length / limit;
    return results;
};

const topRatePaging = (movies, page, limit) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const totalResults = movies.sort((a, b) => b.vote_average - a.vote_average);

    results.page = page;
    results.results = totalResults.slice(startIndex, endIndex);
    results.total_pages = totalResults.length / limit;
    return results;
};

const genresPaging = (movies, page, limit, genreId) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const totalResults = movies.filter(movie => {
        if (movie.genre_ids) {
            if (movie.genre_ids.includes(genreId)) {
                return movie;
            }
        }
    });

    results.page = page;
    results.results = totalResults.slice(startIndex, endIndex);
    results.total_pages = Math.ceil(totalResults.length / limit);

    const genre = GenreList.filter(genre => {
        if (genre.id === genreId) {
            return genre;
        }
    });
    results.genre_name = genre[0].name;
    return results;
};

const searchPaging = (movies, page, limit, query) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const totalResults = movies.filter(movie => {
        const hasOverview = movie.overview?.toLowerCase().includes(query.toLowerCase());
        const hasTitle = movie.title?.toLowerCase().includes(query.toLowerCase());

        if (hasOverview || hasTitle) {
            return movie;
        }
    });

    results.page = page;
    results.results = totalResults.slice(startIndex, endIndex);;
    results.total_pages = Math.ceil(totalResults.length / limit);
    return results;
}

module.exports = {
    trendingPaging: trendingPaging,
    topRatePaging: topRatePaging,
    genresPaging: genresPaging,
    searchPaging: searchPaging
};