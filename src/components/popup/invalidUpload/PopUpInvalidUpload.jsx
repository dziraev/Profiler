import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  invalidUploadPhoto,
  uploadedPhoto,
  photoUpdateCabinet,
  photoUploadCabinet,
  photoUpdateCV,
  photoUploadCV,
  personalDetailsUpdate
} from '../../../redux/actions';
import photoapi from '../../../http/photoapi';
import $api from '../../../http/api';
import { selectPersonalDetails } from '../../../pages/PersonalDetails/selectors';
import { usePersonalInformation } from '@hooks/usePersonalInformation';
import styles from './PopUpInvalidUpload.module.scss';

const PopUpInvalidUpload = (props) => {
  const personalDetails = useSelector(selectPersonalDetails);
  const personalInformation = usePersonalInformation();
  const imageCabinet = useSelector((state) => state.photoCabinetReducer.photo);
  const imageCV = useSelector((state) => state.photoCVReducer.photo);
  const imageCabinetUuid = personalDetails.profileImageUuid;
  const imageCVUuid = personalInformation.imageUuid;
  const dispatch = useDispatch();
  const cancel = (e) => {
    dispatch(uploadedPhoto());
  }
  const getFile = (e) => {
    const file = e.target.files[0];
    if (file.size > 5242880 ||
        file.type !== 'image/jpeg' &&
        file.type !== 'image/jpg' &&
        file.type !== 'image/png') {
      dispatch(invalidUploadPhoto());
      return;
    };
    props.page ? sendFileCabinet(file) : sendFileCV(file);
  };
  const sendFileCabinet = async (file) => {
    try {
      const response = await photoapi.post('/images', {
        image: file
      })
      dispatch(photoUpdateCabinet(response.data.uuid));
      const values = {
        name: personalDetails.name || null,
        surname: personalDetails.surname || null,
        countryId: personalDetails.countryId || null,
        email: personalDetails.email || null,
        phoneCodeId: personalDetails.phoneCodeId || 1,
        cellPhone: personalDetails.cellPhone || null,
        positionId: personalDetails.positionId || null,
        profileImageUuid: response.data.uuid
      };
      try {
        if (!personalDetails.userInDB) {
          const response = await $api.post('/profile', values);
          dispatch(personalDetailsUpdate({ ...values, userInDB: true }));
        } else {
          const response = await $api.put('/profile', {profileImageUuid: values.profileImageUuid});
          dispatch(personalDetailsUpdate(values));
        }
      } catch (e) {
        console.error(e);
      }
      dispatch(photoUploadCabinet(URL.createObjectURL(file)));
      dispatch(uploadedPhoto());
    } catch (e) {
      dispatch(invalidUploadPhoto());
      console.error(e);
    }
  };
  const sendFileCV = async (file) => {
    try {
      const response = await photoapi.post('/images', {
        image: file
      })
      dispatch(photoUpdateCV(response.data.uuid));
      dispatch(photoUploadCV(URL.createObjectURL(file)));
      dispatch(uploadedPhoto());
    } catch (e) {
      dispatch(invalidUploadPhoto());
      console.error(e);
    }
  };
  const changeFile = (e) => {
    const file = e.target.files[0];
    if (file.size > 5242880 ||
        file.type !== 'image/jpeg' &&
        file.type !== 'image/jpg' &&
        file.type !== 'image/png') {
      dispatch(invalidUploadPhoto());
      return;
    };
    props.page ? sendChangedFileCabinet(file) : sendChangedFileCV(file);
  };
  const sendChangedFileCabinet = async (file) => {
    try {
      const response = await photoapi.put(`/images/${personalDetails.profileImageUuid}`, {
        image: file
      })
      dispatch(photoUpdate(response.data.uuid));
      dispatch(photoUploadCabinet(URL.createObjectURL(file)));
      dispatch(uploadedPhoto());
    } catch (e) {
      dispatch(invalidUploadPhoto());
      console.error(e);
    }
  };
  const sendChangedFileCV = async (file) => {
    try {
      const response = await photoapi.put(`/images/${personalInformation.imageUuid}`, {
        image: file
      })
      dispatch(photoUpdateCV(response.data.uuid));
      dispatch(photoUploadCV(URL.createObjectURL(file)));
      dispatch(uploadedPhoto());
    } catch (e) {
      dispatch(invalidUploadPhoto());
      console.error(e);
    }
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
          {!imageCabinetUuid && !imageCVUuid &&
            <label htmlFor='file' className={styles.modal__btns__label}>Try again
              <input type='file' name='photoUuid' id='file' onChange={getFile}/>
            </label>
          }
          {imageCVUuid && !imageCabinetUuid && !props.page &&
            <label htmlFor='file' className={styles.modal__btns__label}>Try again
              <input type='file' name='photoUuid' id='file' onChange={changeFile}/>
            </label>
          }
          {imageCVUuid && !imageCabinetUuid && props.page &&
            <label htmlFor='file' className={styles.modal__btns__label}>Try again
              <input type='file' name='photoUuid' id='file' onChange={getFile}/>
            </label>
          }
          {imageCabinetUuid && !imageCVUuid && props.page &&
            <label htmlFor='file' className={styles.modal__btns__label}>Try again
              <input type='file' name='photoUuid' id='file' onChange={changeFile}/>
            </label>
          }
          {imageCabinetUuid && !imageCVUuid && !props.page &&
            <label htmlFor='file' className={styles.modal__btns__label}>Try again
              <input type='file' name='photoUuid' id='file' onChange={getFile}/>
            </label>
          }
          {imageCabinetUuid && imageCVUuid &&
            <label htmlFor='file' className={styles.modal__btns__label}>Try again
              <input type='file' name='photoUuid' id='file' onChange={changeFile}/>
            </label>
          }
        </div>
      </div>
    </div>
  );
};

export default PopUpInvalidUpload;