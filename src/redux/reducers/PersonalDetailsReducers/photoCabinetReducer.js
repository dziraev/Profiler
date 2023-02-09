import { PHOTO_UPLOAD_CABINET, PHOTO_FAILED_CABINET } from '../../types';

const initialState = {
  photo: '',
  failedPhoto: ''
};

export const photoCabinetReducer = (state = initialState, action) => {
  switch (action.type) {
    case PHOTO_UPLOAD_CABINET:
      return {
        ...state,
        photo: action.data
      };
    case PHOTO_FAILED_CABINET:
      return {
        ...state,
        failedFhoto: action.data
      };
    default:
      return state;
  }
};
