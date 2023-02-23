import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from '../../components/links/Logout';
import NavMenuCV from '../../components/navigation/menuCV/NavMenuCV';
import PopUpUploadPhotoCV from '../../components/popup/uploadPhoto/uploadPhotoCV/PopUpUploadPhotoCV';
import PopUpInvalidUploadCV from '../../components/popup/invalidUpload/invalidUploadCV/PopUpInvalidUploadCV';
import { PopUpTryAgainPhotoCV } from '../../components/popup/tryAgainPhoto/tryAgainPhotoCV/PopUpTryAgainPhotoCV';
import styles from './CV.module.scss';

const CV = () => {
  const [closed, setClosed] = useState(false);
  const closeModal = () => setClosed(true);
  const openModal = useSelector((state) => state.photoModalReducer.openModal);
  const invalidUpload = useSelector((state) => state.invalidUploadReducer.invalidUpload);
  const failedToSave = useSelector((state) => state.failedToSaveReducer.failedToSave);

  return (
    <div className={styles.page}>
      <div className={`${styles.overlay} ${closed ? styles.modal_closed : ''}`}>
        <div className={styles.modal}>
          <div className={styles.modal__close} onClick={closeModal}>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M6.75781 17.2428L12.0008 11.9998M17.2438 6.75684L11.9998 11.9998M11.9998 11.9998L6.75781 6.75684M12.0008 11.9998L17.2438 17.2428'
                stroke='black'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <div className={styles.modal__content}>
            <h2>Please use a computer</h2>
            <p>
              for the convenience of filling in a CV. This page does not have an adaptive version
              for mobile phone and tablet
            </p>
          </div>
        </div>
      </div>
      <div className={styles.page__content}>
        <main className={styles.page__main}>
          <Outlet />
        </main>
        <div className={styles.exit}>
          <Logout tabIndex={21} />
        </div>
      </div>
      <div className={styles.page__sidebar}>
        <NavMenuCV tabIndex={22} />
      </div>
      {openModal && <PopUpUploadPhotoCV />}
      {invalidUpload && <PopUpInvalidUploadCV />}
      {failedToSave &&
        <PopUpTryAgainPhotoCV>
          Failed to save data. Please try again
        </PopUpTryAgainPhotoCV>
      }
    </div>
  );
};

export default CV;
