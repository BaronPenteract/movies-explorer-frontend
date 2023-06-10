import React from 'react';

import Preloader from '../Preloader';
import CheckBox from '../CheckBox';
import SearchSVG from '../svg/SearchSVG';
import './index.css';

const SearchForm = ({ onSearchSubmit }) => {
  const [isLoading, setIsloading] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(true);

  const submitHandler = (e) => {
    e.preventDefault();

    onSearchSubmit(setIsloading);
  };

  return (
    <section className='container container_type_search-form' aria-label='Поиск фильмов'>
      <form className='search-form' name='search' onSubmit={submitHandler} action='/' noValidate>
        <fieldset className='search-form__fieldset'>
          <input className='search-form__input' type='text' placeholder='Фильм' />
          <button className='search-form__submit' type='submit'>
            {isLoading ? <Preloader /> : <SearchSVG className='search-form__svg' />}
          </button>
        </fieldset>
        <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} />
      </form>
    </section>
  );
};

export default SearchForm;
