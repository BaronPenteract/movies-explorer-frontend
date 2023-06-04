import React from 'react';

import MoviesCardList from '../../components/MoviesCardList';
import Preloader from '../../components/Preloader';
import SearchForm from '../../components/SearchForm';

const SavedMovies = () => {
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
        setMovieDatasList(
          res.map((item) => ({ ...item, owner: { name: 'Me', _id: 42, email: 'email' } })),
        );
      })
      .catch(console.log)
      .finally(() => {
        setIsloading(false);
      });
  }, []);

  return (
    <>
      <SearchForm />
      {isLoading ? <Preloader /> : <MoviesCardList movieDatasList={movieDatasList} />}
    </>
  );
};

export default SavedMovies;
