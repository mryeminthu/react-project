import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/details.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Details() {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setShow(data);
      });
  }, [id]);

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details-container">
      <div className="details-header">
        <Link to="/" className="back-link">
          <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
          {' '}
          Back
        </Link>
      </div>
      <div className="details-content">
        <div className="left-column">
          <img src={show.image?.medium} alt={show.name} />
        </div>
        <div className="right-column">
          <div className="name-rating-container">
            <h2>{show.name}</h2>
            <p className="rating">
              Rating:
              {' '}
              {show.rating?.average}
            </p>
          </div>
          <p>
            Language:
            {' '}
            {show.language}
          </p>
          <p className="summary">
            Summary:
            <br />
            {show.summary}
          </p>
          <p className="genres">
            Genres:
            {' '}
            {show.genres.join(', ')}
          </p>
          {show.officialSite && (
            <p className="official-site">
              <a href={show.officialSite} target="_blank" rel="noopener noreferrer">
                Official Site
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

Details.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      show: PropTypes.shape({
        image: PropTypes.shape({
          medium: PropTypes.string,
        }),
        name: PropTypes.string,
        language: PropTypes.string,
        summary: PropTypes.string,
        genres: PropTypes.arrayOf(PropTypes.string),
        rating: PropTypes.shape({
          average: PropTypes.number,
        }),
        officialSite: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Details;
