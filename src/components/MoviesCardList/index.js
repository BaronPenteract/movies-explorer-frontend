import React from 'react';

import {
  WIDTH_L,
  WIDTH_S,
  ITEMS_TO_SHOW_L,
  ITEMS_TO_SHOW_M,
  ITEMS_TO_SHOW_S,
  ITEMS_TO_LOAD_L,
  ITEMS_TO_LOAD_M,
  ITEMS_TO_LOAD_S,
} from '../../utils/constants';

import MovieCard from '../MovieCard';
import './index.css';

const MoviesCardList = ({ movies }) => {
  const [screenWidth, setScreenWidth] = React.useState(WIDTH_L);
  const [itemsToShow, setItemsToShow] = React.useState(ITEMS_TO_SHOW_L);
  const [itemsToLoad, setItemsToLoad] = React.useState(ITEMS_TO_LOAD_L);

  React.useEffect(() => {
    setScreenWidth(window.screen.width);

    window.onresize = () => {
      setTimeout(() => {
        setScreenWidth(window.screen.width);
      }, 1000);
    };

    return () => {
      window.onresize = null;
    };
  }, []);

  React.useEffect(() => {
    if (screenWidth >= WIDTH_L) {
      setItemsToShow(ITEMS_TO_SHOW_L);
      setItemsToLoad(ITEMS_TO_LOAD_L);
    } else if (screenWidth >= WIDTH_S) {
      setItemsToShow(ITEMS_TO_SHOW_M);
      setItemsToLoad(ITEMS_TO_LOAD_M);
    } else if (screenWidth < WIDTH_S) {
      setItemsToShow(ITEMS_TO_SHOW_S);
      setItemsToLoad(ITEMS_TO_LOAD_S);
    }
  }, [screenWidth]);

  let moviesList = [];
  movies.forEach((movieData, idx) => {
    if (idx + 1 > itemsToShow) {
      return;
    }

    moviesList.push(
      <li className='movie-list__item' key={movieData.id}>
        <MovieCard {...movieData} />
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
