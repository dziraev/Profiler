import { PHONECODE_COUNTRYFLAG_UPDATE, PHONECODES_LOAD } from './types';

const initialState = {
  countryFlag: '',
  phoneCodes: []
};

export const phoneCodesReducer = (state = initialState, action) => {
  switch (action.type) {
    case PHONECODES_LOAD: {
      return {
        ...state,
        phoneCodes: action.data
      };
    }
    case PHONECODE_COUNTRYFLAG_UPDATE: {
      return {
        ...state,
        countryFlag: action.countryFlag
      };
    }
    default:
      return state;
  }
};
