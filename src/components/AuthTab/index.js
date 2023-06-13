import { Link, useNavigate } from 'react-router-dom';

import './index.css';

const AuthTab = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };
  return (
    <div className='auth-tab'>
      <button
        type='button'
        onClick={() => handleClick('/signin')}
        className='auth-tab__button auth-tab__button_type_register'
      >
        Регистрация
      </button>
      <button
        type='button'
        onClick={() => handleClick('/signup')}
        className='auth-tab__button auth-tab__button_type_login'
      >
        Войти
      </button>
    </div>
  );
};

export default AuthTab;
