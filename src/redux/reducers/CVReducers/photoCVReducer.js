import { PHOTO_UPLOAD_CV } from '../../types';

const initialState = {
  photo: ''
};

export const photoCVReducer = (state = initialState, action) => {
  switch (action.type) {
    case PHOTO_UPLOAD_CV:
      return {
        ...state,
        photo: action.data
      };
    default:
      return state;
  }
};
