import { Link } from 'react-router-dom';

import './index.css';

const AuthTab = () => {
  return (
    <div className='auth-tab'>
      <Link className='link auth-tab__link auth-tab__link_type_register' to='/signin'>
        Регистрация
      </Link>
      <Link className='link auth-tab__link auth-tab__link_type_login' to='/signup'>
        Войти
      </Link>
    </div>
  );
};

export default AuthTab;
