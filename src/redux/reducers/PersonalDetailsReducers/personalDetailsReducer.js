import { PERSONALDETAILS_UPDATE, PHONECODE_AND_ID_UPDATE } from '../../types';

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
      return {
        ...state,
        personalDetails: {
          ...state.personalDetails,
          ...action.data
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
    default:
      return state;
  }
};
