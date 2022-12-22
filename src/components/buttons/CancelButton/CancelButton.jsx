import React from 'react';
import styles from './CancelButton.module.scss';

const CancelButton = ({ children, ...props }) => {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
};

export default CancelButton;
