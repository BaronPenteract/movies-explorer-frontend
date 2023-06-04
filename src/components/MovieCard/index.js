import React from 'react';

import HeartSVG from '../svg/HeartSVG';
import CloseSVG from '../svg/CloseSVG';
import { minutesToHoursAndMinutes } from '../../utils/minutesToHoursAndMinutes';

import './index.css';

const MovieCard = ({
  id,
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  thumbnail,
  movieId,
  nameRU,
  nameEN,
  owner,
}) => {
  const [isLiked, setIsLiked] = React.useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    console.log('liked? ' + !isLiked);
  };

  const handleDeleteClick = () => {
    console.log('deleted');
  };

  return (
    <article>
      <div className='movie-card'>
        <div className='movie-card__header'>
          <img
            className='movie-card__image'
            src={'https://api.nomoreparties.co/' + image.url}
            alt={nameRU}
          />
        </div>
        <div className='movie-card__content'>
          <h2 className='movie-card__title'>{nameRU}</h2>
          {owner ? (
            <button
              className={`movie-card__button movie-card__button_type_delete`}
              onClick={handleDeleteClick}
            >
              <CloseSVG className={`movie-card__svg `} />
            </button>
          ) : (
            <button className={`movie-card__button`} onClick={handleLikeClick}>
              <HeartSVG
                className={`movie-card__svg ${isLiked ? 'movie-card__svg_type_heart-active' : ''}`}
              />
            </button>
          )}
        </div>
        <div className='movie-card__footer'>
          <span className='movie-card__duration'>{minutesToHoursAndMinutes(duration)}</span>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
