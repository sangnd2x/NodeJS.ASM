const API_KEY = '504b85f6fe0a10a9c7f35945e14e7ddf';
const user_token = '8qlOkxz4wq';

const requests = {
	fetchTrending: `http://localhost:5500/api/movies/trending/${user_token}`,
	fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
	fetchTopRated: `http://localhost:5500/api/movies/top-rate/${user_token}`,
	fetchActionMovies: `http://localhost:5500/api/movies/discover/28/${user_token}`,
	fetchComedyMovies: `http://localhost:5500/api/movies/discover/35/${user_token}`,
	fetchHorrorMovies: `http://localhost:5500/api/movies/discover/27/${user_token}`,
	fetchRomanceMovies: `http://localhost:5500/api/movies/discover/10749/${user_token}`,
	fetchDocumentaries: `http://localhost:5500/api/movies/discover/99/${user_token}`,
	fetchSearch: `http://localhost:5500/api/movies/search/${user_token}`,
};

export default requests;
