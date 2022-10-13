import React from 'react';
import YouTube from 'react-youtube';

import './MovieDetail.css';

const opts = {
	height: '400',
	width: '100%',
	playerVars: {
		autoplay: 0,
	},
};

const MovieDetail = ({ movieTrailer, movieData }) => {
	const { release_date, title, name, overview, vote_average } = movieData;

	return (
		<div className='movie_detail'>
			<div className='movie_detail_data'>
				<h1>{title || name}</h1>
				<hr></hr>

				<h3>Release Date: {release_date}</h3>
				<h3>Vote: {vote_average} / 10</h3>
				<br></br>
				<p>{overview}</p>
			</div>
			<div className='movie_detail_trailer'>
				<YouTube
					videoId={movieTrailer}
					opts={opts}
				/>
			</div>
		</div>
	);
}

export default MovieDetail;
