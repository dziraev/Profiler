import React from 'react';
import styles from './CancelButton.module.scss';

export const CancelButton = ({ children, ...props }) => {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
};
