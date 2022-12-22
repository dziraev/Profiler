import React from 'react';
import NavMenu from '../../components/navigation/NavMenu';
import PersonalCabinetHeader from '../../components/headers/PersonalCabinetHeader';
import styles from './PersonalCabinetPage.module.scss';
import { Outlet } from 'react-router-dom';

const PersonalCabinetPage = (props) => {
  return (
    <div className={styles.page}>
    <div className={styles.page__background}></div>
      <div className={styles.page__container}>
        <div className={styles.page__sidebar}>
            <NavMenu />
        </div>
        <div className={styles.page__content}>
          <header className={styles.page__header}>
            <PersonalCabinetHeader />
          </header>
          <main className={styles.page__main}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default PersonalCabinetPage;