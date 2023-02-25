import React from 'react';
import { CvStatus } from '@configs/configs';
import { ConstructorCv, DraftCv } from '@cvCards';
import { useCv } from '@hooks/Cv/useCv';
import styles from './MyCV.module.scss';

const MyCV = (props) => {
  const { allCv, isLoadingAllCv } = useCv();

  const isThereDraftCv = allCv.some((cv) => cv.status === CvStatus.DRAFT);
  const exceedsNumberCv = allCv.length >= 5;

  return (
    <div className={styles.page}>
      <h2 className={styles.page__title}>My CV</h2>
      <div className={styles.page__container}>
        {!isLoadingAllCv && <ConstructorCv disabled={isThereDraftCv || exceedsNumberCv} />}
        {!isLoadingAllCv &&
          allCv.map((cv) => (
            <DraftCv
              key={cv.uuid}
              position={cv.position}
              uuid={cv.uuid}
              status={
                cv.status === CvStatus.DRAFT
                  ? 'Draft'
                  : cv.status === CvStatus.ON_REVIEW
                  ? 'On the review'
                  : false
              }
            />
          ))}
      </div>
    </div>
  );
};

export default MyCV;
