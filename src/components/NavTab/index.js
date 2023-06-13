import React from 'react';
import { Link } from 'react-router-dom';

import AccountSVG from '../svg/AccountSVG';

import './index.css';

const NavTab = ({ pages, currentPage, setCurrentPage }) => {
  const [isBurgerActive, setIsBurgerActive] = React.useState(false);

  window.onresize = () => {
    setIsBurgerActive(false);
  };

  const closeByOverlay = (e) => {
    if (e.target === e.currentTarget) {
      setIsBurgerActive(false);
    }
  };

  const handleClickOnLink = (page) => {
    setIsBurgerActive(false);
    setCurrentPage(page);
  };

  const pagesList = pages.map((page) => (
    <li key={page.pathName} className='nav-tab__list-item'>
      <Link
        className={`link nav-tab__link ${
          currentPage === page.pathName ? 'nav-tab__link_active' : ''
        }`}
        to={page.pathName}
        onClick={() => handleClickOnLink(page.pathName)}
      >
        {page.title}
      </Link>
    </li>
  ));

  return (
    <aside>
      <nav className={`nav-tab ${isBurgerActive ? 'nav-tab_active' : ''}`} onClick={closeByOverlay}>
        <div className='nav-tab__container'>
          <ul className='nav-tab__list'>{pagesList}</ul>
          <Link
            className='link nav-tab__link-account'
            to='/profile'
            onClick={() => handleClickOnLink('profile')}
          >
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
    </aside>
  );
};

export default NavTab;
