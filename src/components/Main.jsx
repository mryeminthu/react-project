import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import '../styles/main.css';

const Main = () => {
  const [shows, setShows] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://api.tvmaze.com/shows')
      .then((response) => response.json())
      .then((data) => {
        setShows(data);
      });
  }, []);

  useEffect(() => {
    const allGenres = shows
      .map((show) => show.genres)
      .reduce((acc, genres) => [...acc, ...genres], []);
    const uniqueGenres = Array.from(new Set(allGenres));
    setGenres(uniqueGenres);
  }, [shows]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const filteredShows = selectedGenre
    ? shows.filter((show) => show.genres.includes(selectedGenre))
    : shows;

  return (
    <div className="main-container">
      <div className="left">
        <h2>Shows List</h2>
        <div className="people-list">
          {filteredShows.map((show) => (
            <div className="person-card" key={show.id}>
              <FontAwesomeIcon
                icon={faCircle}
                className="icon"
                onClick={() => {
                  navigate(`/details/${show.id}`);
                }}
              />
              <img src={show.image?.medium} alt={show.name} />
              <div className="person-info">
                <h3>{show.name}</h3>
                <p>{show.genres.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="right">
        <h2>Categories</h2>
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
        >
          <option value="">All</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Main;
