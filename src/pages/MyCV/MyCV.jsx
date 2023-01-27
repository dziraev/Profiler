import React from 'react';
import { ConstructorCv, DraftCv } from '@cvCards';
import { useCv } from '@hooks/useCv';
import styles from './MyCV.module.scss';

const MyCV = (props) => {
  const allCv = useCv();
  return (
    <div className={styles.page}>
      <h2 className={styles.page__title}>My CV</h2>
      <div className={styles.page__container}>
        <ConstructorCv />
        {allCv.map((cv) => (
          <DraftCv key={cv.uuid} position={cv.position} uuid={cv.uuid} />
        ))}
      </div>
    </div>
  );
};

export default MyCV;
