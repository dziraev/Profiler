import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUploadPhotoCabinet } from '@hooks/useUploadPhotoCabinet';
import { useChangePhotoCabinet } from '@hooks/useChangePhotoCabinet';
import { useDeletePhotoCabinet } from '@hooks/useDeletePhotoCabinet';
import { closePhotoModal, invalidUploadPhoto } from '../../../../redux/actions';
import incorrect from '../../../../static/images/incorrect-photo.png';
import correct from '../../../../static/images/correct-photo.png';
import { CancelButton } from '@components/buttons';
import styles from './PopUpUploadPhotoCabinet.module.scss';
import stylesLoader from '../../../../components/buttons/Loader.module.scss';

export const PopUpUploadPhotoCabinet = () => {
  const image = useSelector((state) => state.photoCabinetReducer.photo);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const sendFile = useUploadPhotoCabinet();
  const changeFile = useChangePhotoCabinet();
  const deleteFile = useDeletePhotoCabinet();
  const getFile = (e) => {
    const file = e.target.files[0];
    if (
      file.size > 5242880 ||
      (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png')
    ) {
      dispatch(closePhotoModal());
      dispatch(invalidUploadPhoto());
      return;
    }
    setIsLoading(true);
    image ? changeFile(file) : sendFile(file);
  };
  const deletePhoto = (e) => {
    deleteFile();
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modal__close} onClick={() => dispatch(closePhotoModal())}>
          <svg
            width='24'
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
          <h2 className={styles.modal__content__title}>Please choose a new photo from gallery.</h2>
          <div className={styles.modal__content__photo__wrapper}>
            {!image && (
              <div className={styles.modal__content__photo}>
                <input type='file' name='photoUuid' id='file' onChange={getFile} />
                <div className={styles.modal__content__photo__button}>
                  <svg
                    width='9'
                    height='10'
                    viewBox='0 0 9 10'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M8.35714 5.74283H5.14286V8.95712C5.14286 9.12761 5.07513 9.29113 4.95457 9.41169C4.83401 9.53225 4.6705 9.59997 4.5 9.59997C4.3295 9.59997 4.16599 9.53225 4.04543 9.41169C3.92487 9.29113 3.85714 9.12761 3.85714 8.95712V5.74283H0.642857C0.472361 5.74283 0.308848 5.6751 0.188289 5.55454C0.0677295 5.43398 0 5.27047 0 5.09998C0 4.92948 0.0677295 4.76597 0.188289 4.64541C0.308848 4.52485 0.472361 4.45712 0.642857 4.45712H3.85714V1.24283C3.85714 1.07234 3.92487 0.908823 4.04543 0.788264C4.16599 0.667705 4.3295 0.599976 4.5 0.599976C4.6705 0.599976 4.83401 0.667705 4.95457 0.788264C5.07513 0.908823 5.14286 1.07234 5.14286 1.24283V4.45712H8.35714C8.52764 4.45712 8.69115 4.52485 8.81171 4.64541C8.93227 4.76597 9 4.92948 9 5.09998C9 5.27047 8.93227 5.43398 8.81171 5.55454C8.69115 5.6751 8.52764 5.74283 8.35714 5.74283Z'
                      fill='#407BFF'
                    />
                  </svg>
                </div>
                <p className={styles.modal__content__photo__title}>Add your photo</p>
              </div>
            )}
            {image && (
              <img
                className={styles.modal__content__photo__preview}
                src={image}
                alt='preview image'
              />
            )}
            {isLoading && (
              <div className={styles.loader}>
                {!image && (
                  <div className={styles.loader__empty}>
                    <span className={`${stylesLoader.loader} ${stylesLoader.loader_borderColor}`} />
                  </div>
                )}
                {image && (
                  <div className={styles.loader__blur}>
                    <span className={`${stylesLoader.loader} ${stylesLoader.loader_borderColor}`} />
                  </div>
                )}
              </div>
            )}
          </div>
          <p className={styles.modal__content__subtitle}>
            Acceptable formats: <span>jpeg, jpg, png</span>. Allowed size up to <span>5 MB</span>.
          </p>
          <p>
            <span>Recommendation</span>: Avoid using selfies, photos with friends, or photos in
            poorly lit areas. Choose a photo in business style, where your face is clearly visible
            and there are no distractions in the background.
          </p>
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
            {image && !isLoading && 'Change photo'}
            {!image && !isLoading && 'Add photo'}
            {!isLoading && <input type='file' name='photoUuid' id='file' onChange={getFile} />}
            {isLoading && <span className={stylesLoader.loader} />}
          </label>
        </div>
        {image && (
          <div className={styles.modal__buttons}>
            <div className={styles.modal__buttons__button}>
              <CancelButton type='button' onClick={deletePhoto}>
                Delete
              </CancelButton>
            </div>
            <div className={styles.modal__buttons__button}>
              <label htmlFor='file' className={styles.modal__buttons__button__label}>
                Change photo
                <input
                  type='file'
                  name='photoUuid'
                  id='file'
                  onChange={getFile}
                  disabled={isLoading ? true : false}
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopUpUploadPhotoCabinet;
