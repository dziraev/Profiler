import { useDispatch } from 'react-redux';
import { updateFieldsInSpecificCv } from '@actions';

//This hook is used to update fields in SpecificCv to up their default values
export const useUpdateFieldsSpecificCv = () => {
  const dispatch = useDispatch();

  return () => {
    dispatch(
      updateFieldsInSpecificCv({
        isContactsExists: false,
        isAboutExists: false,
        status: '',
        personalInformation: {
          uuid: '',
          imageUuid: '',
          name: '',
          surname: '',
          positionId: '',
          position: '',
          countryId: '',
          country: '',
          city: '',
          isReadyToRelocate: false,
          isReadyForRemoteWork: false
        },
        contacts: {
          phoneCode: '',
          phoneCodeId: '',
          phoneNumber: '',
          email: '',
          skype: '',
          linkedin: '',
          portfolio: ''
        },
        aboutYourself: {
          description: '',
          selfPresentation: ''
        }
      })
    );
  };
};
