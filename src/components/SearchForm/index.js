import React from 'react';

import { useFormAndValidation } from '../../hooks/useFormAndValidation';

import Preloader from '../Preloader';
import CheckBox from '../CheckBox';
import SearchSVG from '../svg/SearchSVG';
import './index.css';

const SearchForm = ({ onSearchSubmit }) => {
  const [isLoading, setIsloading] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(true);

  const { values, handleChange, isValid, setIsValid } = useFormAndValidation();

  React.useEffect(() => {
    setIsValid(false);
  }, [setIsValid]);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log('SearchForm: Запрос на поиск улетел.');
    onSearchSubmit(setIsloading);
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
            className='search-form__input'
            type='text'
            name='searchValue'
            placeholder='Фильм'
            onChange={handleChange}
            value={values.searchValue || ''}
            required
            minLength={2}
          />
          <button className='search-form__submit' type='submit' disabled={!isValid}>
            {isLoading ? <Preloader /> : <SearchSVG className='search-form__svg' />}
          </button>
        </fieldset>
        <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} />
      </form>
    </section>
  );
};

export default SearchForm;
