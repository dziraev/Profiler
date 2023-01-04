import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useField } from 'formik';
import { selectPositions } from '@components/fields/selectors/SelectPositons/selectors';
import styles from '../Select.module.scss';

export const SelectPositions = ({ label, activeLabel, disabled, setFieldValue, ...props }) => {
  const positions = useSelector(selectPositions);
  const [isVisible, setIsVisible] = useState(false);
  const [field, meta, helpers] = useField(props.name);
  const positionRef = useRef(null);
  const { setValue } = helpers;
  const { value } = field;
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

  const onClickListPosition = (value) => {
    setIsVisible(false);
    if (value.name === 'None') {
      setFieldValue('positionId', 'null');
      setValue('');
    } else {
      setFieldValue('positionId', value.id);
      setValue(value.name);
    }
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
        {!!value && !isVisible && value}
        {!value && !isVisible && <span className={styles.select__placeholder}>{label}</span>}
        {isVisible && <span className={styles.select__placeholder}>{activeLabel}</span>}

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
      {isVisible && positions.length > 0 && (
        <div className={styles.select__dropdown}>
          {positions.map((position) => (
            <div
              className={styles.select__item}
              key={position.id}
              onClick={() => onClickListPosition(position)}
            >
              {position.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
