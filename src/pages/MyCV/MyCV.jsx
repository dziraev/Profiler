import React from 'react';
import { ConstructorCv } from '@cvCards';
import styles from './MyCV.module.scss';

const MyCV = (props) => {
  return (
    <div className={styles.page}>
      <h2 className={styles.page__title}>My CV</h2>
      <div className={styles.page__container}>
        <ConstructorCv />
      </div>
    </div>
  );
};

export default MyCV;
