import { BEATFILM_BASE_URL, GET_BEATFILM_ERROR_MESSAGE } from './constants';

const getBeatFilmMovies = () => {
  return fetch(BEATFILM_BASE_URL + '/beatfilm-movies').then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(new Error(GET_BEATFILM_ERROR_MESSAGE));
    }
  });
};

export { getBeatFilmMovies };
