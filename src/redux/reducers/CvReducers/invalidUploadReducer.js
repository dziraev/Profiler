import { INVALID_UPLOAD_PHOTO, UPLOADED_PHOTO } from '../../types';

const initialState = {
  invalidUpload: false
};

export const invalidUploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case INVALID_UPLOAD_PHOTO:
      return {
        ...state,
        invalidUpload: true
      };
    case UPLOADED_PHOTO:
      return {
        ...state,
        invalidUpload: false
      };
    default:
      return state;
  }
};
