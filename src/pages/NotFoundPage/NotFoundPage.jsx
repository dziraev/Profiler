import React from 'react';
import styles from '../LoginPage/LoginPage.module.scss';
import { NavLink } from 'react-router-dom';
import Button from '../../components/buttons/Button/Button';

const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.page__container}>
        <h1 className={styles.page__header}>404</h1>
        <p className={styles.page__title}>Page not found</p>
        <NavLink to='/'>
          <Button type='submit'>Return</Button>
        </NavLink>
      </div>
    </div>
  );
};

export default NotFoundPage;
