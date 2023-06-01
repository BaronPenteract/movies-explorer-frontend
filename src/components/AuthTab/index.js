import { Link } from 'react-router-dom';

import './index.css';

const AuthTab = () => {
  return (
    <div className='auth-tab'>
      <Link className='link auth-tab__link auth-tab__link_type_register' to='/signup'>
        Регистрация
      </Link>
      <Link className='link auth-tab__link auth-tab__link_type_login' to='/signin'>
        Войти
      </Link>
    </div>
  );
};

export default AuthTab;
