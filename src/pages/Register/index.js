import React from 'react';
import { Link } from 'react-router-dom';

import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import Preloader from '../../components/Preloader';
import AuthForm from '../../components/AuthForm';

const Register = ({ onRegister }) => {
  const [isLoading, setIsloading] = React.useState(false);

  const messageRef = React.useRef(HTMLDivElement); // ---------------------------- Div message element
  const [isMassageActive, setIsMessageActive] = React.useState(false);

  const { values, handleChange, errors, isValid, setIsValid } = useFormAndValidation();

  React.useEffect(() => {
    setIsValid(false);
  }, [setIsValid]);

  React.useEffect(() => {
    if (!isMassageActive) {
      messageRef.current.textContent = '';
    }
  }, [isMassageActive]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!isLoading) {
      setIsloading(true);
      setIsMessageActive(false);

      onRegister(values)
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
      <AuthForm title='Добро пожаловать!' name='registerForm' onSubmit={submitHandler}>
        <fieldset className='form-auth__input-container'>
          <label className='form-auth__label'>
            <span className='form-auth__input-title'>Имя</span>
            <input
              className={`form-auth__input ${errors.name ? 'form-auth__input_type_error' : ''}`}
              type='text'
              name='name'
              value={values.name || ''}
              onChange={handleChange}
              placeholder='Андрей'
              pattern='[a-zA-Zа-яА-ЯёЁ\-\s]+'
              required
              minLength='2'
              maxLength='40'
            />
            <span className={`form-auth__error ${errors.name ? 'form-auth__error_active' : ''}`}>
              {errors.name || ''}
            </span>
          </label>
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
            {isLoading ? <Preloader /> : 'Зарегистрироваться'}
          </button>
          <span className='form-auth__under-text'>
            Уже зарегистрированы?
            <Link to='/signin' className='link form-auth__link'>
              Войти
            </Link>
          </span>
        </div>
      </AuthForm>
    </section>
  );
};

export default Register;
