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
      const initialValues = {
        name: PD.name,
        surname: PD.surname,
        countryId: PD.countryId,
        email: PD.email,
        phoneCodeId: PD.phoneCodeId,
        cellPhone: PD.cellPhone,
        positionId: PD.positionId,
        profileImageUuid: PD.profileImageUuid
      };

      const currentValues = {
        name: PD.name || null,
        surname: PD.surname || null,
        countryId: PD.countryId || null,
        email: PD.email || null,
        phoneCodeId: PD.phoneCodeId || 1,
        cellPhone: PD.cellPhone || null,
        positionId: PD.positionId || null,
        profileImageUuid: null
      };

      const changedValues = getChangedValues(currentValues, initialValues);
      const { data } = await $api.put('/profile', changedValues);
      dispatch(personalDetailsUpdate(data));
      dispatch(photoUploadCabinet(''));
    } catch (e) {
      console.error(e);
    }
  };
};
