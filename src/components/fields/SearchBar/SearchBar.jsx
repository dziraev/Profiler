import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useField } from 'formik';
import { debounce } from '../../../utils/debounce';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { countriesSearch } from '../../../redux/actions';
import { filterCountriesByPrefix } from '../../../pages/PersonalDetails/selectors';
import styles from './SearchBar.module.scss';

export const SearchBar = ({ label, activeLabel, setCountryId, setFieldValue, ...props }) => {
  const { filteredCountries, searchText } = useSelector((state) => {
    const countriesReducer = state.countriesReducer;
    const filteredCountries = filterCountriesByPrefix(
      countriesReducer.countries,
      countriesReducer.searchText
    );
    return { filteredCountries, searchText: countriesReducer.searchText };
  }, shallowEqual);

  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [display, setDisplay] = useState(false);
  const [field, meta, helpers] = useField(props);
  const { value } = field;
  const country = useRef(value);
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
    if (e.target.value.length === 0) {
      country.current = e.target.value;
      setFieldValue('countryId', '');
    }
    field.onChange(e);
    updateSearchValue(e.target.value);
  };

  const handleBlur = (e) => {
    field.onBlur(e);
    setActive(false);
    setValue(country.current);
    updateSearchValue('');
  };

  const handleFocus = (e) => {
    setActive(true);
    setDisplay(true);
  };

  const handleClick = (value) => {
    country.current = value.countryName;
    setValue(value.countryName);
    setFieldValue('countryId', value.id);
    setCountryId(value.id);
    setDisplay(false);
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
      {display && searchText.length > 0 && (
        <div className={styles.dataResult}>
          {filteredCountries.length === 0 ? (
            <div className={styles.dataResult__notFound}>Country no found</div>
          ) : (
            filteredCountries.map((value) => (
              <div
                className={styles.dataResult__item}
                key={value.id}
                onClick={() => handleClick(value)}
              >
                {value?.countryName}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
