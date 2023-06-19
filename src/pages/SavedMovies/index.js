import React from 'react';
import { useNavigate } from 'react-router-dom';

import MoviesCardList from '../../components/MoviesCardList';
import Preloader from '../../components/Preloader';
import SearchForm from '../../components/SearchForm';

import { NOTHING_FOUND_ERROR_MESSAGE } from '../../utils/constants';
import { filterMovies } from '../../utils/filterMovies';
import { getSavedMovies } from '../../utils/MainApi';

const SavedMovies = () => {
  const navigate = useNavigate();

  // -------------------------------------- was there a search?
  let isSearched = React.useRef(false);
  // ---------------------------- Div message element
  const messageRef = React.useRef(HTMLDivElement);
  const [isMassageActive, setIsMessageActive] = React.useState(false);

  const [isDataLoading, setIsDataloading] = React.useState(true);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [searchedMovies, setSearchedMovies] = React.useState([]);
  //------- search parameters
  const [searchParams, setSearchParams] = React.useState({ value: '', isShort: false });

  // загружаем мувики с нашего сервера
  React.useEffect(() => {
    getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
        setSearchedMovies(res);
      })
      .catch((err) => {
        navigate('/error', { state: { statusCode: 500, message: err.message }, replace: true });
      })
      .finally(() => {
        setIsDataloading(false);
      });
  }, [navigate]);

  //------------------------------------------------------------ check if nothing found
  React.useEffect(() => {
    if (isSearched.current && !searchedMovies.length) {
      setIsMessageActive(true);
      messageRef.current.textContent = NOTHING_FOUND_ERROR_MESSAGE;
    }
  }, [isSearched, searchedMovies]);
  //--------------------------------------------------------------------------------------------

  const deleteMovieFormSavedMovies = (_id) => {
    setSavedMovies((prev) => prev.filter((prevMovie) => prevMovie._id !== _id));
  };

  const onSearchSubmit = (searchParams, setIsSearchloading) => {
    setIsSearchloading(true);
    setIsDataloading(true);
    setIsMessageActive(false);

    setTimeout(() => {
      setSearchedMovies(filterMovies(savedMovies, searchParams));
      setSearchParams(searchParams);
      setIsSearchloading(false);
      setIsDataloading(false);
      isSearched.current = true;
      messageRef.current.textContent = '';
    }, 500);
  };

  return (
    <>
      <SearchForm
        searchParams={searchParams}
        onSearchSubmit={onSearchSubmit}
        canBeEmptyValue={true}
      />
      <section
        className='container container_type_saved-movie-list'
        aria-label='Список сохраненных фильмов'
      >
        <div
          className={`info-message ${isMassageActive ? 'info-message_active' : ''}`}
          ref={messageRef}
        ></div>
        {isDataLoading ? (
          <Preloader />
        ) : (
          messageRef.current.textContent === '' && (
            <MoviesCardList
              movies={searchedMovies}
              isSavedMoviesPage={true}
              deleteMovieFormSavedMovies={deleteMovieFormSavedMovies}
            />
          )
        )}
      </section>
    </>
  );
};

export default SavedMovies;
