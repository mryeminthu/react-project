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

  // Function to remove HTML tags from a string
  function stripHtmlTags(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  }

  // Split the show.summary into paragraphs and remove <b> tags
  const summaryParagraphs = show.summary.split('<p>').map((paragraph, index) => {
    // Generate a unique key based on the paragraph content
    const key = `${index}-${paragraph}`;
    // Remove closing </p> tags
    const cleanedParagraph = stripHtmlTags(paragraph).replace('</p>', '');

    return <p key={key}>{cleanedParagraph}</p>;
  });

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
          <h2>{show.name}</h2>
          <img src={show.image?.medium} alt={show.name} />
        </div>
        <div className="right-column">
          <p className="rating">
            Rating:
            {' '}
            {show.rating?.average}
          </p>
          <p>
            Language:
            {' '}
            {show.language}
          </p>
          {/* Display show.summary paragraphs */}
          <div className="summary">{summaryParagraphs}</div>
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
