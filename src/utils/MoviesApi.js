const getBeatFilmMovies = () => {
  return fetch('https://api.nomoreparties.co/beatfilm-movies').then((res) => {
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
