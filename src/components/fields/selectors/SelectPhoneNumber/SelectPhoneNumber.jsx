import React, { useEffect, useRef, useState } from 'react';
import { useField } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { selectPhoneCodes } from '@components/fields';
import {
  findCountryFlagByPhoneCodeId,
  findPhoneCodeByCountryId
} from '@utils/findPhoneCodeByCountryId';
import { phoneCodesAndIdUpdate } from '../../../../redux/actions';
import { selectPersonalDetailsPhoneCodeId } from '../../../../pages/PersonalDetails/selectors';
import classNames from 'classnames/bind';
import styles from './SelectPhoneNumber.module.scss';
import stylesSelect from '../Select.module.scss';

const cx = classNames.bind(styles);
const stylesSelectCx = classNames.bind(stylesSelect);

export const SelectPhoneNumber = ({
  label,
  activeLabel,
  disabled,
  countryId,
  setFieldValue,
  ...props
}) => {
  const dispatch = useDispatch();
  const phoneCodes = useSelector(selectPhoneCodes);
  const phoneCodeId = useSelector(selectPersonalDetailsPhoneCodeId);
  const [countryFlag, setCountryFlag] = useState(false);
  const [field, meta, helper] = useField(props.name);
  const [isVisible, setIsVisible] = useState(false);
  const positionRef = useRef(null);
  const { value } = field;
  const { setValue } = helper;

  useEffect(() => {
    const foundPhoneCode = findPhoneCodeByCountryId(phoneCodes, countryId);
    if (foundPhoneCode && countryId) {
      setValue(foundPhoneCode.code);
      setFieldValue('phoneCodeId', foundPhoneCode.id);
      setCountryFlag(foundPhoneCode.country.countryName);
    }
    if (!value && phoneCodes.length) {
      dispatch(phoneCodesAndIdUpdate(phoneCodes[0].code, phoneCodes[0].id));
      setCountryFlag(phoneCodes[0].country.countryName);
    }
    if (value && phoneCodes.length && !countryId) {
      const countryFlag = findCountryFlagByPhoneCodeId(phoneCodes, phoneCodeId);
      setCountryFlag(countryFlag);
    }
  }, [countryId, phoneCodes]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [phoneCodes, phoneCodeId]);

  function handleClickOutside(e) {
    const { current } = positionRef;
    if (current && !current.contains(e.target)) {
      setIsVisible(false);
    }

    if (e.target.closest('button[type=reset]') && phoneCodes.length >= 1) {
      const countryFlag = findCountryFlagByPhoneCodeId(phoneCodes, phoneCodeId);
      setCountryFlag(countryFlag);
    }
  }

  const onClickListPhoneCodes = (value) => {
    setIsVisible(false);
    setValue(value.code);
    setCountryFlag(value.country.countryName);
    setFieldValue('phoneCodeId', value.id);
  };

  return (
    <div
      ref={positionRef}
      className={styles.selectPhone}
      style={{ cursor: disabled ? 'no-drop' : 'pointer' }}
    >
      <div className={styles.selectPhone__container}>
        <div
          className={cx(styles.selectPhone__select, { selectPhone__error: meta.error })}
          style={{ pointerEvents: disabled ? 'none' : 'auto' }}
          onClick={() => setIsVisible((prev) => !prev)}
        >
          <div className={styles.selectPhone__phoneCode}>
            {countryFlag && (
              <img
                src={require(`../../../../static/images/countryFlags/${countryFlag}.svg`)}
                alt='flag'
              />
            )}
            <span>+{value}</span>
          </div>
          <div
            className={stylesSelectCx({ select__arrowOpen: isVisible, select__arrow: !isVisible })}
          >
            <svg
              width='20'
              height='9'
              viewBox='0 0 20 9'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M0.433594 0.508411C0.705097 0.195587 1.17879 0.16209 1.49161 0.433594L8.9007 6.86403C9.49367 7.37867 10.5063 7.37867 11.0993 6.86403L18.5084 0.433594C18.8212 0.16209 19.2949 0.195587 19.5664 0.508411C19.8379 0.821235 19.8044 1.29493 19.4916 1.56643L12.0825 7.99686C10.9255 9.00106 9.07453 9.00106 7.9175 7.99686L0.508411 1.56643C0.195587 1.29493 0.16209 0.821235 0.433594 0.508411Z'
                fill='#407BFF'
              />
            </svg>
          </div>
        </div>
        <div className={styles.selectPhone__input}>{props.children}</div>
      </div>
      {!isVisible && meta.error && (
        <div className={styles.error}>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 13.2C12.34 13.2 12.6252 13.0848 12.8556 12.8544C13.0852 12.6248 13.2 12.34 13.2 12V7.17C13.2 6.83 13.0852 6.55 12.8556 6.33C12.6252 6.11 12.34 6 12 6C11.66 6 11.3752 6.1148 11.1456 6.3444C10.9152 6.5748 10.8 6.86 10.8 7.2V12.03C10.8 12.37 10.9152 12.65 11.1456 12.87C11.3752 13.09 11.66 13.2 12 13.2ZM12 18C12.34 18 12.6252 17.8848 12.8556 17.6544C13.0852 17.4248 13.2 17.14 13.2 16.8C13.2 16.46 13.0852 16.1748 12.8556 15.9444C12.6252 15.7148 12.34 15.6 12 15.6C11.66 15.6 11.3752 15.7148 11.1456 15.9444C10.9152 16.1748 10.8 16.46 10.8 16.8C10.8 17.14 10.9152 17.4248 11.1456 17.6544C11.3752 17.8848 11.66 18 12 18ZM12 24C10.34 24 8.78 23.6848 7.32 23.0544C5.86 22.4248 4.59 21.57 3.51 20.49C2.43 19.41 1.5752 18.14 0.9456 16.68C0.3152 15.22 0 13.66 0 12C0 10.34 0.3152 8.78 0.9456 7.32C1.5752 5.86 2.43 4.59 3.51 3.51C4.59 2.43 5.86 1.5748 7.32 0.9444C8.78 0.3148 10.34 0 12 0C13.66 0 15.22 0.3148 16.68 0.9444C18.14 1.5748 19.41 2.43 20.49 3.51C21.57 4.59 22.4248 5.86 23.0544 7.32C23.6848 8.78 24 10.34 24 12C24 13.66 23.6848 15.22 23.0544 16.68C22.4248 18.14 21.57 19.41 20.49 20.49C19.41 21.57 18.14 22.4248 16.68 23.0544C15.22 23.6848 13.66 24 12 24ZM12 21.6C14.66 21.6 16.9252 20.6652 18.7956 18.7956C20.6652 16.9252 21.6 14.66 21.6 12C21.6 9.34 20.6652 7.0748 18.7956 5.2044C16.9252 3.3348 14.66 2.4 12 2.4C9.34 2.4 7.0752 3.3348 5.2056 5.2044C3.3352 7.0748 2.4 9.34 2.4 12C2.4 14.66 3.3352 16.9252 5.2056 18.7956C7.0752 20.6652 9.34 21.6 12 21.6Z'
              fill='#D40000'
            />
          </svg>
          {meta.error}
        </div>
      )}
      {isVisible && phoneCodes.length >= 1 && (
        <div className={styles.selectPhone__dropdown}>
          <div className={styles.selectPhone__title}>Country</div>
          {phoneCodes.map((phoneCode, index) => (
            <React.Fragment key={phoneCode.id}>
              <div
                className={cx(styles.selectPhone__item, {
                  selectPhone__item_active: phoneCode.code === value
                })}
                onClick={() => onClickListPhoneCodes(phoneCode)}
              >
                <div className={styles.selectPhone__countryName}>
                  <img
                    src={require(`../../../../static/images/countryFlags/${phoneCode.country.countryName}.svg`)}
                    alt='flag'
                  />
                  {phoneCode.country.countryName}
                </div>
                <div className={styles.selectPhone__countryCode}>+{phoneCode.code}</div>
              </div>
              {index === 4 && <div className={styles.selectPhone__line}></div>}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
