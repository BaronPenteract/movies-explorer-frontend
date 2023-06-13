import React from 'react';

import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import Preloader from '../../components/Preloader';
import ProfileForm from '../../components/ProfileForm';

const Profile = ({ onProfileEdit, onSignOut }) => {
  const [isEditLoading, setIsEditloading] = React.useState(false);
  const [isSignOutLoading, setIsSignOutloading] = React.useState(false);

  const { values, handleChange, errors, isValid, setIsValid } = useFormAndValidation();

  const submitButton = React.useRef();

  React.useEffect(() => {
    setIsValid(false);
  }, [setIsValid]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('ProfilePage: Запрос на редактирование профиля улетел.');
    onProfileEdit(values, setIsEditloading);
  };

  const signOutHandler = (e) => {
    e.preventDefault();
    console.log('ProfilePage: Запрос на выход улетел.');
    onSignOut(setIsSignOutloading);
  };

  return (
    <section className='profile'>
      <ProfileForm title='Привет, Андрей!' name='profileEditForm' onSubmit={submitHandler}>
        <fieldset className='profile-form__input-container'>
          <label className='profile-form__label'>
            <span className='profile-form__input-title'>Имя</span>
            <input
              className={`profile-form__input ${
                errors.name ? 'profile-form__input_type_error' : ''
              }`}
              type='text'
              name='name'
              placeholder='Пример: Андрей'
              value={values.name || ''}
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
              value={values.email || ''}
              placeholder='Пример: pochta@yandex.ru'
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
            {isEditLoading ? <Preloader /> : 'Редактировать'}
          </button>
          <button
            className={`profile-form__btn profile-form__btn_type_signout`}
            onClick={signOutHandler}
            type='button'
          >
            {isSignOutLoading ? <Preloader /> : 'Выйти из аккаунта'}
          </button>
        </div>
      </ProfileForm>
    </section>
  );
};

export default Profile;
