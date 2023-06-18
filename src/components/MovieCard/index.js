import React from 'react';

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
  updated_at,
  created_at,
  isMovieSaved,
  // вот этот будущий movie, который уже нынешний
  ...movie
}) => {
  const { /* _id, */ duration, image, trailerLink, nameRU } = movie;

  // стэйт для хранения _id в mongoDB
  const [currentMovieId, setCurrentMovieId] = React.useState(null);
  // добавлен фильм в базу или нет
  const [isAdded, setIsAdded] = React.useState(false);
  // тут понятно
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  // пока не разобрался, но при первом рендере, если записывать так:
  //
  // const [currentMovieId, setCurrentMovieId] = React.useState(movie._id);
  // const [isAdded, setIsAdded] = React.useState(isMovieSaved);
  //
  // currentMovieId === undefined
  // isAdded === undefined
  // поэтому здесь эти 2 useEffect'а
  React.useEffect(() => {
    setCurrentMovieId(movie._id);
  }, [movie._id]);

  React.useEffect(() => {
    setIsAdded(isMovieSaved);
  }, [isMovieSaved]);

  //------------------------------------------- добавление фильма в базу
  const handleAddClick = () => {
    setIsButtonDisabled(true);

    onAddMovie({
      ...movie,
      movieId: id,
      image: 'https://api.nomoreparties.co/' + image.url,
      thumbnail: 'https://api.nomoreparties.co/' + image.formats.thumbnail.url,
    })
      .then((res) => {
        //----------------здесь нам приходит _id, мы его записываем, для возможности дальйнейшего удаления
        setCurrentMovieId(res._id);

        setIsAdded(true);
        setIsButtonDisabled(false);
      })
      .catch(console.log);
  };

  const handleDeleteClick = () => {
    setIsButtonDisabled(true);

    onDeleteMovie(currentMovieId, setIsAdded).then((res) => {
      setCurrentMovieId(null);
      setIsButtonDisabled(false);
    });
  };

  console.log('RENDER', currentMovieId, movie._id);
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
