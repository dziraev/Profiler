import { PHOTO_UPLOAD_CV, PHOTO_FAILED_CV } from '../../types';

const initialState = {
  photo: '',
  failedPhoto: ''
};

export const photoCVReducer = (state = initialState, action) => {
  switch (action.type) {
    case PHOTO_UPLOAD_CV:
      return {
        ...state,
        photo: action.data
      };
    case PHOTO_FAILED_CV:
      return {
        ...state,
        failedPhoto: action.data
      };
    default:
      return state;
  }
};
