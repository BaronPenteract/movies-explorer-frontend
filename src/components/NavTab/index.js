import { Link } from 'react-router-dom';

import AccountSVG from '../svg/AccountSVG';

import './index.css';

const NavTab = () => {
  return (
    <nav className='nav-tab'>
      <div className='nav-tab__films'>
        <Link className='link nav-tab__link nav-tab__link_type_films' to='/movies'>
          Фильмы
        </Link>
        <Link className='link nav-tab__link nav-tab__link_type_saved-films' to='/saved-movies'>
          Сохранённые фильмы
        </Link>
      </div>
      <Link className='link nav-tab__link nav-tab__link_type_account' to='/account'>
        <AccountSVG className='nav-tab__svg' />
        <span>Аккаунт</span>
      </Link>
    </nav>
  );
};

export default NavTab;
