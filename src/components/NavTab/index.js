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

  return (
    <>
      <nav className={`nav-tab ${isBurgerActive ? 'nav-tab_active' : ''}`} onClick={closeByOverlay}>
        <div className='nav-tab__container'>
          {' '}
          <div className='nav-tab__films'>
            <Link className='link nav-tab__link nav-tab__link_type_main' to='/'>
              Главная
            </Link>
            <Link className='link nav-tab__link nav-tab__link_type_films' to='/movies'>
              Фильмы
            </Link>
            <Link className='link nav-tab__link nav-tab__link_type_saved-films' to='/saved-movies'>
              Сохранённые фильмы
            </Link>
          </div>
          <Link className='link nav-tab__link-account' to='/profile'>
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
