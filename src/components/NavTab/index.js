import React from 'react';
import { Link } from 'react-router-dom';

import AccountSVG from '../svg/AccountSVG';

import './index.css';

const NavTab = () => {
  const [isBurgerActive, setIsBurgerActive] = React.useState(false);

  window.onresize = () => {
    setIsBurgerActive(false);
  };

  const closeByOverlay = (e) => {
    if (e.target === e.currentTarget) {
      setIsBurgerActive(false);
    }
  };

  const handleClickOnLink = () => {
    setIsBurgerActive(false);
  };

  return (
    <>
      <nav className={`nav-tab ${isBurgerActive ? 'nav-tab_active' : ''}`} onClick={closeByOverlay}>
        <div className='nav-tab__container'>
          <div className='nav-tab__films'>
            <Link
              className='link nav-tab__link nav-tab__link_type_main'
              to='/'
              onClick={handleClickOnLink}
            >
              Главная
            </Link>
            <Link
              className='link nav-tab__link nav-tab__link_type_films'
              to='/movies'
              onClick={handleClickOnLink}
            >
              Фильмы
            </Link>
            <Link
              className='link nav-tab__link nav-tab__link_type_saved-films'
              to='/saved-movies'
              onClick={handleClickOnLink}
            >
              Сохранённые фильмы
            </Link>
          </div>
          <Link className='link nav-tab__link-account' to='/profile' onClick={handleClickOnLink}>
            <AccountSVG className='nav-tab__svg' />
            <span>Аккаунт</span>
          </Link>
        </div>
      </nav>
      <button
        className={`burger ${isBurgerActive ? 'burger_active' : ''}`}
        type='button'
        onClick={() => setIsBurgerActive(!isBurgerActive)}
      >
        <span className={`burger__line ${isBurgerActive ? 'burger__line_active' : ''}`}></span>
      </button>
    </>
  );
};

export default NavTab;
