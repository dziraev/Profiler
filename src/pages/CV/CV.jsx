import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from '../../components/links/Logout';
import NavMenuCV from '../../components/navigation/menuCV/NavMenuCV';
import PopUpUploadPhotoCV from '../../components/popup/uploadPhoto/uploadPhotoCV/PopUpUploadPhotoCV';
import PopUpInvalidUploadCV from '../../components/popup/invalidUpload/invalidUploadCV/PopUpInvalidUploadCV';
import { PopUpTryAgainPhotoCV } from '@popUps/tryAgainPhoto/tryAgainPhotoCV/PopUpTryAgainPhotoCV';
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
              width='18'
              height='18'
              viewBox='0 0 18 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M2.64648 2.64641C2.84176 2.45117 3.15834 2.4512 3.35359 2.64648L8.99892 8.29289L14.6465 2.64641C14.8418 2.45117 15.1583 2.4512 15.3536 2.64648C15.5488 2.84176 15.5488 3.15834 15.3535 3.35359L9.70657 8.99946L15.3536 14.6464C15.5488 14.8417 15.5488 15.1583 15.3536 15.3536C15.1583 15.5488 14.8417 15.5488 14.6464 15.3536L9 9.70711L3.35355 15.3536C3.15829 15.5488 2.84171 15.5488 2.64645 15.3536C2.45118 15.1583 2.45118 14.8417 2.64645 14.6464L8.29236 9.00054L2.64641 3.35352C2.45117 3.15824 2.4512 2.84166 2.64648 2.64641Z'
                fill='#25225D'
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
      {failedToSave && (
        <PopUpTryAgainPhotoCV>Failed to save data. Please try again</PopUpTryAgainPhotoCV>
      )}
    </div>
  );
};

export default CV;
