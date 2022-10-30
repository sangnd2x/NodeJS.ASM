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

const basicSearchPaging = (movies, page, limit, query) => {
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

const advancedSearchPaging = (movies, page, limit, query, genre, type, language) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const genreId = genre? GenreList.filter(gen => {
        if (genre === gen.name) {
            return gen;
        }
    })[0].id : null;

    const results = {};

    let totalResults = [];
    let outcome = [];

    outcome = movies.filter(movie => {
        const hasOverview = movie.overview?.toLowerCase().includes(query.toLowerCase());
        const hasTitle = movie.title?.toLowerCase().includes(query.toLowerCase());
        const hasGenre = genreId? movie.genre_ids?.includes(genreId) : null;
        const hasType = type? movie.media_type?.includes(type) : null;
        const hasLanguage = language? movie.original_language?.includes(language): null;

        if (type !== 'person') {
            // check for type if type not 'all'
            if (type !== 'all') {
                if (hasOverview || hasTitle) {
                    if (hasType === null && hasLanguage === null) {
                        if (hasGenre) {
                            return movie;
                        }
                    } else if (hasGenre === null && hasLanguage === null) {
                        if (hasType) {
                            return movie;
                        }
                    } else if (hasGenre === null && hasType === null) {
                        if (hasLanguage) {
                            return movie;
                        }
                    } else if (hasLanguage === null && hasGenre !== null && hasType !== null){ 
                        if (hasGenre && hasType) {
                            return movie;
                        }
                    } else if (hasLanguage !== null && hasGenre !== null && hasType === null){ 
                        if (hasGenre && hasLanguage) {
                            return movie;
                        }
                    } else if (hasLanguage !== null && hasGenre === null && hasType !== null){ 
                        if (hasLanguage && hasType) {
                            return movie;
                        }
                    } else if (hasGenre !== null && hasType !== null && hasLanguage !== null) {
                        if (hasGenre && hasType && hasLanguage) {
                            return movie;
                        }
                    }
                }
                // No need to check for type if type === 'all'
            } else {
                if (hasOverview || hasTitle) {
                    if (hasLanguage === null) {
                        if (hasGenre) {
                            return movie;
                        }
                    } else if (hasGenre === null && hasType === null) {
                        if (hasLanguage) {
                            return movie;
                        }
                    } else if (hasLanguage === null && hasGenre !== null){ 
                        if (hasGenre) {
                            return movie;
                        }
                    } else if (hasLanguage !== null && hasGenre !== null){ 
                        if (hasGenre && hasLanguage) {
                            return movie;
                        }
                    } else if (hasLanguage !== null && hasGenre === null ){ 
                        if (hasLanguage) {
                            return movie;
                        }
                    } else if (hasGenre !== null && hasLanguage !== null) {
                        if (hasGenre && hasLanguage) {
                            return movie;
                        }
                    }
                }
            }
        } else {
            if (movie.media_type === 'person') {
                if (movie.name?.toLowerCase().includes(query.toLowerCase())) {
                    return movie;
                }
            }
        }
    });

    // function to push all person's known_for to one array
    const res = () => {
        let first = outcome[0].known_for
        for (let i = 1; i < outcome.length; i++){
            first.push(...outcome[i].known_for);
        }
        return first
    }

    let result = []
    // sort arr result based on query
    if (type === 'person') {
        if (outcome.length !== 0) {
            result = res();
            if (genre && !language) {
                result = result.filter(res => res.genre_ids.includes(genreId));
            }
            if (!genre && language) {
                result = result.filter(res => res.original_language = language);
            }
        } else {
            result = outcome;
        }
        totalResults = result;
    } else {
        totalResults = outcome;
    }

    results.page = page;
    results.results = totalResults.slice(startIndex, endIndex);
    results.total_pages = Math.ceil(totalResults.length / limit);
    return results;
}

module.exports = {
    trendingPaging: trendingPaging,
    topRatePaging: topRatePaging,
    genresPaging: genresPaging,
    basicSearchPaging: basicSearchPaging,
    advancedSearchPaging: advancedSearchPaging
};