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

  const onClickListPosition = (selectedValue) => {
    setIsVisible(false);
    if (selectedValue.name === value) {
      setFieldValue('positionId', '');
      setValue('');
    } else {
      setFieldValue('positionId', selectedValue.id);
      setValue(selectedValue.name);
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
        {!!value && value}
        {!value && !isVisible && <span className={styles.select__placeholder}>{label}</span>}
        {!value && isVisible && <span className={styles.select__placeholder}>{activeLabel}</span>}

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
