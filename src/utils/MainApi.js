import { AUTHORIZATION_ERROR_MESSAGE, BASE_URL } from './constants';

const handleResponse = (result) => {
  if (result.ok) {
    return result.json();
  }

  return result.json().then((res) => Promise.reject(new Error(res.message)));
};

const register = ({ name, email, password }) => {
  return fetch(BASE_URL + '/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  }).then(handleResponse);
};

const login = ({ email, password }) => {
  return fetch(BASE_URL + '/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

const getUser = (token) => {
  return fetch(BASE_URL + '/users/me', {
    headers: {
      Accept: 'application/json',
      authorization: 'Bearer ' + token,
    },
  }).then(handleResponse);
};

const patchUser = ({ name, email }) => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    return Promise.reject(new Error(AUTHORIZATION_ERROR_MESSAGE));
  }

  return fetch(BASE_URL + '/users/me', {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({ name, email }),
  }).then(handleResponse);
};

const getSavedMovies = () => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    return Promise.reject(new Error(AUTHORIZATION_ERROR_MESSAGE));
  }

  return fetch(BASE_URL + '/movies', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      authorization: 'Bearer ' + token,
    },
  }).then(handleResponse);
};

const addMovie = (movie) => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    return Promise.reject(new Error(AUTHORIZATION_ERROR_MESSAGE));
  }

  return fetch(BASE_URL + '/movies', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(movie),
  }).then(handleResponse);
};

const removeMovie = (id) => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    return Promise.reject(new Error(AUTHORIZATION_ERROR_MESSAGE));
  }

  return fetch(BASE_URL + '/movies/' + id, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      authorization: 'Bearer ' + token,
    },
  }).then(handleResponse);
};

export { register, login, getUser, patchUser, getSavedMovies, addMovie, removeMovie };
