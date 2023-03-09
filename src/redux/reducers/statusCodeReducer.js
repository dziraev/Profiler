import { STATUSCODE_RESET, STATUSCODE_UPDATE } from '@types';

const initialState = {
  statusCode: null
};

export const statusCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case STATUSCODE_UPDATE:
      return { ...state, statusCode: action.payload };
    case STATUSCODE_RESET:
      return { ...state, statusCode: null };
    default:
      return state;
  }
};
