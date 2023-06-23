import React from 'react';

import { BEATFILM_BASE_URL } from '../../utils/constants';

import HeartSVG from '../svg/HeartSVG';
import CloseSVG from '../svg/CloseSVG';
import { minutesToHoursAndMinutes } from '../../utils/minutesToHoursAndMinutes';

import './index.css';

const MovieCard = ({
  owner,
  onAddMovie,
  onDeleteMovie,
  // вытаскиваем id из будущего объекта movie, чтобы перезаписать его как movieId, т.к. в mongoDB нет id, а есть movieId...
  id,
  // +/- тоже самое для сдедующих 2х
  updated_at,
  created_at,
  isSavedMoviesPage,
  // вот этот будущий movie, который уже нынешний
  ...movie
}) => {
  const { duration, image, trailerLink, nameRU } = movie;

  // добавлен фильм в базу или нет
  const [isAdded, setIsAdded] = React.useState(false);
  // тут понятно
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  // пока не разобрался, но при первом рендере, если записывать так:
  //
  // const [isAdded, setIsAdded] = React.useState(!!owner);
  //
  // isAdded === undefined

  React.useEffect(() => {
    setIsAdded(!!owner);
  }, [owner]);

  //------------------------------------------- добавление фильма в базу
  const handleAddClick = () => {
    setIsButtonDisabled(true);

    onAddMovie(
      // немного корректируем объект movie, чтобы подогнать под требования базы данных
      {
        ...movie,
        movieId: id,
        image: BEATFILM_BASE_URL + '/' + image.url,
        thumbnail: BEATFILM_BASE_URL + '/' + image.formats.thumbnail.url,
      },
    )
      .then((res) => {
        setIsAdded(true);
      })
      .catch(console.log)
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  const handleDeleteClick = () => {
    setIsButtonDisabled(true);

    onDeleteMovie(movie._id)
      .then((res) => {
        setIsAdded(false);
      })
      .catch(console.error)
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  return (
    <article>
      <div className='movie-card'>
        <div className='movie-card__header'>
          <a href={trailerLink} target='_blank' rel='noreferrer'>
            <img
              className='movie-card__image'
              src={isAdded ? image : 'https://api.nomoreparties.co/' + image.url}
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
          {isSavedMoviesPage ? (
            <button
              className={`movie-card__button movie-card__button_type_delete`}
              onClick={handleDeleteClick}
              disabled={isButtonDisabled}
              type='button'
            >
              <CloseSVG className={`movie-card__svg `} />
            </button>
          ) : (
            <button
              className={`movie-card__button`}
              onClick={isAdded ? handleDeleteClick : handleAddClick}
              disabled={isButtonDisabled}
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
