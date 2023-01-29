import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  closePhotoModal,
  invalidUpload,
  photoUpdate,
  photoUploadCabinet,
  personalDetailsUpdate
} from '../../../../redux/actions';
import incorrect from '../../../../static/images/incorrect-photo.png';
import correct from '../../../../static/images/correct-photo.png';
import photoapi from '../../../../http/photoapi';
import $api from '../../../../http/api';
import { CancelButton } from '@components/buttons';
import { selectPersonalDetails } from '../../../../pages/PersonalDetails/selectors';
import styles from './PopUpUploadPhotoCabinet.module.scss';

export const PopUpUploadPhotoCabinet = () => {
  const personalDetails = useSelector(selectPersonalDetails);
  const image = useSelector((state) => state.photoCabinetReducer.photo);
  const imageUuid = personalDetails.profileImageUuid;

  const dispatch = useDispatch();
  const getFile = (e) => {
    const file = e.target.files[0];
    if (file.size > 5242880 ||
        file.type !== 'image/jpeg' &&
        file.type !== 'image/jpg' &&
        file.type !== 'image/png') {
      dispatch(closePhotoModal());
      dispatch(invalidUpload());
      return;
    };
    sendFile(file);
  };
  const sendFile = async (file) => {
    try {
      const response = await photoapi.post('/images', {
        image: file
      })
      dispatch(photoUpdate(response.data.uuid));
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
      if (!personalDetails.userInDB) {
        const response = await $api.post('/profile', values);
        dispatch(personalDetailsUpdate({ ...values, userInDB: true }));
      } else {
        const response = await $api.put('/profile', {profileImageUuid: values.profileImageUuid});
        dispatch(personalDetailsUpdate(values));
      }
      dispatch(photoUploadCabinet(URL.createObjectURL(file)));
      dispatch(closePhotoModal());
    } catch (e) {
      dispatch(invalidUpload());
      dispatch(closePhotoModal());
      console.error(e);
    }
  };
  const changeFile = (e) => {
    const file = e.target.files[0];
    if (file.size > 5242880 ||
        file.type !== 'image/jpeg' &&
        file.type !== 'image/jpg' &&
        file.type !== 'image/png') {
      dispatch(closePhotoModal());
      dispatch(invalidUpload());
      return;
    };
    sendChangedFile(file);
  };
  const sendChangedFile = async (file) => {
    try {
      const response = await photoapi.put(`/images/${personalDetails.profileImageUuid}`, {
        image: file
      })
      dispatch(photoUpdate(response.data.uuid));
      dispatch(photoUploadCabinet(URL.createObjectURL(file)));
      dispatch(closePhotoModal());
    } catch (e) {
      dispatch(invalidUpload());
      dispatch(closePhotoModal());
      console.error(e);
    }
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
        <div
          className={styles.modal__close_mobile}
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
          {!imageUuid && 
            <div className={styles.modal__content__photo}>
              <input type='file' name='photoUuid' id='file' onChange={getFile}/>
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
          }
          {imageUuid && !image &&
            <div className={styles.modal__content__photo}>
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
          }
          {image && imageUuid &&
            <img 
              className={styles.modal__content__photo__preview}
              src={image}
              alt='preview image'
            />
          }
          <p className={styles.modal__content__subtitle}>Acceptable formats: <span>jpeg, jpg, png</span>. Allowed size up to <span>5 MB</span>.</p>
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
        {!imageUuid &&
          <div className={styles.modal__button}>
            <label htmlFor='file' className={styles.modal__button__label}>Add photo
              <input type='file' name='photoUuid' id='file' onChange={getFile}/>
            </label>
          </div>
        }
        {imageUuid &&
          <div className={styles.modal__button}>
            <label htmlFor='file' className={styles.modal__button__label}>Change photo
              <input type='file' name='photoUuid' id='file' onChange={changeFile}/>
            </label>
          </div>
        }
        {imageUuid &&
          <div className={styles.modal__buttons}>
            <div className={styles.modal__buttons__button}>
              <CancelButton type='button'>Delete</CancelButton>
            </div>
            <div className={styles.modal__buttons__button}>
              <label htmlFor='file' className={styles.modal__buttons__button__label}>Change photo
                <input type='file' name='photoUuid' id='file' onChange={changeFile}/>
              </label>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default PopUpUploadPhotoCabinet;