import React from 'react';

import Preloader from '../Preloader';
import CheckBox from '../CheckBox';
import SearchSVG from '../svg/SearchSVG';
import './index.css';

const SearchForm = ({
  searchParams = { value: '', isShort: true },
  onSearchSubmit,
  // можел ли быть поле поиска пустым? Для сохраненных фильмов нужно, иначе, как отобразить обратно все сохраненные фильмы без перезагрузки страницы?
  canBeEmptyValue = false,
}) => {
  const [isLoading, setIsloading] = React.useState(false);
  const [isCheckBoxActive, setIsCheckBoxActive] = React.useState(true);

  const errorElementRef = React.useRef(HTMLSpanElement);
  const inputElementRef = React.useRef(HTMLInputElement);

  React.useEffect(() => {
    inputElementRef.current.value = searchParams.value;
    setIsCheckBoxActive(searchParams.isShort);
  }, [searchParams]);

  const submitHandler = (e) => {
    e.preventDefault();

    // отображаем ошибку, если поле поика пустое и оно не может быть пустым
    if (inputElementRef.current.value === '' && !canBeEmptyValue) {
      errorElementRef.current.textContent = 'Нужно ввести ключевое слово';
      inputElementRef.current.focus();

      return;
    }

    onSearchSubmit(
      { value: inputElementRef.current.value, isShort: isCheckBoxActive },
      setIsloading,
    );

    inputElementRef.current.blur();
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
