import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Error = ({ statusCode = 404, message = 'Страница не найдена' }) => {
  const { state } = useLocation();

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1, { replace: true });
  };

  return (
    <section className='error'>
      <div className='error__container'>
        <div className='error__text'>
          <p className='error__code'>{state?.statusCode || statusCode}</p>
          <h1 className='error__message'>{state?.message || message}</h1>
        </div>
        <button className='link error__btn' onClick={handleBackClick} type='button'>
          Назад
        </button>
      </div>
    </section>
  );
};

export default Error;
