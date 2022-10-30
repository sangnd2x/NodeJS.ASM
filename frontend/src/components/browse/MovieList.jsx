import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import movieTrailer from 'movie-trailer';
import MovieDetail from '../../components/browse/MovieDetail';
import './MovieList.css';

const base_url = 'https://image.tmdb.org/t/p/original';
const movies_limit = 10;
const user_token = '8qlOkxz4wq';

function MovieList({ title, fetchUrl, isLargeRow }) {
	const [movies, setMovies] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState('');
	const [selectedMovie, setSelectedMovie] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			setMovies(request.data.results);
			return request;
		}
		fetchData();
	}, [fetchUrl]);

	const handleClick = (movie) => {
		if (selectedMovie && selectedMovie.id === movie.id) {
			setSelectedMovie(null);
			setTrailerUrl('');
		} else {
			setSelectedMovie(movie);
			
			const data = {
				movieId: movie.id
			}

			const post = async () => {
				await fetch(`http://localhost:5500/api/movies/video/${user_token}`, {
					method: 'POST',
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json"
					}
				})
				.then(res => res.json())
				.then(data => {
					setTrailerUrl(`${data[0]?.key}`);
				})
				.catch(err => console.log(err));
			}

			post();
		}
	};

	return (
		<div className='row'>
			<h2 className="movie-list-title">{title}</h2>
			<div className='row_posters sc2'>
				{movies.map((movie) => {
					return (
						<img
							key={movie.id}
							onClick={() => handleClick(movie)}
							className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
							src={`${base_url}${
								isLargeRow ? movie.poster_path : movie.backdrop_path
							}`}
							alt={movie.name}
						/>
					);
				})}
			</div>
			<div style={{ padding: '40px' }}>
				{selectedMovie && <MovieDetail movieData={selectedMovie} movieTrailer={trailerUrl} />}
			</div>
		</div>
	);
}

export default MovieList;
