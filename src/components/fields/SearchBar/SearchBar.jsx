import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';
import { useField } from 'formik';
import { debounce } from '@utils/debounce';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { countriesSearch } from '@actions';
import { filterCountriesByPrefix } from '../../../pages/PersonalDetails/selectors';
import styles from './SearchBar.module.scss';

const cx = classNames.bind(styles);

export const SearchBar = ({
  label,
  activeLabel,
  adaptive = true,
  setCountryId,
  setFieldValue,
  tabIndex = 0,
  ...props
}) => {
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
  const hasError = !!(meta.touched && meta.error);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [display]);

  function handleClickOutside(e) {
    const { current } = wrapperRef;
    if (current && !current.contains(e.target) && display) {
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
      if (!!setCountryId) {
        setCountryId('None' + '-' + uuidv4());
      }
    }
    field.onChange(e);
    updateSearchValue(e.target.value);
  };

  const handleBlur = (e) => {
    field.onBlur(e);
    setActive(false);
    setDisplay(false);
    setValue(country.current, true);
    updateSearchValue(country.current);
  };

  const handleFocus = (e) => {
    setActive(true);
    setDisplay(true);
  };

  const handleMouseDown = (value) => {
    country.current = value.countryName;
    setValue(value.countryName, true);
    setFieldValue('countryId', value.id);
    if (!!setCountryId) {
      setCountryId(value.id + '-' + uuidv4());
    }
    setDisplay(false);
  };
  return (
    <div className={styles.search} ref={wrapperRef}>
      <div
        className={cx(styles.search__inputContainer, { search__inputContainer_adaptive: adaptive })}
      >
        <input
          {...props}
          {...field}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={cx(styles.search__input, {
            search__input_error: hasError,
            search__input_adaptive: adaptive
          })}
          type='text'
          placeholder={active ? activeLabel : label}
          tabIndex={tabIndex}
          onClick={() => setDisplay(true)}
        />
        {hasError && (!display || searchText.length <= 0) && (
          <div
            className={cx(styles.error, {
              error_adaptive: adaptive,
              error_notAdaptive: !adaptive
            })}
          >
            <svg
              width='18'
              height='18'
              viewBox='0 0 18 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9 5.5C9.27614 5.5 9.5 5.72386 9.5 6V9.75C9.5 10.0261 9.27614 10.25 9 10.25C8.72386 10.25 8.5 10.0261 8.5 9.75V6C8.5 5.72386 8.72386 5.5 9 5.5Z'
                fill='#D40000'
              />
              <path
                d='M8.99609 11.25C8.58188 11.25 8.24609 11.5858 8.24609 12C8.24609 12.4142 8.58188 12.75 8.99609 12.75H9.00283C9.41704 12.75 9.75283 12.4142 9.75283 12C9.75283 11.5858 9.41704 11.25 9.00283 11.25H8.99609Z'
                fill='#D40000'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M1 9C1 4.59886 4.59886 1 9 1C13.4011 1 17 4.59886 17 9C17 13.4011 13.4011 17 9 17C4.59886 17 1 13.4011 1 9ZM9 2C5.15114 2 2 5.15114 2 9C2 12.8489 5.15114 16 9 16C12.8489 16 16 12.8489 16 9C16 5.15114 12.8489 2 9 2Z'
                fill='#D40000'
              />
            </svg>
            {meta.error}
          </div>
        )}
      </div>
      {display && searchText.length > 0 && (
        <div
          className={cx(styles.dataResult, {
            dataResult_adaptive: adaptive,
            dataResult_notAdaptive: !adaptive
          })}
          onMouseDown={(e) => e.preventDefault()}
        >
          {filteredCountries.length === 0 ? (
            <div className={styles.dataResult__notFound}>Country no found</div>
          ) : (
            filteredCountries.map((value) => (
              <div
                className={styles.dataResult__item}
                key={value.id}
                onMouseDown={() => handleMouseDown(value)}
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
