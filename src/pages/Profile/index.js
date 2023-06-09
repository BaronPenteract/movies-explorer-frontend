import React from 'react';
import { Link } from 'react-router-dom';

import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import Preloader from '../../components/Preloader';
import ProfileForm from '../../components/ProfileForm';

const Profile = ({ onProfileEdit, onSignOut }) => {
  const [isLoading, setIsloading] = React.useState(true);

  const { values, handleChange, errors, isValid, setIsValid } = useFormAndValidation();

  const submitButton = React.useRef();

  React.useEffect(() => {
    setIsValid(false);
  }, [setIsValid]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Запрос на редактирование профиля улетел.');
    //onProfileEdit(values, isLoading, setIsloading);
  };

  const signOutHandler = (e) => {
    e.preventDefault();
    console.log('Запрос на выход улетел.');
    //onSignOut();
  };

  return (
    <section className='profile'>
      <ProfileForm title='Привет, Виталий!' name='profileEditForm' onSubmit={submitHandler}>
        <fieldset className='profile-form__input-container'>
          <label className='profile-form__label'>
            <span className='profile-form__input-title'>Имя</span>
            <input
              className={`profile-form__input ${
                errors.name ? 'profile-form__input_type_error' : ''
              }`}
              type='text'
              name='name'
              value={values.name || 'Виталий'}
              onChange={handleChange}
              required
              minLength='2'
              maxLength='40'
            />
          </label>
          <label className='profile-form__label'>
            <span className='profile-form__input-title'>E-mail</span>
            <input
              className={`profile-form__input ${
                errors.email ? 'profile-form__input_type_error' : ''
              }`}
              type='email'
              name='email'
              onChange={handleChange}
              value={values.email || 'pochta@yandex.ru'}
              required
            />
          </label>
          <span
            className={`profile-form__error ${errors.name ? 'profile-form__error_active' : ''}`}
          >
            {errors.name || ''}
          </span>
          <span
            className={`profile-form__error ${errors.email ? 'profile-form__error_active' : ''}`}
          >
            {errors.email || ''}
          </span>
        </fieldset>
        <div className='profile-form__footer'>
          <button
            ref={submitButton}
            className={`profile-form__btn profile-form__btn_type_submit `}
            disabled={!isValid}
            type='submit'
          >
            Редактировать
          </button>
          <button
            className={`profile-form__btn profile-form__btn_type_signout`}
            onClick={signOutHandler}
          >
            Выйти из аккаунта
          </button>
        </div>
      </ProfileForm>
    </section>
  );
};

export default Profile;
