import { PERSONALDETAILS_UPDATE, PHONECODE_AND_ID_UPDATE } from './types';

const initialState = {
  personalDetails: {
    userId: '',
    name: '',
    surname: '',
    email: '',
    country: '',
    countryId: '',
    position: '',
    positionId: '',
    phoneCode: '',
    phoneCodeId: '',
    cellPhone: ''
  }
};

export const personalDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PERSONALDETAILS_UPDATE:
      return {
        ...state,
        personalDetails: { ...action.data }
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
