import React from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import Footer from '../Footer';
import Header from '../Header';
import ProtectedRoute from '../ProtectedRoute';
import Main from '../../pages/Main';
import Movies from '../../pages/Movies';
import SavedMovies from '../../pages/SavedMovies';
import Register from '../../pages/Register';

import './index.css';
import Login from '../../pages/Login';
import Profile from '../../pages/Profile';
import Error from '../../pages/Error';

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <main className='page'>
      <Routes>
        <Route path='/signup' element={<></>} />
        <Route path='/signin' element={<></>} />
        <Route path='/error' element={<></>} />
        <Route path='/*' element={<Header loggedIn={loggedIn} />} />
      </Routes>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<ProtectedRoute loggedIn={loggedIn} element={Movies} />} />
        <Route
          path='/saved-movies'
          element={<ProtectedRoute loggedIn={loggedIn} element={SavedMovies} />}
        />
        <Route path='/profile' element={<ProtectedRoute loggedIn={loggedIn} element={Profile} />} />
        <Route path='/signup' element={<Login />} />
        <Route path='/signin' element={<Register />} />
        <Route path='/error' element={<Error />} />
        <Route path='/*' element={<Navigate to='/error' />} />
      </Routes>
      <Routes>
        <Route path='/signup' element={<></>} />
        <Route path='/signin' element={<></>} />
        <Route path='/profile' element={<></>} />
        <Route path='/error' element={<></>} />
        <Route path='/*' element={<Footer />} />
      </Routes>
    </main>
  );
};

export default App;
