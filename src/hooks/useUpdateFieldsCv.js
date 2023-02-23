import { useDispatch, useSelector } from 'react-redux';
import { selectPersonalDetails } from '../pages/PersonalDetails/selectors';
import { updateFieldsInConstructorCv, updateFieldsInSpecificCv } from '@actions';
import { CvPaths } from '@configs/configs';

//This hook is used to update fields in ConstructorCv and SpecificCv to up their default values
export const useUpdateFieldsCv = () => {
  const dispatch = useDispatch();
  const PD = useSelector(selectPersonalDetails);

  return (uuid, linkIsClicked) => {
    //checking whether there was a click on the navigation of the Cv menu
    const isCvNavigation = Object.values(CvPaths).some((path) => path + uuid === linkIsClicked);

    if (uuid && linkIsClicked && !isCvNavigation) {
      dispatch(
        updateFieldsInSpecificCv({
          isLoading: true,
          notFound: false,
          isDirtyFormCv: false,
          isContactsExists: false,
          isAboutExists: false,
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
    } else {
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
          },
          aboutYourself: {
            description: '',
            selfPresentation: ''
          }
        })
      );
    }
  };
};
