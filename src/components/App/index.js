import React from 'react';

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = React.useState(true);

  const onLogin = (values, setIsloading) => {
    setIsloading(true);
    setTimeout(() => {
      console.log('App: logined');
      setIsloading(false);
      setLoggedIn(true);
      navigate('/movies');
    }, 1000);
  };

  const onRegister = (values, setIsloading) => {
    setIsloading(true);
    setTimeout(() => {
      console.log('App: registered');
      setIsloading(false);
      navigate('/signup');
    }, 1000);
  };

  const onProfileEdit = (values, setIsloading) => {
    setIsloading(true);
    setTimeout(() => {
      console.log('App: edited');
      setIsloading(false);
    }, 1000);
  };

  const onSignOut = (setIsloading) => {
    setIsloading(true);
    setTimeout(() => {
      console.log('App: signed out');
      setIsloading(false);
      setLoggedIn(false);
      navigate('/');
    }, 1000);
  };

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
        <Route
          path='/profile'
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              onProfileEdit={onProfileEdit}
              onSignOut={onSignOut}
              element={Profile}
            />
          }
        />
        <Route path='/signup' element={<Login onLogin={onLogin} />} />
        <Route path='/signin' element={<Register onRegister={onRegister} />} />
        <Route path='/error' element={<Error />} />
        <Route path='/*' element={<Navigate to='/error' replace />} />
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
