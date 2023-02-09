import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUploadPhotoCV } from '@hooks/useUploadPhotoCV';
import { useChangePhotoCV } from '@hooks/useChangePhotoCV';
import { 
  closePhotoModal,
  invalidUploadPhoto,
} from '../../../../redux/actions';
import incorrect from '../../../../static/images/incorrect-photo.png';
import correct from '../../../../static/images/correct-photo.png';
import styles from './PopUpUploadPhotoCV.module.scss';
import stylesLoader from '../../../../components/buttons/Loader.module.scss';

export const PopUpUploadPhotoCV = () => {
  const dispatch = useDispatch();
  const sendFile = useUploadPhotoCV();
  const changeFile = useChangePhotoCV();
  const image = useSelector((state) => state.photoCVReducer.photo);
  const [isLoading, setIsLoading] = useState(false);
  const getFile = (e) => {
    const file = e.target.files[0];
    if (file.size > 5242880 ||
        file.type !== 'image/jpeg' &&
        file.type !== 'image/jpg' &&
        file.type !== 'image/png') {
      dispatch(closePhotoModal());
      dispatch(invalidUploadPhoto());
      return;
    };
    setIsLoading(true);
    image ? changeFile(file) : sendFile(file);
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
          <p className={styles.modal__content__subtitle}>
            Acceptable formats: <span>jpeg, jpg, png</span>. Allowed size up to <span>5 MB</span>.
          </p>
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
          <label htmlFor='file' className={styles.modal__button__label}>
            {image && !isLoading &&  'Change photo'}
            {!image && !isLoading &&  'Add photo'}
            {!isLoading && <input type='file' name='photoUuid' id='file' onChange={getFile}/>}
            {isLoading && <span className={stylesLoader.loader} />}
          </label>
        </div>
      </div>
    </div>
  );
};

export default PopUpUploadPhotoCV;