import React from 'react';

import Preloader from '../Preloader';
import CheckBox from '../CheckBox';
import SearchSVG from '../svg/SearchSVG';
import './index.css';

const SearchForm = ({ isShortMovies = false, searchValue = '', onSearchSubmit }) => {
  const [isLoading, setIsloading] = React.useState(false);
  const [isCheckBoxActive, setIsCheckBoxActive] = React.useState(true);

  const errorElementRef = React.useRef(HTMLSpanElement);
  const inputElementRef = React.useRef(HTMLInputElement);

  React.useEffect(() => {
    inputElementRef.current.value = searchValue;
    setIsCheckBoxActive(isShortMovies);
  }, [isShortMovies, searchValue]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (inputElementRef.current.value === '') {
      errorElementRef.current.textContent = 'Нужно ввести ключевое слово';
      inputElementRef.current.focus();

      return;
    }

    onSearchSubmit(inputElementRef.current.value, isCheckBoxActive, setIsloading);

    errorElementRef.current.textContent = '';
  };

  return (
    <section className='container container_type_search-form' aria-label='Поиск фильмов'>
      <form
        className='search-form'
        name='searchForm'
        onSubmit={submitHandler}
        action='/'
        noValidate
      >
        <fieldset className='search-form__fieldset'>
          <input
            ref={inputElementRef}
            className='search-form__input'
            type='text'
            name='searchValue'
            placeholder='Фильм'
            required
          />
          <button className='search-form__submit' type='submit'>
            {isLoading ? <Preloader /> : <SearchSVG className='search-form__svg' />}
          </button>
        </fieldset>
        <span ref={errorElementRef} className='search-form__error'></span>
        <CheckBox isChecked={isCheckBoxActive} setIsChecked={setIsCheckBoxActive} />
      </form>
    </section>
  );
};

export default SearchForm;
