import React from 'react';

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Footer from '../Footer';
import Header from '../Header';
import ProtectedRoute from '../ProtectedRoute';
import Main from '../../pages/Main';
import Movies from '../../pages/Movies';
import SavedMovies from '../../pages/SavedMovies';
import Register from '../../pages/Register';
import Login from '../../pages/Login';
import Profile from '../../pages/Profile';
import Error from '../../pages/Error';
import Preloader from '../Preloader';

import './index.css';

import { getUser, login, patchUser, register } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const App = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = React.useState(React.useContext(CurrentUserContext));

  const [isPageLoading, setIsPageloading] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);

  //-------------------------------------------------get user data
  React.useEffect(() => {
    const token = localStorage.getItem('jwt');

    const fetchUser = (token) => {
      return new Promise((resolve, reject) => {
        if (token) {
          return getUser(token)
            .then((res) => {
              setCurrentUser(res);
              setLoggedIn(true);
              resolve();
            })
            .catch(reject);
        }

        resolve();
      });
    };

    fetchUser(token)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsPageloading(false);
      });
  }, []);
  //-----------------------------------------------------------------------------------
  //----------------------------------------------------------------- on login
  const onLogin = ({ email, password }) => {
    return login({ email, password }).then((res) => {
      localStorage.setItem('jwt', res.token);

      return getUser(res.token).then((res) => {
        setCurrentUser(res);
        setLoggedIn(true);
        navigate('/movies', { replace: true });
      });
    });
  };
  //-----------------------------------------------------------------------------------
  //----------------------------------------------------------------- on Register
  const onRegister = ({ name, email, password }) => {
    return register({ name, email, password })
      .then((res) => {
        setCurrentUser(res);

        return login({ email, password });
      })
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', res.token);
        navigate('/movies', { replace: true });
      });
  };
  //-----------------------------------------------------------------------------------
  //----------------------------------------------------------------- on ProfileEdit
  const onProfileEdit = ({ name, email }) => {
    return patchUser({ name, email }).then((res) => {
      setCurrentUser(res);
      return res;
    });
  };
  //-----------------------------------------------------------------------------------
  //----------------------------------------------------------------- on SignOut
  const onSignOut = (setIsloading) => {
    setIsloading(true);
    setTimeout(() => {
      localStorage.removeItem('jwt');
      localStorage.removeItem('searchedMovies');
      localStorage.removeItem('searchParams');
      setCurrentUser(null);
      setIsloading(false);
      setLoggedIn(false);
      navigate('/');
    }, 500);
  };
  //-----------------------------------------------------------------------------------

  if (isPageLoading) {
    return (
      <div className='page'>
        <Preloader />
      </div>
    );
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route path='/signup' element={<></>} />
          <Route path='/signin' element={<></>} />
          <Route path='/error' element={<></>} />
          <Route path='/*' element={<Header loggedIn={loggedIn} />} />
        </Routes>
        <main className='content'>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route
              path='/movies'
              element={<ProtectedRoute loggedIn={loggedIn} element={Movies} />}
            />
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
            <Route
              path='/signin'
              element={loggedIn ? <Navigate to='/' replace /> : <Login onLogin={onLogin} />}
            />
            <Route
              path='/signup'
              element={
                loggedIn ? <Navigate to='/' replace /> : <Register onRegister={onRegister} />
              }
            />
            <Route path='/error' element={<Error />} />
            <Route path='/*' element={<Navigate to='/error' replace />} />
          </Routes>
        </main>
        <Routes>
          <Route path='/signup' element={<></>} />
          <Route path='/signin' element={<></>} />
          <Route path='/profile' element={<></>} />
          <Route path='/error' element={<></>} />
          <Route path='/*' element={<Footer />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
