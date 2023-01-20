import React from 'react';
import styles from './PopUpUploadPhotoMobile.module.scss';
import incorrect from '../../../../static/images/incorrect-photo.png';
import correct from '../../../../static/images/correct-photo.png';

export const PopUpUploadPhotoMobile = (props) => {
  return (
    <div 
      className={styles.overlay}
      onClick={props.close}
    >
      <div className={styles.modal}>
        <div
          className={styles.modal__close}
          onClick={props.close}
        >
          <svg width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path 
              d='M6.75781 17.243L12.0008 12M17.2438 6.75702L11.9998 12M11.9998 12L6.75781 6.75702M12.0008 12L17.2438 17.243' 
              stroke='black' 
              strokeWidth='1.5' 
              strokeLinecap='round' 
              strokeLinejoin='round'
            />
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
      </div>
    </div>
  );
};

export default PopUpUploadPhotoMobile;