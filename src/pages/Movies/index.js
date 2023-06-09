import React from 'react';

import MoviesCardList from '../../components/MoviesCardList';
import Preloader from '../../components/Preloader';
import SearchForm from '../../components/SearchForm';

import { useScreenResize } from '../../hooks/useScreenResize';
import { GET_BEATFILM_ERROR_MESSAGE, NOTHING_FOUND_ERROR_MESSAGE } from '../../utils/constants';
import { filterMovies } from '../../utils/filterMovies';
import { getBeatFilmMovies } from '../../utils/MoviesApi';

const Movies = () => {
  const { itemsToShow, itemsToLoad, setItemsToShow } = useScreenResize();

  let isSearched = React.useRef(false); // -------------------------------------- was there a search?
  const messageRef = React.useRef(HTMLDivElement); // ---------------------------- Div message element
  const [isMassageActive, setIsMessageActive] = React.useState(false);

  const [beatFilmMovies, setBeatFilmMovies] = React.useState([]); // ----------------------------- loaded beatFilmMovies
  const [searchedMovies, setSearchedMovies] = React.useState([]); // ---------------- movies after search

  const [searchParams, setSearchParams] = React.useState({ value: '', isShort: false }); //------- search parameters

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
    // если список фильмов пустой в LS, то отображаем, что ничего не найдено
    if (searchParamsInLocalStorage && !searchedMoviesInLocalStorage.length) {
      isSearched.current = true;
    }
  }, []);
  //--------------------------------------------------------------------------------------------
  //------------------------------------------------------------ check if nothing found
  React.useEffect(() => {
    if (isSearched.current && !searchedMovies.length && !isDataLoading) {
      messageRef.current.textContent = NOTHING_FOUND_ERROR_MESSAGE;
      setIsMessageActive(true);
    }
  }, [isDataLoading, isSearched, searchedMovies]);
  //--------------------------------------------------------------------------------------------
  //------------------------------------------------------------- Search Submit Function
  const onSearchSubmit = async (searchParams, setIsSearchloading) => {
    messageRef.current.textContent = '';
    setIsDataloading(true);
    setIsSearchloading(true);
    setIsMessageActive(false);

    if (!beatFilmMovies.length) {
      await getBeatFilmMovies()
        .then((res) => {
          setBeatFilmMovies(res);
          setSearchedMovies(() => {
            const result = filterMovies(res, searchParams);
            localStorage.setItem('searchedMovies', JSON.stringify(result));
            return result;
          });
        })
        .catch((err) => {
          messageRef.current.textContent = GET_BEATFILM_ERROR_MESSAGE;
          setIsMessageActive(true);
          /* navigate('/error', { state: { statusCode: 500, message: err.message }, replace: true }); */
        });
    } else {
      setSearchedMovies(() => {
        const result = filterMovies(beatFilmMovies, searchParams);
        localStorage.setItem('searchedMovies', JSON.stringify(result));
        return result;
      });
    }

    isSearched.current = true;
    localStorage.setItem('searchParams', JSON.stringify(searchParams));
    setSearchParams(searchParams);

    // делаем задержку, чтобы пользователь не мог часто нажимать на поиск
    setTimeout(() => {
      setIsDataloading(false);
      setIsSearchloading(false);
    }, 1000);
  };
  //--------------------------------------------------------------------------------------------

  const moviesToShow = [];

  searchedMovies.forEach((serchedMovie, idx) => {
    if (idx + 1 > itemsToShow) {
      return;
    }
    moviesToShow.push(serchedMovie);
  });

  const handleMoreButtonClick = () => {
    // увеличиваем кол-во отображаемых элементов
    setItemsToShow(itemsToShow + itemsToLoad);
  };
  return (
    <>
      <SearchForm
        searchParams={searchParams}
        onSearchSubmit={onSearchSubmit}
        canBeEmptyValue={false}
        isDataLoading={isDataLoading}
      />
      <section className='container container_type_movie-list' aria-label='Список фильмов'>
        <div
          className={`info-message ${isMassageActive ? 'info-message_active' : ''}`}
          ref={messageRef}
        ></div>
        {isDataLoading ? (
          <Preloader />
        ) : (
          !isMassageActive && <MoviesCardList movies={moviesToShow} isSavedMoviesPage={false} />
        )}
      </section>
      {searchedMovies.length > itemsToShow && !isDataLoading ? (
        <button className='link more-movies-button' onClick={handleMoreButtonClick} type='button'>
          Ещё
        </button>
      ) : (
        ''
      )}
    </>
  );
};

export default Movies;
