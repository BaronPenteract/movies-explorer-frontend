import { Link } from 'react-router-dom';

import './index.css';

const NavTab = () => {
  return (
    <nav className='nav-tab'>
      <div className='nav-tab__films'>
        <Link className='link nav-tab__link nav-tab__link_type_films' to='/films'>
          Фильмы
        </Link>
        <Link className='link nav-tab__link nav-tab__link_type_saved-films' to='/saved-films'>
          Сохранённые фильмы
        </Link>
      </div>
      <Link className='link nav-tab__link nav-tab__link_type_account' to='/account'>
        Аккаунт
      </Link>
    </nav>
  );
};

export default NavTab;
