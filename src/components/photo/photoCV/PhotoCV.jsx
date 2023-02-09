import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  openPhotoModal,
  photoUpdateCV,
  photoUploadCV,
  updatePersonaInformationInConstructorCv,
  updatePersonaInformationInSpecificCv
} from '../../../redux/actions';
import { selectPersonalDetails } from '../../../pages/PersonalDetails/selectors';
import photoapi from '../../../http/photoapi';
import $api from '../../../http/api';
import styles from './PhotoCV.module.scss';
import stylesLoader from '../../buttons/Loader.module.scss';
import { trimValues } from '@validators/validators';

const PhotoCV = (props) => {
  const dispatch = useDispatch();
  const { uuid } = useParams();
  const personalDetails = useSelector(selectPersonalDetails);
  const personalInformationSpecific = useSelector(
    (state) => state.specificCvReducer.personalInformation
  );
  const personalInformationConstructor = useSelector(
    (state) => state.constructorCvReducer.personalInformation
  );
  const personalInformation = uuid ? personalInformationSpecific : personalInformationConstructor;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(photoUploadCV(null));
    if (uuid) {
      if (!personalInformationSpecific.isLoading && personalInformationSpecific.imageUuid) getFile();
      if (!personalInformationSpecific.isLoading && !personalInformationSpecific.imageUuid) setIsLoading(false);
    } else {
      if (!personalDetails.isLoading && personalDetails.profileImageUuid) uploadFile();
      if (!personalDetails.isLoading && !personalDetails.profileImageUuid) setIsLoading(false);
    }
  }, [personalDetails.isLoading, personalInformationSpecific.isLoading]);
  const getFile = async () => {
    try {
      const response = await photoapi.get(`/images/${personalInformationSpecific.imageUuid}`, {
        responseType: 'blob'
      });
      const reader = new FileReader();
      reader.onload = function (e) {
        dispatch(photoUploadCV(e.target.result));
      };
      reader.readAsDataURL(response.data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  };
  const uploadFile = async () => {
    try {
      const response = await photoapi.get(`/images/${personalDetails.profileImageUuid}`, {
        responseType: 'blob'
      });
      const file = new File([response.data], 'image', { type: response.data.type });
      const resp = await photoapi.post('/images', {
        image: file
      });
      dispatch(photoUpdateCV(resp.data.uuid));
      dispatch(photoUploadCV(URL.createObjectURL(file)));
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  };
  const deleteFile = async (e) => {
    try {
      const values = {
        imageUuid: null,
        name: personalInformation.name,
        surname: personalInformation.surname,
        positionId: personalInformation.positionId,
        countryId: personalInformation.countryId,
        city: personalInformation.city,
        isReadyToRelocate: personalInformation.isReadyToRelocate,
        isReadyForRemoteWork: personalInformation.isReadyForRemoteWork
      };
      const trimmedValues = trimValues(values, true);
      if (uuid) {
        const response = await $api.put(`/cvs/${uuid}`, trimmedValues);
        dispatch(updatePersonaInformationInSpecificCv({ personalInformation: values }));
      } else {
        const response = await $api.post(`/cvs/`, values);
        dispatch(updatePersonaInformationInConstructorCv(trimmedValues));
      }
      dispatch(photoUploadCV(''));
    } catch (e) {
      console.error(e);
    }
  };
  const image = useSelector((state) => state.photoCVReducer.photo);
  return (
    <>
      {!image && !isLoading && (
        <div className={styles.photo} onClick={() => dispatch(openPhotoModal())}>
          <div className={styles.photo__button}>
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10.5 6.75H6.75V10.5C6.75 10.6989 6.67098 10.8897 6.53033 11.0303C6.38968 11.171 6.19891 11.25 6 11.25C5.80109 11.25 5.61032 11.171 5.46967 11.0303C5.32902 10.8897 5.25 10.6989 5.25 10.5V6.75H1.5C1.30109 6.75 1.11032 6.67098 0.96967 6.53033C0.829018 6.38968 0.75 6.19891 0.75 6C0.75 5.80109 0.829018 5.61032 0.96967 5.46967C1.11032 5.32902 1.30109 5.25 1.5 5.25H5.25V1.5C5.25 1.30109 5.32902 1.11032 5.46967 0.96967C5.61032 0.829017 5.80109 0.75 6 0.75C6.19891 0.75 6.38968 0.829017 6.53033 0.96967C6.67098 1.11032 6.75 1.30109 6.75 1.5V5.25H10.5C10.6989 5.25 10.8897 5.32902 11.0303 5.46967C11.171 5.61032 11.25 5.80109 11.25 6C11.25 6.19891 11.171 6.38968 11.0303 6.53033C10.8897 6.67098 10.6989 6.75 10.5 6.75Z'
                fill='#407BFF'
              />
            </svg>
          </div>
          <p className={styles.photo__title}>Add your photo</p>
        </div>
      )}
      {isLoading && (
        <div className={styles.photo__loader}>
          <span className={`${stylesLoader.loader} ${stylesLoader.loader_borderColor}`} />
        </div>
      )}
      {image && !isLoading && (
        <div className={styles.wrapper}>
          <img className={styles.photo__image} src={image} alt='preview image' />
          <div className={styles.photo__image__change} onClick={() => dispatch(openPhotoModal())}>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M2.06181 2.06328C2.95146 1.17363 4.28272 0.833496 5.9987 0.833496H8.66536C8.94151 0.833496 9.16536 1.05735 9.16536 1.3335C9.16536 1.60964 8.94151 1.8335 8.66536 1.8335H5.9987C4.38135 1.8335 3.37927 2.16003 2.76892 2.77038C2.15856 3.38074 1.83203 4.38281 1.83203 6.00016V10.0002C1.83203 10.7426 1.90083 11.3553 2.03431 11.8601L4.78725 10.0118C5.49598 9.53628 6.50382 9.58424 7.1518 10.141L7.15604 10.1446L7.37365 10.3359C7.70651 10.62 8.26817 10.6194 8.60017 10.3343L11.3735 7.95425C12.0809 7.34679 13.1978 7.34668 13.9051 7.95424L14.1654 8.1778V6.66683C14.1654 6.39069 14.3892 6.16683 14.6654 6.16683C14.9415 6.16683 15.1654 6.39069 15.1654 6.66683V9.24234C15.1662 9.25882 15.1662 9.27534 15.1654 9.29184V10.0002C15.1654 11.7161 14.8252 13.0474 13.9356 13.9371C13.0459 14.8267 11.7147 15.1668 9.9987 15.1668H5.9987C4.28272 15.1668 2.95146 14.8267 2.06181 13.9371C1.17217 13.0474 0.832031 11.7161 0.832031 10.0002V6.00016C0.832031 4.28418 1.17217 2.95292 2.06181 2.06328ZM14.1654 9.49601L13.2535 8.71284C12.9209 8.42712 12.3577 8.42711 12.0251 8.71282L9.25176 11.0928C8.54437 11.7003 7.42749 11.7004 6.72017 11.0928L6.71588 11.0891L6.49827 10.8979C6.19936 10.6427 5.68857 10.6114 5.34467 10.842L2.42786 12.8003C2.52922 12.9615 2.64303 13.1041 2.76892 13.2299C3.37927 13.8403 4.38135 14.1668 5.9987 14.1668H9.9987C11.616 14.1668 12.6181 13.8403 13.2285 13.2299C13.8388 12.6196 14.1654 11.6175 14.1654 10.0002V9.49601Z'
                fill='white'
              />
              <path
                d='M10.499 2.8335C10.2229 2.8335 9.99902 3.05735 9.99902 3.3335C9.99902 3.60964 10.2229 3.8335 10.499 3.8335H11.832V5.16667C11.832 5.44281 12.0559 5.66667 12.332 5.66667C12.6082 5.66667 12.832 5.44281 12.832 5.16667V3.8335H14.1657C14.4418 3.8335 14.6657 3.60964 14.6657 3.3335C14.6657 3.05735 14.4418 2.8335 14.1657 2.8335H12.832V1.5C12.832 1.22386 12.6082 1 12.332 1C12.0559 1 11.832 1.22386 11.832 1.5V2.8335H10.499Z'
                fill='white'
              />
            </svg>
          </div>
          <div className={styles.photo__image__delete} onClick={deleteFile}>
            <svg
              width='14'
              height='16'
              viewBox='0 0 14 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M4.3206 2.35735L4.17722 3.21114C3.55495 3.24473 2.93272 3.29294 2.31052 3.35578L0.951251 3.48904C0.676426 3.51598 0.475478 3.76061 0.502422 4.03544C0.529366 4.31026 0.773997 4.51121 1.04882 4.48427L2.40882 4.35093L2.41029 4.35079C3.71367 4.21913 5.0169 4.15332 6.32004 4.15332C8.52979 4.15332 10.7467 4.26579 12.9507 4.48422C13.2255 4.51145 13.4704 4.31076 13.4976 4.03596C13.5248 3.76117 13.3241 3.51632 13.0493 3.48909C11.9784 3.38296 10.9042 3.30146 9.82903 3.24535L9.82668 3.23007L9.68028 2.36492L9.67401 2.3261C9.63016 2.05353 9.5645 1.64533 9.293 1.33246C8.97884 0.970429 8.49713 0.833496 7.8737 0.833496H6.12703C5.51109 0.833496 5.02889 0.960241 4.71285 1.31862C4.44172 1.62608 4.37438 2.03282 4.32847 2.31008L4.3206 2.35735ZM5.30675 2.5232L5.19827 3.16917C5.57218 3.1586 5.94611 3.15332 6.32004 3.15332C7.14862 3.15332 7.97806 3.1689 8.80733 3.1997L8.69354 2.52729C8.63777 2.18528 8.6025 2.06251 8.53772 1.98787C8.50188 1.94656 8.37693 1.8335 7.8737 1.8335H6.12703C5.6163 1.8335 5.49516 1.94342 5.46287 1.98004C5.40146 2.04967 5.36681 2.16667 5.30675 2.5232Z'
                fill='white'
              />
              <path
                d='M2.93259 6.06105C2.9148 5.78549 2.67699 5.57651 2.40142 5.5943C2.12585 5.61209 1.91688 5.8499 1.93467 6.12547L2.368 12.8388L2.36819 12.8415L2.36907 12.8542C2.38664 13.105 2.40595 13.3809 2.45764 13.6375C2.51123 13.9036 2.6057 14.1845 2.7971 14.4337C3.19788 14.9555 3.87992 15.1666 4.8603 15.1666H9.1403C10.1207 15.1666 10.8027 14.9555 11.2035 14.4337C11.3949 14.1845 11.4894 13.9036 11.543 13.6375C11.5946 13.3809 11.614 13.105 11.6315 12.8542L11.6324 12.8415L11.6326 12.8388L12.0659 6.12547C12.0837 5.8499 11.8747 5.61209 11.5992 5.5943C11.3236 5.57651 11.0858 5.78549 11.068 6.06105L10.6349 12.7716L10.6348 12.773C10.6159 13.0415 10.6 13.2545 10.5626 13.4401C10.5262 13.6208 10.4757 13.7396 10.4104 13.8245C10.2979 13.9711 10.0199 14.1666 9.1403 14.1666H4.8603C3.98067 14.1666 3.70271 13.9711 3.59016 13.8245C3.5249 13.7396 3.47436 13.6208 3.43795 13.4401C3.40058 13.2545 3.38465 13.0415 3.36584 12.773L2.93259 6.06105Z'
                fill='white'
              />
              <path
                d='M5.38675 11C5.38675 10.7239 5.61061 10.5 5.88675 10.5H8.10675C8.3829 10.5 8.60675 10.7239 8.60675 11C8.60675 11.2761 8.3829 11.5 8.10675 11.5H5.88675C5.61061 11.5 5.38675 11.2761 5.38675 11Z'
                fill='white'
              />
              <path
                d='M5.33304 7.8335C5.0569 7.8335 4.83304 8.05735 4.83304 8.3335C4.83304 8.60964 5.0569 8.8335 5.33304 8.8335H8.66638C8.94252 8.8335 9.16638 8.60964 9.16638 8.3335C9.16638 8.05735 8.94252 7.8335 8.66638 7.8335H5.33304Z'
                fill='white'
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoCV;
