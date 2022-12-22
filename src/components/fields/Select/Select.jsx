import React, { useEffect, useRef, useState } from 'react';
import { useField } from 'formik';
import styles from './Select.module.scss';

const Select = ({ label, disabled, data = [], ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [field, meta, helpers] = useField(props.name);
  const positionRef = useRef(null);
  const { setValue } = helpers;
  const { value } = field;

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  function handleClickOutside(e) {
    const { current } = positionRef;
    if (current && !current.contains(e.target)) {
      setIsVisible(false);
    }
  }

  const onClickListPosition = (value) => {
    setIsVisible(false);
    setValue(value);
  };

  return (
    <div
      ref={positionRef}
      className={styles.select}
      style={{ cursor: disabled ? 'no-drop' : 'pointer' }}
    >
      <div
        className={styles.select__input}
        style={{ pointerEvents: disabled ? 'none' : 'auto' }}
        onClick={() => setIsVisible((prev) => !prev)}
      >
        {!!value && value}
        {!value && <span className={styles.select__placeholder}>{!isVisible && label}</span>}
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
      <div className={styles.select__dropdown}>
        {isVisible &&
          data.map((value) => (
            <div
              className={styles.select__item}
              key={value.id}
              onClick={() => onClickListPosition(value.position)}
            >
              {value.position}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Select;
