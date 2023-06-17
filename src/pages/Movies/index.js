import React from 'react';

import MoviesCardList from '../../components/MoviesCardList';
import Preloader from '../../components/Preloader';
import SearchForm from '../../components/SearchForm';
import { filterMovies } from '../../utils/filterMovies';
import { getBeatFilmMovies } from '../../utils/MoviesApi';

const Movies = () => {
  let isSearched = React.useRef(false); // -------------------------------------- was there a search?
  const messageRef = React.useRef(HTMLDivElement); // ---------------------------- Div message element

  const [movies, setMovies] = React.useState([]); // ----------------------------- loaded movies
  const [searchedMovies, setSearchedMovies] = React.useState([]); // ---------------- movies after search

  const [searchParams, setSearchParams] = React.useState({ value: '', isShort: true }); //------- search parameters

  const [isDataLoading, setIsDataloading] = React.useState(false); // ------------------ is data loading?

  //--------------------------------------------------------- check Local Storage
  React.useEffect(() => {
    const searchedMoviesInLocalStorage = JSON.parse(localStorage.getItem('searchedMovies'));
    const searchParamsInLocalStorage = JSON.parse(localStorage.getItem('searchParams'));

    if (searchedMoviesInLocalStorage) {
      setSearchedMovies(searchedMoviesInLocalStorage);
    }

    if (searchParamsInLocalStorage) {
      setSearchParams(searchParamsInLocalStorage);
    }
  }, []);
  //--------------------------------------------------------------------------------------------
  //------------------------------------------------------------ check if nothing found
  React.useEffect(() => {
    if (isSearched.current && !searchedMovies.length) {
      messageRef.current.textContent = 'Ничего не найдено';
    }
  }, [isSearched, searchedMovies]);
  //--------------------------------------------------------------------------------------------
  //------------------------------------------------------------- Search Submit Function
  const onSearchSubmit = async (searchParams, setIsSearchloading) => {
    messageRef.current.textContent = '';
    setIsDataloading(true);
    setIsSearchloading(true);

    if (!movies.length) {
      await getBeatFilmMovies()
        .then((res) => {
          setMovies(res);
          setSearchedMovies(() => {
            const result = filterMovies(res, searchParams);
            localStorage.setItem('searchedMovies', JSON.stringify(result));
            return result;
          });
        })
        .catch((err) => {
          messageRef.current.textContent =
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
          /* navigate('/error', { state: { statusCode: 500, message: err.message }, replace: true }); */
        });
    } else {
      setSearchedMovies(() => {
        const result = filterMovies(movies, searchParams);
        localStorage.setItem('searchedMovies', JSON.stringify(result));
        return result;
      });
    }

    isSearched.current = true;
    localStorage.setItem('searchParams', JSON.stringify(searchParams));
    setIsSearchloading(false);
    setIsDataloading(false);
    setSearchParams(searchParams);
  };
  //--------------------------------------------------------------------------------------------
  return (
    <>
      <SearchForm searchParams={searchParams} onSearchSubmit={onSearchSubmit} />
      <section className='container container_type_movie-list' aria-label='Список фильмов'>
        <div ref={messageRef}></div>
        {isDataLoading ? (
          <Preloader />
        ) : (
          messageRef.current.textContent === '' && (
            <MoviesCardList movies={searchedMovies} isSaved={false} />
          )
        )}
      </section>
    </>
  );
};

export default Movies;
