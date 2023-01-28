import { INVALID_UPLOAD, UPLOADED } from '../../types';

const initialState = {
  invalidUpload: false
};

export const invalidUploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case INVALID_UPLOAD:
      return {
        ...state,
        invalidUpload: true
      };
    case UPLOADED:
      return {
        ...state,
        invalidUpload: false
      };
    default:
      return state;
  }
};
