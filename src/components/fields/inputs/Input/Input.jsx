import React, { useRef } from 'react';
import styles from '../Input.module.scss';

const Input = ({ label, ...props }) => {
  const inputRef = useRef();
  return (
    <div
      className={styles.input__container}
      onClick={() => {
        inputRef.current?.focus();
      }}
    >
      <input ref={inputRef} className={styles.input} type='text' {...props} />
      <label className={styles.label}>{label}</label>
    </div>
  );
};

export default Input;
