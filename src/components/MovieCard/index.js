import React from 'react';

import HeartSVG from '../svg/HeartSVG';
import CloseSVG from '../svg/CloseSVG';
import { minutesToHoursAndMinutes } from '../../utils/minutesToHoursAndMinutes';

import './index.css';

const MovieCard = ({
  owner,
  onAddMovie,
  onDeleteMovie,
  id,
  updated_at,
  created_at,
  isMovieSaved,
  ...movie
}) => {
  const {
    _id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    movieId,
    nameRU,
    nameEN,
  } = movie;

  const [isAdded, setIsAdded] = React.useState(false);

  React.useEffect(() => {
    setIsAdded(isMovieSaved);
  }, [isMovieSaved]);

  const handleAddClick = () => {
    onAddMovie(
      {
        ...movie,
        movieId: id,
        image: 'https://api.nomoreparties.co/' + image.url,
        thumbnail: 'https://api.nomoreparties.co/' + image.formats.thumbnail.url,
      },
      setIsAdded,
    );
  };

  const handleDeleteClick = () => {
    onDeleteMovie(_id, setIsAdded);
  };
  return (
    <article>
      <div className='movie-card'>
        <div className='movie-card__header'>
          <a href={trailerLink} target='_blank' rel='noreferrer'>
            <img
              className='movie-card__image'
              src={owner ? image : 'https://api.nomoreparties.co/' + image.url}
              alt={nameRU}
            />
          </a>
        </div>
        <div className='movie-card__content'>
          <h2 className='movie-card__title'>
            <a className='link' href={trailerLink} target='_blank' rel='noreferrer'>
              {nameRU}
            </a>
          </h2>
          {owner ? (
            <button
              className={`movie-card__button movie-card__button_type_delete`}
              onClick={handleDeleteClick}
              type='button'
            >
              <CloseSVG className={`movie-card__svg `} />
            </button>
          ) : (
            <button
              className={`movie-card__button`}
              onClick={isAdded ? handleDeleteClick : handleAddClick}
              type='button'
            >
              <HeartSVG
                className={`movie-card__svg ${isAdded ? 'movie-card__svg_type_heart-active' : ''}`}
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
