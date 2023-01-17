import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './CV.module.scss';
import Logout from '../../components/links/Logout';
import NavMenuCV from '../../components/navigation/menuCV/NavMenuCV';

const CV = () => {
  return (
    <div className={styles.page}>
      <div className={styles.page__sidebar}>
          <NavMenuCV />
      </div>
      <div className={styles.page__content}>
        <div className={styles.exit}>
          <Logout />
        </div>
        <main className={styles.page__main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CV;