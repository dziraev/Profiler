import { PERSONALDETAILS_UPDATE, PHONECODE_AND_ID_UPDATE, PHOTO_UPDATE_CABINET } from '@types';
import { nullToEmptyString } from '@utils/nullToEmptyString';

const initialState = {
  personalDetails: {
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
    userInDB: false
  }
};

export const personalDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
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
