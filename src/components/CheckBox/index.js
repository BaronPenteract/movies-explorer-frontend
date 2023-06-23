import React from 'react';

import './index.css';

const CheckBox = ({ isChecked, setIsChecked, submitHandler, isDisabled }) => {
  const handleChenge = (e) => {
    setIsChecked(!isChecked);
    submitHandler(!isChecked);
  };

  return (
    <label className='checkbox'>
      <input
        className='checkbox__input'
        type='checkbox'
        checked={isChecked}
        disabled={isDisabled}
        onChange={handleChenge}
      />
      <span
        className={`checkbox__custom ${isChecked ? 'checkbox__custom_active' : ''} ${
          isDisabled ? 'checkbox__custom_disabled' : ''
        }`}
        aria-hidden='true'
      >
        <span
          className={`checkbox__custom-check ${isChecked ? 'checkbox__custom-check_active' : ''}`}
        />
      </span>
      Короткометражки
    </label>
  );
};

export default CheckBox;
