import { Link } from 'react-router-dom';

import './index.css';
import logo from '../../images/logo.svg';

const Header = () => {
  return (
    <div className='header'>
      <img className='header__logo' src={logo} alt='Логотип Movies Explorer' />
      <div className='header__content header__content_type_auth'>
        <Link className='link header__link header__link_type_register' to='/signup'>
          Регистрация
        </Link>
        <Link className='link header__link header__link_type_login' to='/signin'>
          Войти
        </Link>
        {/* 
        <div className='header__films'>
          <Link className='link header__link header__link_type_films' to='/signup'>
            Фильмы
          </Link>
          <Link className='link header__link header__link_type_saved-films' to='/signup'>
            Сохранённые фильмы
          </Link>
        </div>
        <Link className='link header__link header__link_type_account' to='/signup'>
          Аккаунт
        </Link> */}
      </div>
    </div>
  );
};

export default Header;
