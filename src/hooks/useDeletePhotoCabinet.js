import { useDispatch, useSelector } from 'react-redux';
import { 
  photoUploadCabinet,
  personalDetailsUpdate,
 } from '../redux/actions';
import { selectPersonalDetails } from '../pages/PersonalDetails/selectors';
import $api from '../http/api';

export const useDeletePhotoCabinet = () => {
  const dispatch = useDispatch();
  const personalDetails = useSelector(selectPersonalDetails);
  return async (file) => {
    try {
      const values = {
        name: personalDetails.name || null,
        surname: personalDetails.surname || null,
        countryId: personalDetails.countryId || null,
        email: personalDetails.email || null,
        phoneCodeId: personalDetails.phoneCodeId || 1,
        cellPhone: personalDetails.cellPhone || null,
        positionId: personalDetails.positionId || null,
        profileImageUuid: null
      };
      const response = await $api.put('/profile', {profileImageUuid: null});
      dispatch(personalDetailsUpdate(values));
      dispatch(photoUploadCabinet(''));
    } catch (e) {
      console.error(e);
    }
  }
};