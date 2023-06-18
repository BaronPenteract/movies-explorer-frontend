import React from 'react';
import { useScreenResize } from '../../hooks/useScreenResize';

import { addMovie, getSavedMovies, removeMovie } from '../../utils/MainApi';

import MovieCard from '../MovieCard';
import './index.css';

const MoviesCardList = ({ movies, isSaved }) => {
  const { itemsToShow, itemsToLoad, setItemsToShow } = useScreenResize();

  const [moviesToShow, setMoviesToShow] = React.useState(movies);

  React.useEffect(() => {
    setMoviesToShow(movies);
  }, [movies]);

  //-------------------- сравниваем каждый фильм с каждым сохраненным фильмом, чтобы понять добавлен он или нет
  React.useEffect(() => {
    if (!isSaved) {
      getSavedMovies().then((res) => {
        if (res.length) {
          setMoviesToShow((prev) => {
            let result = [];

            prev.forEach((movie) => {
              let item = movie;

              res.forEach((savedMovie) => {
                if (movie.id === savedMovie.movieId) {
                  item = { ...movie, _id: savedMovie._id };
                }
              });

              result.push(item);
            });

            return result;
          });
        }
      });
    }
  }, [isSaved, movies]);
  //--------------------------------------------------------------------------
  const handleAddMovieClick = (movie) => {
    return addMovie(movie); /* 
      .then((res) => {
        setMoviesToShow((prev) =>
          prev.map((movie) => {
            if (movie.id === res.movieId) {
              return { ...movie, _id: res._id };
            }
            return movie;
          }),
        );
        setIsAdded(true);
      })
      .catch(console.log); */
  };

  const handleDeleteMovieClick = (id, setIsAdded) => {
    return removeMovie(id)
      .then((res) => {
        if (isSaved) {
          setMoviesToShow((prev) => prev.filter((movie) => movie._id !== id));
        } else {
          setMoviesToShow((prev) =>
            prev.map((movie) => {
              if (movie._id === id) {
                delete movie._id;
              }
              return movie;
            }),
          );
        }
        setIsAdded(false);
      })
      .catch(console.log);
  };

  let moviesList = [];
  moviesToShow.forEach((movieData, idx) => {
    if (idx + 1 > itemsToShow) {
      return;
    }
    moviesList.push(
      <li className='movie-list__item' key={movieData.id || movieData.movieId}>
        <MovieCard
          {...movieData}
          onAddMovie={handleAddMovieClick}
          onDeleteMovie={handleDeleteMovieClick}
          isMovieSaved={movieData._id ? true : false}
        />
      </li>,
    );
  });

  const handleMoreButtonClick = () => {
    setItemsToShow(itemsToShow + itemsToLoad);
  };

  return (
    <>
      <ul className='movie-list'>{moviesList}</ul>
      {movies.length > itemsToShow ? (
        <button className='link more-movies-button' onClick={handleMoreButtonClick} type='button'>
          Ещё
        </button>
      ) : (
        ''
      )}
    </>
  );
};

export default MoviesCardList;
