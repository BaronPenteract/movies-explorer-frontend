import { BEATFILM_BASE_URL } from './constants';

const getBeatFilmMovies = () => {
  return fetch(BEATFILM_BASE_URL + '/beatfilm-movies').then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(
        new Error(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
        ),
      );
    }
  });
};

export { getBeatFilmMovies };
