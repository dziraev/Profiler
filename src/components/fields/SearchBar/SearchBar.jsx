import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
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
      setFieldValue('countryId', null);
    }
    field.onChange(e);
    updateSearchValue(e.target.value);
  };

  const handleBlur = (e) => {
    field.onBlur(e);
    setActive(false);
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
      setCountryId(value.id + '-' + crypto.randomUUID());
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
              width='14'
              height='14'
              viewBox='0 0 14 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M7 7.7C7.19833 7.7 7.3647 7.6328 7.4991 7.4984C7.63303 7.36447 7.7 7.19833 7.7 7V4.1825C7.7 3.98417 7.63303 3.82083 7.4991 3.6925C7.3647 3.56417 7.19833 3.5 7 3.5C6.80167 3.5 6.63553 3.56697 6.5016 3.7009C6.3672 3.8353 6.3 4.00167 6.3 4.2V7.0175C6.3 7.21583 6.3672 7.37917 6.5016 7.5075C6.63553 7.63583 6.80167 7.7 7 7.7ZM7 10.5C7.19833 10.5 7.3647 10.4328 7.4991 10.2984C7.63303 10.1645 7.7 9.99833 7.7 9.8C7.7 9.60167 7.63303 9.4353 7.4991 9.3009C7.3647 9.16697 7.19833 9.1 7 9.1C6.80167 9.1 6.63553 9.16697 6.5016 9.3009C6.3672 9.4353 6.3 9.60167 6.3 9.8C6.3 9.99833 6.3672 10.1645 6.5016 10.2984C6.63553 10.4328 6.80167 10.5 7 10.5ZM7 14C6.03167 14 5.12167 13.8161 4.27 13.4484C3.41833 13.0811 2.6775 12.5825 2.0475 11.9525C1.4175 11.3225 0.918867 10.5817 0.5516 9.73C0.183867 8.87833 0 7.96833 0 7C0 6.03167 0.183867 5.12167 0.5516 4.27C0.918867 3.41833 1.4175 2.6775 2.0475 2.0475C2.6775 1.4175 3.41833 0.918633 4.27 0.5509C5.12167 0.183633 6.03167 0 7 0C7.96833 0 8.87833 0.183633 9.73 0.5509C10.5817 0.918633 11.3225 1.4175 11.9525 2.0475C12.5825 2.6775 13.0811 3.41833 13.4484 4.27C13.8161 5.12167 14 6.03167 14 7C14 7.96833 13.8161 8.87833 13.4484 9.73C13.0811 10.5817 12.5825 11.3225 11.9525 11.9525C11.3225 12.5825 10.5817 13.0811 9.73 13.4484C8.87833 13.8161 7.96833 14 7 14ZM7 12.6C8.55167 12.6 9.87303 12.0547 10.9641 10.9641C12.0547 9.87303 12.6 8.55167 12.6 7C12.6 5.44833 12.0547 4.12697 10.9641 3.0359C9.87303 1.9453 8.55167 1.4 7 1.4C5.44833 1.4 4.1272 1.9453 3.0366 3.0359C1.94553 4.12697 1.4 5.44833 1.4 7C1.4 8.55167 1.94553 9.87303 3.0366 10.9641C4.1272 12.0547 5.44833 12.6 7 12.6Z'
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
        >
          {filteredCountries.length === 0 ? (
            <div className={styles.dataResult__notFound} onMouseDown={(e) => e.preventDefault()}>
              Country no found
            </div>
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
