import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { fetchShow } from '../redux/showsSlice';
import '../styles/details.css';

function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const show = useSelector((state) => state.shows.selectedShow);

  useEffect(() => {
    dispatch(fetchShow(id));
  }, [dispatch, id]);

  if (!show) {
    return <div>Loading...</div>;
  }

  function stripHtmlTags(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  }

  const summaryParagraphs = show.summary.split('<p>').map((paragraph, index) => {
    const key = `${index}-${paragraph}`;
    const cleanedParagraph = stripHtmlTags(paragraph).replace('</p>', '');

    return <p key={key}>{cleanedParagraph}</p>;
  });

  return (
    <div className="details-container">
      <div type="button" className="back-container">
        <Link to="/" className="left-arrow">
          <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
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
          <p className="language">
            Language:
            {' '}
            {show.language}
          </p>
          <p className="summary">{summaryParagraphs}</p>
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

export default Details;
