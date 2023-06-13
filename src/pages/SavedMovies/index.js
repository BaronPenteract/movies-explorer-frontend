import React from 'react';
import { useNavigate } from 'react-router-dom';

import MoviesCardList from '../../components/MoviesCardList';
import Preloader from '../../components/Preloader';
import SearchForm from '../../components/SearchForm';

const SavedMovies = () => {
  const navigate = useNavigate();

  const [isLoading, setIsloading] = React.useState(true);
  const [movieDatasList, setMovieDatasList] = React.useState([]);
  // пока так
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
        const readyData = [];

        res.map((item, idx) => {
          if (idx < 3) {
            readyData.push({ ...item, owner: { name: 'Me', _id: 42, email: 'email' } });
          }
        });

        setMovieDatasList(readyData);
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
        {isLoading ? <Preloader /> : <MoviesCardList movieDatasList={movieDatasList} />}
      </section>
    </>
  );
};

export default SavedMovies;
