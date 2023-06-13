import React from 'react';

import './index.css';

const CheckBox = ({ isChecked, setIsChecked }) => {
  return (
    <label className='checkbox'>
      <input
        className='checkbox__input'
        type='checkbox'
        checked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked);
        }}
      />
      <span
        className={`checkbox__custom ${isChecked ? 'checkbox__custom_active' : ''}`}
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
