import React from 'react';

import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import Preloader from '../../components/Preloader';
import ProfileForm from '../../components/ProfileForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Profile = ({ onProfileEdit, onSignOut, setCurrentUser }) => {
  const [isEditLoading, setIsEditloading] = React.useState(false);
  const [isSignOutLoading, setIsSignOutloading] = React.useState(false);

  const messageRef = React.useRef(HTMLDivElement); // ---------------------------- Div message element
  const [isMassageActive, setIsMessageActive] = React.useState(false);
  const [isMassageError, setIsMessageError] = React.useState(false);

  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, setIsValid, setValues } = useFormAndValidation();

  // создаем IEFE, возвращающее функцию для изменения сообщения
  // P.S. не знаю, делают так или нет, но это работает
  const showMessage = (function (messageRef, setIsMessageActive, setIsMessageError) {
    return (msg, isActive, isError) => {
      setIsMessageActive(isActive);
      setIsMessageError(isError);
      messageRef.current.textContent = msg;
    };
  })(messageRef, setIsMessageActive, setIsMessageError);

  // ----------------------- заполняем инпуты из контекста
  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  // ----------------------- отключаем форму
  React.useEffect(() => {
    setIsValid(false);
  }, [setIsValid]);

  // ------------------------------------------------- Submit Handler
  const submitHandler = (e) => {
    e.preventDefault();

    //----------------- если новые данные отправляются, делаем невозможным отправку еще одного запроса на изменение
    if (!isEditLoading) {
      setIsEditloading(true);

      onProfileEdit(values)
        .then((res) => {
          setCurrentUser(res);
          setIsValid(false);
          showMessage('Данные успешно изменены', true, false);
        })
        .catch((err) => {
          showMessage(err, true, true);
        })
        .finally(() => {
          setIsEditloading(false);
        });
    }
  };

  // ------------------------------------------------- signOut Handler
  const signOutHandler = (e) => {
    e.preventDefault();

    if (!isSignOutLoading) {
      onSignOut(setIsSignOutloading);
    }
  };

  const onChange = (e) => {
    handleChange(e);
    showMessage('', false, false);

    const form = e.target.closest('form');

    if (
      form.elements.name.value === currentUser.name &&
      form.elements.email.value === currentUser.email
    ) {
      setIsValid(false);
      showMessage('Данные должны отличаться', true, true);
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
              onChange={onChange}
              disabled={isEditLoading}
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
              onChange={onChange}
              value={values.email || ''}
              placeholder='pochta@yandex.ru'
              disabled={isEditLoading}
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
