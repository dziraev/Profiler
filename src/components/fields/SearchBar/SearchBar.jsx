import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useField } from 'formik';
import { debounce } from '../../../utils/debounce';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { countriesSearch } from '../../../redux/actions';
import { filterCountriesByPrefix } from '../../../pages/PersonalDetails/selectors';
import styles from './SearchBar.module.scss';

const SearchBar = ({ label, activeLabel, ...props }) => {
  const { filteredCountries, searchText } = useSelector((state) => {
    const data = state.countriesReducer;
    const filteredCountries = filterCountriesByPrefix(data.countries, data.searchText);
    return { filteredCountries, searchText: data.searchText };
  }, shallowEqual);
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [display, setDisplay] = useState(false);
  const [field, meta, helpers] = useField(props);
  const country = useRef(field.value);
  const { setValue } = helpers;

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [display]);

  function handleClickOutside(e) {
    const { current } = wrapperRef;
    if (current && !current.contains(e.target) && display) {
      setValue(country.current);
      setDisplay(false);
    }
  }

  const updateSearchValue = useCallback(
    debounce(
      (str) => {
        dispatch(countriesSearch(str.toLowerCase()));
      },
      350,
      false
    ),
    []
  );

  const handleChange = (e) => {
    field.onChange(e);
    updateSearchValue(e.target.value);
  };

  const handleBlur = (e) => {
    field.onBlur(e);
    setActive(false);
  };

  const handleFocus = (e) => {
    setActive(true);
  };
  return (
    <div className={styles.search} ref={wrapperRef}>
      <input
        {...props}
        {...field}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className={styles.search__input}
        type='text'
        placeholder={active ? activeLabel : label}
        onClick={() => setDisplay(true)}
      />
      {display && (
        <div className={styles.dataResult}>
          {filteredCountries.length === 0 && searchText.length > 0 && (
            <div className={styles.dataResult__notFound}>No such countries found</div>
          )}
          {searchText.length > 0 &&
            filteredCountries.length > 0 &&
            filteredCountries.map((value) => (
              <div
                className={styles.dataResult__item}
                key={value.id}
                onClick={() => {
                  country.current = value.countryName;
                  setValue(value.countryName);
                  setDisplay(false);
                }}
              >
                {value.countryName}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
