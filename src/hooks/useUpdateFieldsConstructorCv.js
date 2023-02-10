import { useDispatch, useSelector } from 'react-redux';
import { selectPersonalDetails } from '../pages/PersonalDetails/selectors';
import { updateFieldsInConstructorCv } from '@actions';

export const useUpdateFieldsConstructorCv = () => {
  const dispatch = useDispatch();
  const PD = useSelector(selectPersonalDetails);

  return () =>
    dispatch(
      updateFieldsInConstructorCv({
        contacts: {
          phoneCode: PD.phoneCode,
          phoneCodeId: PD.phoneCodeId,
          phoneNumber: PD.cellPhone,
          email: PD.email,
          skype: '',
          linkedin: '',
          portfolio: ''
        }
      })
    );
};
