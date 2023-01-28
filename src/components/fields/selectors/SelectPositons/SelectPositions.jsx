import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useField } from 'formik';
import { selectPositions } from '@components/fields/selectors/SelectPositons/selectors';
import styles from '../Select.module.scss';

const cx = classNames.bind(styles);

export const SelectPositions = ({
  label,
  activeLabel,
  adaptive = true,
  disabled,
  setFieldValue,
  ...props
}) => {
  const positions = useSelector(selectPositions);
  const [isVisible, setIsVisible] = useState(false);
  const [field, meta, helpers] = useField(props.name);
  const positionRef = useRef(null);
  const { setValue, setTouched } = helpers;
  const { value } = field;
  const hasError = !!(meta.touched && meta.error);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, { capture: true });
    return () => document.removeEventListener('click', handleClickOutside, { capture: true });
  }, []);

  function handleClickOutside(e) {
    const { current } = positionRef;

    if (current && !current.contains(e.target)) {
      setIsVisible(false);
    }
  }

  const onClickListPosition = (selectedValue) => {
    setIsVisible(false);
    setTouched(true);
    if (selectedValue.name === value) {
      setFieldValue('positionId', '');
      setValue('', true);
    } else {
      setFieldValue('positionId', selectedValue.id);
      setValue(selectedValue.name, true);
    }
  };

  return (
    <div
      ref={positionRef}
      className={styles.select}
      style={{ cursor: disabled ? 'no-drop' : 'pointer' }}
      onBlur={() => {
        setTouched(true);
      }}
    >
      <div
        className={cx(styles.select__inputContainer, { select__inputContainer_adaptive: adaptive })}
      >
        <div
          {...props}
          {...(!disabled && { tabIndex: '0' })}
          className={cx(styles.select__input, { select__input_error: hasError })}
          style={{ pointerEvents: disabled ? 'none' : 'auto' }}
          onClick={() => setIsVisible((prev) => !prev)}
        >
          {!!value && value}
          {!value && !isVisible && (
            <span
              className={cx(styles.select__placeholder, { select__placeholder_error: hasError })}
            >
              {label}
            </span>
          )}
          {!value && isVisible && (
            <span
              className={cx(styles.select__placeholder, {
                select__placeholder_error: hasError,
                select__placeholder_adaptive: hasError
              })}
            >
              {activeLabel}
            </span>
          )}

          <div className={isVisible ? styles.select__arrowOpen : styles.select__arrow}>
            <svg
              width='12'
              height='8'
              viewBox='0 0 12 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10.6666 1.66602L5.99992 6.33268L1.33325 1.66602'
                stroke='#407BFF'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
        {hasError && !isVisible && (
          <div className={cx({ error: adaptive, notAdaptiveError: !adaptive })}>
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
      {isVisible && positions.length > 0 && (
        <div
          className={cx(styles.select__dropdown, {
            select__dropdown_adaptive: adaptive,
            select__dropdown_notAdaptive: !adaptive
          })}
        >
          {positions.map((position) => (
            <div
              className={styles.select__item}
              key={position.id}
              onMouseDown={(e) => {
                e.preventDefault();
                onClickListPosition(position);
              }}
            >
              {position.name}
              {position.name === value && (
                <svg
                  width='24'
                  height='19'
                  viewBox='0 0 24 19'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M8.93925 13.198L5.62542 9.88651C5.44686 9.70808 5.20467 9.60783 4.95215 9.60783C4.69962 9.60783 4.45744 9.70808 4.27888 9.88651C4.10032 10.0649 4 10.307 4 10.5593C4 10.6842 4.02463 10.808 4.07248 10.9234C4.12033 11.0388 4.19046 11.1437 4.27888 11.2321L8.27075 15.2211C8.6432 15.5933 9.24484 15.5933 9.61729 15.2211L19.7211 5.1245C19.8997 4.94607 20 4.70406 20 4.45171C20 4.19937 19.8997 3.95736 19.7211 3.77892C19.5426 3.60049 19.3004 3.50024 19.0479 3.50024C18.7953 3.50024 18.5531 3.60049 18.3746 3.77892L8.93925 13.198Z'
                    fill='#407BFF'
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
