import React from 'react';

import MoviesCardList from '../../components/MoviesCardList';
import Preloader from '../../components/Preloader';
import SearchForm from '../../components/SearchForm';
import { filterMovies } from '../../utils/filterMovies';
import { getDeatFilmMovies } from '../../utils/MoviesApi';

const Movies = () => {
  let isSearched = React.useRef(false);
  const messageRef = React.useRef(HTMLDivElement);

  const [movies, setMovies] = React.useState([]);
  const [searchedMovies, setSearchedMovies] = React.useState([]);

  const [searchValue, setSearchValue] = React.useState('');
  const [isShortMovies, setIsShortMovies] = React.useState(true);

  const [isDataLoading, setIsDataloading] = React.useState(false);

  React.useEffect(() => {
    const moviesInLocalStorage = JSON.parse(localStorage.getItem('movies'));
    const searchValueInLocalStorage = localStorage.getItem('searchValue');
    const isShortMoviesInLocalStorage =
      localStorage.getItem('isShortMovies') === 'true' ? true : false;

    if (moviesInLocalStorage) {
      setMovies(moviesInLocalStorage);
      isSearched.current = true;
      console.log('Movies: ', moviesInLocalStorage);
    }

    if (searchValueInLocalStorage) {
      setSearchValue(searchValueInLocalStorage);
      console.log('Movies: ', searchValueInLocalStorage);
    }

    if (!isShortMoviesInLocalStorage) {
      setIsShortMovies(isShortMoviesInLocalStorage);
      console.log('Movies: ', isShortMoviesInLocalStorage);
    }
  }, []);

  React.useEffect(() => {
    if (isSearched.current && !searchedMovies.length) {
      messageRef.current.textContent = 'Ничего не найдено';
    }
  }, [searchedMovies]);

  const onSearchSubmit = async (value, isShortMoviesChecked, setIsSearchloading) => {
    messageRef.current.textContent = '';
    setIsDataloading(true);
    setIsSearchloading(true);

    if (!movies.length) {
      await getDeatFilmMovies()
        .then((res) => {
          setMovies(res);
          setSearchedMovies(filterMovies(res, value, isShortMoviesChecked));
          localStorage.setItem('movies', JSON.stringify(res));
          isSearched.current = true;
        })
        .catch((err) => {
          messageRef.current.textContent =
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
          /* navigate('/error', { state: { statusCode: 500, message: err.message }, replace: true }); */
        });
    } else {
      setSearchedMovies(filterMovies(movies, value, isShortMoviesChecked));
    }

    localStorage.setItem('searchValue', value.toString());
    localStorage.setItem('isShortMovies', isShortMoviesChecked);
    setIsSearchloading(false);
    setIsDataloading(false);
    setIsShortMovies(isShortMoviesChecked);
    console.log('isShortMoviesChecked', isShortMoviesChecked);
  };
  console.log(isShortMovies);
  return (
    <>
      <SearchForm
        isShortMovies={isShortMovies}
        searchValue={searchValue}
        onSearchSubmit={onSearchSubmit}
      />
      <section className='container container_type_movie-list' aria-label='Список фильмов'>
        <div ref={messageRef}></div>
        {isDataLoading ? <Preloader /> : <MoviesCardList movies={searchedMovies} />}
      </section>
    </>
  );
};

export default Movies;
