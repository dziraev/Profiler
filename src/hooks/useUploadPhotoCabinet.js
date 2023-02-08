import { useDispatch, useSelector } from 'react-redux';
import { 
  photoUpdateCabinet,
  photoUploadCabinet,
  personalDetailsUpdate,
  failedToSave,
  closePhotoModal,
  photoFailedCabinet,
  savedSuccessfully,
  uploadedPhoto
 } from '../redux/actions';
import { selectPersonalDetails } from '../pages/PersonalDetails/selectors';
import photoapi from '../http/photoapi';
import $api from '../http/api';

export const useUploadPhotoCabinet = (file) => {
  const dispatch = useDispatch();
  dispatch(photoFailedCabinet(file));
  const personalDetails = useSelector(selectPersonalDetails);
  return async (file) => {
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
      if (!personalDetails.userInDB) {
        const response = await $api.post('/profile', values);
        dispatch(personalDetailsUpdate({ ...values, userInDB: true }));
      } else {
        const response = await $api.put('/profile', {profileImageUuid: values.profileImageUuid});
        dispatch(personalDetailsUpdate(values));
      }
      dispatch(photoUploadCabinet(URL.createObjectURL(file)));
      dispatch(closePhotoModal());
      dispatch(uploadedPhoto());
      dispatch(savedSuccessfully());
    } catch (e) {
      dispatch(savedSuccessfully());
      dispatch(closePhotoModal());
      dispatch(failedToSave());
      console.error(e);
    }
  }
};