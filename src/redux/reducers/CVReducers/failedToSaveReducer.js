import { FAILED_TO_SAVE, SAVED_SUCCESFULLY } from '../../types';

const initialState = {
  failedToSave: false
};

export const failedToSaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAILED_TO_SAVE:
      return {
        ...state,
        failedToSave: true
      };
    case SAVED_SUCCESFULLY:
      return {
        ...state,
        failedToSave: false
      };
    default:
      return state;
  }
};
