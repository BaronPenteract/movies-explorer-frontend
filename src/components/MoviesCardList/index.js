import React from 'react';
import MovieCard from '../MovieCard';
import './index.css';

const MoviesCardList = ({ isSavedMovies, movieDatasList }) => {
  const [itemsToShow, setItemsToShow] = React.useState(16);

  /* const moviesList = movieDatasList.map((movieData, idx) => (
    <li className='movie-list__item' key={movieData._id}>
      <MovieCard {...movieData} />
    </li>
  )); */

  let moviesList = [];
  movieDatasList.forEach((movieData, idx) => {
    if (idx + 1 > itemsToShow) {
      return;
    }

    moviesList.push(
      <li className='movie-list__item' key={movieData.id}>
        <MovieCard {...movieData} isSavedMovies={isSavedMovies} />
      </li>,
    );
  });

  const handleMoreButtonClick = () => {
    setItemsToShow(itemsToShow + 8);
  };

  return (
    <section className='container container_type_movie-list' aria-label='Список фильмов'>
      <ul className='movie-list'>{moviesList}</ul>
      {movieDatasList.length > itemsToShow ? (
        <button className='link more-movies-button' onClick={handleMoreButtonClick}>
          Ещё
        </button>
      ) : (
        ''
      )}
    </section>
  );
};

export default MoviesCardList;
