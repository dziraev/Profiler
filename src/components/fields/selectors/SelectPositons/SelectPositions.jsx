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
  tabIndex = 0,
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
          // {...(!disabled && { tabIndex: tabIndex })}
          tabIndex={!disabled ? tabIndex : 0}
          className={cx(styles.select__input, { select__input_error: hasError })}
          style={{ pointerEvents: disabled ? 'none' : 'auto' }}
          onClick={() => setIsVisible((prev) => !prev)}
          onKeyDown={(e) => e.code === 'Enter' && setIsVisible((prev) => !prev)}
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

          <div className={cx({ select__arrowOpen: isVisible, select__arrow: !isVisible })}>
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
        {hasError && !isVisible && (
          <div
            className={cx(styles.error, { error_adaptive: adaptive, error_notAdaptive: !adaptive })}
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
      {isVisible && positions.length > 0 && (
        <div
          className={cx(styles.select__dropdown, {
            select__dropdown_adaptive: adaptive,
            select__dropdown_notAdaptive: !adaptive
          })}
        >
          {positions.map((position) => (
            <div
              className={cx(styles.select__item, { select__item_active: position.name === value })}
              key={position.id}
              onMouseDown={(e) => {
                e.preventDefault();
                onClickListPosition(position);
              }}
            >
              {position.name}
              <svg
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M16.8687 3.66222C17.0552 3.86582 17.0414 4.1821 16.8378 4.36865L5.92408 14.3687C5.73294 14.5438 5.43965 14.5438 5.24851 14.3687L1.16222 10.6245C0.95862 10.4379 0.944801 10.1216 1.13135 9.91803C1.31791 9.71443 1.63419 9.70062 1.83779 9.88717L5.5863 13.3218L16.1622 3.63135C16.3658 3.4448 16.6821 3.45862 16.8687 3.66222Z'
                  fill='#407BFF'
                />
              </svg>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
