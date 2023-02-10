import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUploadPhotoCV } from '@hooks/useUploadPhotoCV';
import { useChangePhotoCV } from '@hooks/useChangePhotoCV';
import { 
  invalidUploadPhoto,
  uploadedPhoto,
} from '../../../../redux/actions';
import styles from './PopUpInvalidUploadCV.module.scss';
import stylesLoader from '../../../../components/buttons/Loader.module.scss';

const PopUpInvalidUploadCV = (props) => {
  const dispatch = useDispatch();
  const sendFile = useUploadPhotoCV();
  const changeFile = useChangePhotoCV();
  const image = useSelector((state) => state.photoCVReducer.photo);
  const [isLoading, setIsLoading] = useState(false);
  const cancel = (e) => {
    dispatch(uploadedPhoto());
  };
  const getFile = (e) => {
    const file = e.target.files[0];
    if (file.size > 5242880 ||
        file.type !== 'image/jpeg' &&
        file.type !== 'image/jpg' &&
        file.type !== 'image/png') {
      dispatch(invalidUploadPhoto());
      return;
    };
    setIsLoading(true);
    image ? changeFile(file) : sendFile(file);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modal__content}>
          <h2 className={styles.modal__content__title}>
            Invalid upload photo format or size.
          </h2>
          <p>
            Acceptable formats: <span>jpeg, jpg, png</span>. 
            Allowed size up to <span>5 MB</span>.
          </p>
        </div>
        <div className={styles.modal__btns}>
          <button type='button' onClick={cancel}>Cancel</button>
          <label htmlFor='file' className={styles.modal__btns__label}>
            {!isLoading && 'Try again'}
            {!isLoading && <input type='file' name='photoUuid' id='file' onChange={getFile}/>}
            {isLoading && <span className={stylesLoader.loader} />}
          </label>
        </div>
      </div>
    </div>
  );
};

export default PopUpInvalidUploadCV;