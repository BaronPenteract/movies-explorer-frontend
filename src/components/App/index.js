import React from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import Footer from '../Footer';
import Header from '../Header';
import ProtectedRoute from '../ProtectedRoute';
import Main from '../../pages/Main';
import Movies from '../../pages/Movies';
import SavedMovies from '../../pages/SavedMovies';

import './index.css';

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <div className='page'>
      <Header loggedIn={loggedIn} />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<ProtectedRoute loggedIn={loggedIn} element={Movies} />} />
        <Route
          path='/saved-movies'
          element={<ProtectedRoute loggedIn={loggedIn} element={SavedMovies} />}
        />
        <Route path='/*' element={<Navigate to='/' />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
