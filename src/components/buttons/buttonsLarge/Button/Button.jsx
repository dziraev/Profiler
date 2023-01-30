import React from 'react';
import stylesLoader from '../../Loader.module.scss';
import styles from './Button.module.scss';

export const Button = ({ children, isLoading = false, ...props }) => {
  return (
    <button {...props} className={styles.button}>
      {!isLoading && children}
      {isLoading && <span className={stylesLoader.loader}></span>}
    </button>
  );
};
