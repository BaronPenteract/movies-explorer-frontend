import React from 'react';

import CheckBox from '../CheckBox';
import SearchSVG from '../svg/SearchSVG';
import './index.css';

const SearchForm = ({ onSubmit }) => {
  const [isChecked, setIsChecked] = React.useState(true);

  return (
    <section className='container container_type_search-form' aria-label='Поиск фильмов'>
      <form className='search-form' name='search' onSubmit={onSubmit} action='/' noValidate>
        <fieldset className='search-form__fieldset'>
          <input className='search-form__input' type='text' placeholder='Фильм' />
          <button className='search-form__submit' type='submit'>
            <SearchSVG className='search-form__svg' />
          </button>
        </fieldset>
        <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} />
      </form>
    </section>
  );
};

export default SearchForm;
