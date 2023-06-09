import React from 'react';

import { addMovie, getSavedMovies, removeMovie } from '../../utils/MainApi';

import MovieCard from '../MovieCard';
import './index.css';

const MoviesCardList = ({ movies, isSavedMoviesPage, deleteMovieFormSavedMovies }) => {
  const [moviesToShow, setMoviesToShow] = React.useState(movies);

  React.useEffect(() => {
    setMoviesToShow(movies);
  }, [movies]);

  //-------------------- сравниваем каждый фильм с каждым сохраненным фильмом, чтобы понять добавлен он или нет
  React.useEffect(() => {
    if (!isSavedMoviesPage) {
      getSavedMovies().then((res) => {
        if (res.length) {
          setMoviesToShow((prev) => {
            // перебираем предыдущее состояние и сравниваем, есть ли в нем фильмы из сохраненок
            // если есть меняем его на фильм из сохранений. Нет - оставляем
            return prev.map((prevMovie) => {
              let movie = prevMovie;

              res.forEach((savedMovie) => {
                if (prevMovie.id === savedMovie.movieId) {
                  movie = savedMovie;
                }
              });

              return movie;
            });
          });
        }
      });
    }
  }, [isSavedMoviesPage, movies]);
  //--------------------------------------------------------------------------

  const handleAddMovieClick = (movie) => {
    return addMovie(movie)
      .then((res) => {
        setMoviesToShow((prev) =>
          // ищем фильм и меняем его на фильм из сохранений (который прислал сервер)
          prev.map((movie) => {
            if (movie.id === res.movieId) {
              return res;
            }
            return movie;
          }),
        );
      })
      .catch(console.log);
  };

  const handleDeleteMovieClick = (_id) => {
    return removeMovie(_id)
      .then((res) => {
        if (isSavedMoviesPage) {
          // если страница с соханенными фильмами, то удаляем его со страницы
          setMoviesToShow((prev) => prev.filter((prevMovie) => prevMovie._id !== _id));
          deleteMovieFormSavedMovies(_id);
        } else {
          setMoviesToShow((prev) =>
            // если обычная страница с фильмами, то ищем удаленный фильм и меняем его на объект фильма с BeatFilms
            prev.map((prevMovie) => {
              let result = prevMovie;

              // ищем ту карточку, на которую нажали
              if (prevMovie._id === _id) {
                movies.forEach((movie) => {
                  // теперь ищем эту карточку в фильмах из BeatFilm, чтобы положить ее вместо удаленной, и, собсна, кладем
                  if (prevMovie.movieId === movie.id) {
                    result = movie;
                  }
                });
              }
              return result;
            }),
          );
        }
      })
      .catch(console.log);
  };

  // создаем массив из <li></li> элементов с фильмами
  const moviesList = [];
  moviesToShow.forEach((movieData, idx) => {
    moviesList.push(
      <li className='movie-list__item' key={movieData.id || movieData.movieId}>
        <MovieCard
          {...movieData}
          onAddMovie={handleAddMovieClick}
          onDeleteMovie={handleDeleteMovieClick}
          isSavedMoviesPage={isSavedMoviesPage}
        />
      </li>,
    );
  });

  return (
    <>
      <ul className='movie-list'>{moviesList}</ul>
    </>
  );
};

export default MoviesCardList;
