import React from 'react';
import loaderCx from 'classnames';
import classnames from 'classnames/bind';
import stylesLoader from '../Loader.module.scss';
import styles from './CancelButton.module.scss';

const cx = classnames.bind(styles);

export const CancelButton = ({ children, adaptive = true, isLoading = false, ...props }) => {
  return (
    <button {...props} className={cx(styles.button, { button_adaptive: adaptive })}>
      {!isLoading && children}
      {isLoading && (
        <span className={loaderCx(stylesLoader.loader, stylesLoader.loader_borderColor)}></span>
      )}
    </button>
  );
};
