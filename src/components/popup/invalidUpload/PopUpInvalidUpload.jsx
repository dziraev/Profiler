import React from 'react';
import { useDispatch } from 'react-redux';
import { invalidUpload, uploaded } from '../../../redux/actions';
import styles from './PopUpInvalidUpload.module.scss';

const PopUpInvalidUpload = (props) => {
  const dispatch = useDispatch();
  const cancel = (e) => {
    dispatch(uploaded());
  }
  const getFile = (e) => {
    const file = e.target.files[0];
    if (file.size > 5242880 ||
        file.type !== 'image/jpeg' &&
        file.type !== 'image/jpg' &&
        file.type !== 'image/png') {
      dispatch(invalidUpload());
    };
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
          <label htmlFor='file' className={styles.modal__btns__label}>Try again
            <input type='file' name='photoUuid' id='file' onChange={getFile}/>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PopUpInvalidUpload;