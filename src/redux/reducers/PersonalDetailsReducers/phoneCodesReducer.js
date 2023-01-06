import { PHONECODES_LOAD } from '../../types';

const initialState = {
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
    default:
      return state;
  }
};
