import React, { useState, useEffect } from 'react';

import Nav from '../../components/browse/Nav';
import SearchResult from '../../components/search/SearchResult';
import './Search.css';

const Search = () => {
	const [results, setReults] = useState([]);
	const [searchInput, setSearchInput] = useState('');
	const [searchGenre, setSearchGenre] = useState('');
	const [searchType, setSearchType] = useState('');
	const [searchLanguage, setSearchLanguage] = useState('');
	const [genres, setGenres] = useState([]);
	const [mediaTypes, setMediaTypes] = useState([]);
	const user_token = '8qlOkxz4wq';

	useEffect(() => {
		fetch(`http://localhost:5500/api/movies/genres/${user_token}`)
			.then(res => res.json())
			.then(data => setGenres(data))
			.catch(err => console.log(err));
		
		fetch(`http://localhost:5500/api/movies/media-types/${user_token}`)
			.then(res => res.json())
			.then(data => setMediaTypes(data))
			.catch(err => console.log(err));
	}, []);
	
	const handleSearch = () => {

		const data = { 
			query: searchInput,
			genre: searchGenre,
			type: searchType,
			language: searchLanguage
		}

		const postSearch = async () => {
			await fetch(`http://localhost:5500/api/movies/search/${user_token}`, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(res => res.json())
				.then(data => setReults(data.results))
				.catch(err => console.log(err));
		}
		
		postSearch();
	}
	
	const resetSearch = () => {
		setReults('');
		setSearchInput('');
		setSearchGenre('');
		setSearchType('');
		setSearchLanguage('');
	}

	return (
		<div className='app'>
			<Nav />
			<div className='s009'>
				<form>
					<div className='inner-form'>
						<div className='basic-search'>
							<div className='input-field'>
								<input
									type='text'
									placeholder='Type Keywords'
									onChange={(e) => setSearchInput(e.target.value)}
									value={searchInput}
								/>
								<div className='icon-wrap'>
									<svg
										className='svg-inline--fa fa-search fa-w-16'
										fill='#ccc'
										aria-hidden='true'
										data-prefix='fas'
										data-icon='search'
										role='img'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 512 512'>
										<path d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z'></path>
									</svg>
								</div>
							</div>
						</div>
						<div className='advance-search'>
							<div className='row third'>
								<div>
									<select name="genres" id="genres" value={searchGenre} onChange={(e) => setSearchGenre(e.target.value)}>
										<option hidden>Select Genre</option>
										{genres.map(genre => {
											return (
												<option value={genre.name} key={genre.id}>{genre.name}</option>
											);
										})}
									</select>
								</div>
								<div>
									<select name="mediaTypes" id="mediaTypes" value={searchType}  onChange={(e) => setSearchType(e.target.value)}>
										<option hidden>Select Type</option>
										{mediaTypes.map(type => {
											return (
												<option value={type} key={mediaTypes.indexOf(type)}>{type}</option>
											);
										})}
									</select>
								</div>
								<div>
									<select name="languages" id="languages" value={searchLanguage} onChange={(e) => setSearchLanguage(e.target.value)}>
										<option hidden>Select Language</option>
										<option value="en">English</option>
										<option value="jp">Japanese</option>
										<option value="kr">Korean</option>
									</select>
								</div>
								<div className='input-field'>
									<div className='result-count'>
										
									</div>
									<div className='group-btn'>
										<button
											className='btn-delete'
											onClick={resetSearch}
											type='button'
										>
											RESET
										</button>
										<button
											className='btn-search'
											type='button'
											onClick={() => handleSearch()}
										>SEARCH</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
			<SearchResult results={results} />
		</div>
	);
};

export default Search;
