import React from 'react';
import { useNavigate } from 'react-router-dom';

import MoviesCardList from '../../components/MoviesCardList';
import Preloader from '../../components/Preloader';
import SearchForm from '../../components/SearchForm';

const Movies = () => {
  const navigate = useNavigate();

  const [movieDatasList, setMovieDatasList] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://api.nomoreparties.co/beatfilm-movies')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(new Error('что-то не так.'));
        }
      })
      .then((res) => {
        setMovieDatasList(res);
      })
      .catch((err) => {
        navigate('/error', { state: { statusCode: 500, message: err.message }, replace: true });
      })
      .finally(() => {
        setIsloading(false);
      });
  }, []);

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
      {isLoading ? <Preloader /> : <MoviesCardList movieDatasList={movieDatasList} />}
    </>
  );
};

export default Movies;
