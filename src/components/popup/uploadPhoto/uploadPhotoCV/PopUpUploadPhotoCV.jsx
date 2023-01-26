import React from 'react';
import { useDispatch } from 'react-redux';
import { closePhotoModal, invalidUpload } from '../../../../redux/actions';
import styles from './PopUpUploadPhotoCV.module.scss';
import incorrect from '../../../../static/images/incorrect-photo.png';
import correct from '../../../../static/images/correct-photo.png';

export const PopUpUploadPhotoCV = () => {
  const dispatch = useDispatch();
  const getFile = (e) => {
    const file = e.target.files[0];
    if (file.size > 5242880 ||
        file.type !== 'image/jpeg' &&
        file.type !== 'image/jpg' &&
        file.type !== 'image/png') {
      dispatch(closePhotoModal());
      dispatch(invalidUpload());
    };
    dispatch(closePhotoModal());
  };
  return (
    <div 
      className={styles.overlay} 
    >
      <div className={styles.modal}>
        <div
          className={styles.modal__close}
          onClick={() => dispatch(closePhotoModal())}
        >
          <svg 
            width='30' 
            height='30' 
            viewBox='0 0 30 30' 
            fill='none' 
            xmlns='http://www.w3.org/2000/svg'
          >
            <g 
              clipPath='url(#clip0_293_2738)'>
              <path 
                d='M23.5165 8.68655L17.2031 15L23.5165 21.3135C23.8514 21.6483 24.0395 22.1025 24.0395 22.5761C24.0395 23.0497 23.8514 23.5039 23.5165 23.8388C23.1816 24.1737 22.7274 24.3619 22.2538 24.3619C21.7802 24.3619 21.326 24.1737 20.9911 23.8388L14.6777 17.5254L8.36422 23.8388C8.02933 24.1737 7.57513 24.3619 7.10153 24.3619C6.62792 24.3619 6.17372 24.1737 5.83884 23.8388C5.50395 23.5039 5.31581 23.0497 5.31581 22.5761C5.31581 22.1025 5.50395 21.6483 5.83884 21.3135L12.1523 15L5.83883 8.68655C5.50395 8.35166 5.31581 7.89746 5.31581 7.42386C5.31581 6.95025 5.50395 6.49605 5.83883 6.16117C6.17372 5.82628 6.62792 5.63814 7.10152 5.63814C7.57513 5.63814 8.02933 5.82628 8.36422 6.16117L14.6777 12.4746L20.9911 6.16117C21.326 5.82628 21.7802 5.63814 22.2538 5.63814C22.7274 5.63814 23.1816 5.82628 23.5165 6.16117C23.8514 6.49605 24.0395 6.95025 24.0395 7.42386C24.0395 7.89746 23.8514 8.35166 23.5165 8.68655V8.68655Z' 
                fill='#25225D'
              />
            </g>
            <defs>
              <clipPath 
                id='clip0_293_2738'>
                <rect 
                  width='30' 
                  height='30' 
                  fill='white'
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className={styles.modal__content}>
          <h2 className={styles.modal__content__title}>
            Please choose a new photo from gallery.
          </h2>
          <p>Acceptable formats: <span>jpeg, jpg, png</span>. Allowed size up to <span>5 MB</span>.</p>
          <p><span>Recommendation</span>: Avoid using selfies, photos with friends, or photos in poorly lit areas. Choose a photo in business style, where your face is clearly visible and there are no distractions in the background.</p>
        </div>
        <div className={styles.modal__images}>
          <div className={styles.modal__images__image}>
            <img src={incorrect} alt='example' />
            <div className={styles.cross} />
          </div>
          <div className={styles.modal__images__image}>
            <img src={correct} alt='example' />
            <div className={styles.check} />
          </div>
        </div>
        <div className={styles.modal__button}>
          <label htmlFor='file' className={styles.modal__button__label}>Add photo
            <input type='file' name='photoUuid' id='file' onChange={getFile}/>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PopUpUploadPhotoCV;