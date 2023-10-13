import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowRightCircle } from 'react-icons/bs';
import { fetchShows, setSelectedGenre, fetchGenres } from '../redux/showsSlice';
import '../styles/main.css';

function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shows = useSelector((state) => state.shows.shows);

  useEffect(() => {
    dispatch(fetchShows());
    dispatch(fetchGenres());
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
    <>
      <div className="title-container">
        <div className="left-title">
          <h2 className="show-list">Shows List</h2>
        </div>

        <div className="right-title">
          <h2 className="categories">Categories</h2>
          <select value={selectedGenre} onChange={handleGenreChange}>
            <option value="">All</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="card-list">
        {filteredShows.map((show) => (
          <div className="movie-card" key={show.id}>
            <BsArrowRightCircle
              className="right-arrow"
              onClick={() => {
                navigate(`/details/${show.id}`);
              }}
            />
            <img src={show.image?.medium} alt={show.name} />
            <div className="movie-info">
              <h3 className="movie-title">{show.name}</h3>
              <p className="movie-type">{show.genres.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Main;
