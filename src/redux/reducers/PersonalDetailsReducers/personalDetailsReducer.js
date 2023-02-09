import {
  PERSONALDETAILS_LOADING_OFF,
  PERSONALDETAILS_LOADING_ON,
  PERSONALDETAILS_UPDATE,
  PHONECODE_AND_ID_UPDATE,
  PHOTO_UPDATE_CABINET
} from '@types';
import { nullToEmptyString } from '@utils/nullToEmptyString';

const initialState = {
  personalDetails: {
    uniqueStudentIdentifier: '',
    name: '',
    surname: '',
    email: '',
    country: '',
    countryId: '',
    position: '',
    positionId: '',
    phoneCode: '',
    phoneCodeId: '',
    cellPhone: '',
    profileImageUuid: null,
    userInDB: false,
    isLoading: true
  }
};

export const personalDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PERSONALDETAILS_LOADING_ON:
      return {
        ...state,
        personalDetails: {
          ...state.personalDetails,
          isLoading: true
        }
      };
    case PERSONALDETAILS_LOADING_OFF:
      return {
        ...state,
        personalDetails: {
          ...state.personalDetails,
          isLoading: false
        }
      };
    case PERSONALDETAILS_UPDATE:
      const values = nullToEmptyString(action.data);
      return {
        ...state,
        personalDetails: {
          ...state.personalDetails,
          ...values
        }
      };
    case PHONECODE_AND_ID_UPDATE:
      return {
        ...state,
        personalDetails: {
          ...state.personalDetails,
          phoneCode: action.phoneCode,
          phoneCodeId: action.phoneCodeId
        }
      };
    case PHOTO_UPDATE_CABINET:
      return {
        ...state,
        personalDetails: {
          ...state.personalDetails,
          profileImageUuid: action.data
        }
      };

    default:
      return state;
  }
};
