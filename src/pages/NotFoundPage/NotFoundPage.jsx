import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import logo from '../../static/images/big-logo.svg';
import error from '../../static/images/image_error.svg';

const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.page__logo}>
        <img src={logo} alt='logo' />
      </div>
      <div className={styles.page__container}>
        <div className={styles.page__content}>
          <h1 className={styles.page__title}>Sorry, the page you are looking for doesn't exist or has been moved</h1>
          <p className={styles.page__subtitle}>Please check entered address or <NavLink to='/'>go back</NavLink> where you came from</p>
        </div>
        <div className={styles.page__image}>
          <img src={error} alt='error' />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
