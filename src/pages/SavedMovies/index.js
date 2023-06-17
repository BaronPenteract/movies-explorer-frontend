import React from 'react';
import { useNavigate } from 'react-router-dom';

import MoviesCardList from '../../components/MoviesCardList';
import Preloader from '../../components/Preloader';
import SearchForm from '../../components/SearchForm';
import { getSavedMovies } from '../../utils/MainApi';

const SavedMovies = () => {
  const navigate = useNavigate();

  const [isLoading, setIsloading] = React.useState(true);
  const [movies, setMovies] = React.useState([]);
  // пока так
  React.useEffect(() => {
    getSavedMovies()
      .then((res) => {
        setMovies(res);
      })
      .catch((err) => {
        navigate('/error', { state: { statusCode: 500, message: err.message }, replace: true });
      })
      .finally(() => {
        setIsloading(false);
      });
  }, [navigate]);

  const onSearchSubmit = (setIsloading) => {
    setIsloading(true);
    setTimeout(() => {
      console.log('MoviesPage: searched');
      setIsloading(false);
    }, 1000);
  };

  return (
    <>
      <SearchForm onSearchSubmit={onSearchSubmit} />
      <section
        className='container container_type_saved-movie-list'
        aria-label='Список сохраненных фильмов'
      >
        {isLoading ? <Preloader /> : <MoviesCardList movies={movies} />}
      </section>
    </>
  );
};

export default SavedMovies;
