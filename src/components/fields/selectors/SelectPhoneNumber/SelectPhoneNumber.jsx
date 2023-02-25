import React, { useEffect, useRef, useState } from 'react';
import { useField } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { selectPhoneCodes } from '@components/fields';
import {
  findCountryFlagByPhoneCodeId,
  findPhoneCodeByCountryId
} from '@utils/findPhoneCodeByCountryId';
import { phoneCodesAndIdUpdate } from '@actions';
import { selectPersonalDetailsPhoneCodeId } from '../../../../pages/PersonalDetails/selectors';
import classNames from 'classnames/bind';
import styles from './SelectPhoneNumber.module.scss';
import stylesSelect from '../Select.module.scss';

const cx = classNames.bind(styles);
const stylesSelectCx = classNames.bind(stylesSelect);

export const SelectPhoneNumber = ({
  name,
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
  const [field, meta, helper] = useField(name);
  const [isVisible, setIsVisible] = useState(false);
  const positionRef = useRef(null);
  const { value } = field;
  const { setValue } = helper;

  useEffect(() => {
    const splitCountryId = countryId?.split('-')[0];
    const foundPhoneCode = findPhoneCodeByCountryId(phoneCodes, Number(splitCountryId));
    if (foundPhoneCode && countryId) {
      setValue(foundPhoneCode.code);
      setFieldValue(name + 'Id', foundPhoneCode.id);
      setCountryFlag(foundPhoneCode.country.countryName);
    } else if (splitCountryId === 'None' && phoneCodes.length && phoneCodes[0].code !== value) {
      //condition phoneCodes[0].code !== value means don't call this block once again if the phone code is already equal to the default one
      setValue(phoneCodes[0].code);
      setFieldValue(name + 'Id', phoneCodes[0].id);
      setCountryFlag(phoneCodes[0].country.countryName);
    } else if (!value && phoneCodes.length) {
      dispatch(phoneCodesAndIdUpdate(phoneCodes[0].code, phoneCodes[0].id));
      setCountryFlag(phoneCodes[0].country.countryName);
    } else if (value && phoneCodes.length && !countryId) {
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
    setFieldValue(name + 'Id', value.id);
  };

  return (
    <div ref={positionRef} className={styles.selectPhone}>
      <div className={styles.selectPhone__container}>
        <div
          className={cx(styles.selectPhone__select, { selectPhone__error: meta.error })}
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
