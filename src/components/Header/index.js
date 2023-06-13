import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './index.css';
import LogoSVG from '../svg/LogoSVG';
import NavTab from '../NavTab';
import AuthTab from '../AuthTab';

const pages = [
  { title: 'Главная', pathName: '/' },
  { title: 'Фильмы', pathName: '/movies' },
  { title: 'Сохранённые фильмы', pathName: '/saved-movies' },
];

const Header = ({ loggedIn }) => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = React.useState('');

  React.useEffect(() => {
    pages.forEach((page) => {
      if (location.pathname.endsWith(page.pathName)) {
        setCurrentPage(page.pathName);
      }
    });
  }, [location]);

  return (
    <header className='container header'>
      <Link
        to={pages[0].pathName}
        className='header__link'
        onClick={() => setCurrentPage(pages[0].pathName)}
      >
        <LogoSVG className='header__logo' />
      </Link>
      {loggedIn ? (
        <NavTab pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      ) : (
        <AuthTab />
      )}
    </header>
  );
};

export default Header;
