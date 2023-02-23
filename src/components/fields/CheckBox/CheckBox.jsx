import React from 'react';
import { useField } from 'formik';
import styles from './CheckBox.module.scss';

export const CheckBox = ({ name, label, tabIndex, ...props }) => {
  const [field, _, helpers] = useField(name);
  const { value } = field;
  const { setValue } = helpers;

  const handleChange = (e) => {
    const { checked } = e.target;
    if (checked) {
      setValue(true);
    } else {
      setValue(false);
    }
  };
  return (
    <div className={styles.checkbox}>
      <input
        className={styles.checkbox__input}
        id={name}
        checked={!!value}
        type='checkbox'
        tabIndex={tabIndex}
        {...props}
        onChange={handleChange}
      />
      <label className={styles.checkbox__label} htmlFor={name}>
        {label}
      </label>
    </div>
  );
};
