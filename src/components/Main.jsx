import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { fetchShows, setSelectedGenre } from '../redux/showsSlice';
import '../styles/main.css';

function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shows = useSelector((state) => state.shows.shows);

  useEffect(() => {
    dispatch(fetchShows());
  }, [dispatch]);

  const selectedGenre = useSelector((state) => state.shows.selectedGenre);
  const genres = useSelector((state) => state.shows.genres);

  const handleGenreChange = (event) => {
    dispatch(setSelectedGenre(event.target.value));
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
}

export default Main;
