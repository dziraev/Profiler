import React from 'react';
import cx from 'classnames';
import stylesLoader from '../Loader.module.scss';
import styles from './CancelButton.module.scss';

export const CancelButton = ({ children, isLoading = false, ...props }) => {
  return (
    <button {...props} className={styles.button}>
      {!isLoading && children}
      {isLoading && (
        <span className={cx(stylesLoader.loader, stylesLoader.loader_borderColor)}></span>
      )}
    </button>
  );
};
