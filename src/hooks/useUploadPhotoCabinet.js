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
} from '@actions';
import { selectPersonalDetails } from '../pages/PersonalDetails/selectors';
import photoapi from '../http/photoapi';
import $api from '../http/api';
import { getChangedValues } from '@utils/getChangedValues';

export const useUploadPhotoCabinet = (file) => {
  const dispatch = useDispatch();
  const PD = useSelector(selectPersonalDetails);
  return async (file) => {
    dispatch(photoFailedCabinet(file));
    try {
      const response = await photoapi.post('/images', {
        image: file
      });
      dispatch(photoUpdateCabinet(response.data.uuid));

      const currentValues = {
        name: PD.name || null,
        surname: PD.surname || null,
        countryId: PD.countryId || null,
        email: PD.email || null,
        phoneCodeId: PD.phoneCodeId || 1,
        cellPhone: PD.cellPhone || null,
        positionId: PD.positionId || null,
        profileImageUuid: response.data.uuid
      };

      if (!PD.userInDB) {
        const response = await $api.post('/profile', currentValues);
        dispatch(personalDetailsUpdate({ ...currentValues, userInDB: true }));
      } else {
        const response = await $api.put('/profile', currentValues);
        dispatch(personalDetailsUpdate(currentValues));
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
  };
};
