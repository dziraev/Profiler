import React from 'react';
import { useField } from 'formik';
import styles from './CheckBox.module.scss';

export const CheckBox = ({ name, label, ...props }) => {
  const [field, _, helpers] = useField(name);
  const { value } = field;
  const { setValue } = helpers;

  const handleChange = (e) => {
    const { checked } = e.target;
    if (checked) {
      setValue(1);
    } else {
      setValue(0);
    }
  };
  return (
    <div className={styles.checkbox}>
      <input
        className={styles.checkbox__input}
        id={name}
        checked={!!value}
        type='checkbox'
        {...props}
        onChange={handleChange}
      />
      <label className={styles.checkbox__label} htmlFor={name}>
        {label}
      </label>
    </div>
  );
};
