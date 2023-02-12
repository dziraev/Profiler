import { useDispatch, useSelector } from 'react-redux';
import { photoUploadCabinet, personalDetailsUpdate } from '../redux/actions';
import { selectPersonalDetails } from '../pages/PersonalDetails/selectors';
import $api from '../http/api';
import { getChangedValues } from '@utils/getChangedValues';

export const useDeletePhotoCabinet = () => {
  const dispatch = useDispatch();
  const PD = useSelector(selectPersonalDetails);
  return async (file) => {
    try {
      const currentValues = {
        name: PD.name || null,
        surname: PD.surname || null,
        countryId: PD.countryId || null,
        email: PD.email || null,
        phoneCodeId: PD.phoneCodeId,
        cellPhone: PD.cellPhone || null,
        positionId: PD.positionId || null,
        profileImageUuid: null
      };

      const response = await $api.put('/profile', currentValues);
      dispatch(personalDetailsUpdate(currentValues));
      dispatch(photoUploadCabinet(''));
    } catch (e) {
      console.error(e);
    }
  };
};
