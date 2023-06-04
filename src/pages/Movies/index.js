import React from 'react';
import MoviesCardList from '../../components/MoviesCardList';
import Preloader from '../../components/Preloader';
import SearchForm from '../../components/SearchForm';

const Movies = () => {
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

export default Movies;
