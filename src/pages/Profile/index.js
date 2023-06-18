import React from 'react';

import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import Preloader from '../../components/Preloader';
import ProfileForm from '../../components/ProfileForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Profile = ({ onProfileEdit, onSignOut }) => {
  const [isEditLoading, setIsEditloading] = React.useState(false);
  const [isSignOutLoading, setIsSignOutloading] = React.useState(false);

  const messageRef = React.useRef(HTMLDivElement); // ---------------------------- Div message element
  const [isMassageActive, setIsMessageActive] = React.useState(false);
  const [isMassageError, setIsMessageError] = React.useState(false);

  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, setIsValid, setValues } = useFormAndValidation();

  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  React.useEffect(() => {
    setIsValid(false);
  }, [setIsValid]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!isEditLoading) {
      setIsEditloading(true);

      onProfileEdit(values)
        .then((res) => {
          setIsMessageError(false);
          setIsMessageActive(true);
          messageRef.current.textContent = 'Данные успешно изменены';
        })
        .catch((err) => {
          setIsMessageError(true);
          setIsMessageActive(true);
          messageRef.current.textContent = err;
        })
        .finally(() => {
          setIsEditloading(false);
        });
    }
  };

  const signOutHandler = (e) => {
    e.preventDefault();

    if (!isSignOutLoading) {
      onSignOut(setIsSignOutloading);
    }
  };

  return (
    <section className='profile'>
      <ProfileForm
        title={`Привет, ${currentUser.name}`}
        name='profileEditForm'
        onSubmit={submitHandler}
      >
        <fieldset className='profile-form__input-container'>
          <label className='profile-form__label'>
            <span className='profile-form__input-title'>Имя</span>
            <input
              className={`profile-form__input ${
                errors.name ? 'profile-form__input_type_error' : ''
              }`}
              type='text'
              name='name'
              placeholder='Андрей'
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
              placeholder='pochta@yandex.ru'
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
          <div
            className={`info-message ${
              !isMassageActive
                ? ''
                : isMassageError
                ? 'info-message_type_error'
                : 'info-message_active'
            }`}
            ref={messageRef}
          ></div>
          <button
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
