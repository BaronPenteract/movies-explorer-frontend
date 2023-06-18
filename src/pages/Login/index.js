import React from 'react';
import { Link } from 'react-router-dom';

import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import Preloader from '../../components/Preloader';
import AuthForm from '../../components/AuthForm';

const Login = ({ onLogin }) => {
  const [isLoading, setIsloading] = React.useState(false);

  const messageRef = React.useRef(HTMLDivElement); // ---------------------------- Div message element
  const [isMassageActive, setIsMessageActive] = React.useState(false);

  const { values, handleChange, errors, isValid, setIsValid } = useFormAndValidation();

  React.useEffect(() => {
    setIsValid(false);
  }, [setIsValid]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!isLoading) {
      setIsloading(true);

      onLogin(values)
        .catch((err) => {
          setIsMessageActive(true);
          messageRef.current.textContent = err;
        })
        .finally(() => {
          setIsloading(false);
        });
    }
  };

  return (
    <section className='auth'>
      <AuthForm title='Рады видеть!' name='loginForm' onSubmit={submitHandler}>
        <fieldset className='form-auth__input-container'>
          <label className='form-auth__label'>
            <span className='form-auth__input-title'>E-mail</span>
            <input
              className={`form-auth__input ${errors.email ? 'form-auth__input_type_error' : ''}`}
              type='email'
              name='email'
              onChange={handleChange}
              value={values.email || ''}
              placeholder='pochta@yandex.ru'
              required
            />
            <span className={`form-auth__error ${errors.email ? 'form-auth__error_active' : ''}`}>
              {errors.email || ''}
            </span>
          </label>
          <label className='form-auth__label'>
            <span className='form-auth__input-title'>Пароль</span>
            <input
              className={`form-auth__input ${errors.password ? 'form-auth__input_type_error' : ''}`}
              type='password'
              name='password'
              onChange={handleChange}
              value={values.password || ''}
              placeholder='********'
              minLength={8}
              maxLength={30}
              required
            />
            <span
              className={`form-auth__error ${errors.password ? 'form-auth__error_active' : ''}`}
            >
              {errors.password || ''}
            </span>
          </label>
        </fieldset>
        <div className='form-auth__footer'>
          <div
            className={`info-message ${isMassageActive ? 'info-message_type_error' : ''}`}
            ref={messageRef}
          ></div>
          <button
            className={`form-auth__btn form-auth__btn_type_submit `}
            disabled={!isValid}
            type='submit'
          >
            {isLoading ? <Preloader /> : 'Войти'}
          </button>
          <span className='form-auth__under-text'>
            Ещё не зарегистрированы?
            <Link to='/signup' className='link form-auth__link'>
              Регистрация
            </Link>
          </span>
        </div>
      </AuthForm>
    </section>
  );
};

export default Login;
