import { PERSONALDETAILS_UPDATE } from './types';

const initialState = {
  personalDetails: {
    name: '',
    surname: '',
    email: '',
    country: '',
    position: ''
  }
};

export const personalDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PERSONALDETAILS_UPDATE:
      return {
        ...state,
        personalDetails: { ...action.data }
      };
    default:
      return state;
  }
};
