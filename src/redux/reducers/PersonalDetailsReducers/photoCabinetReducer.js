import { PHOTO_UPLOAD_CABINET } from '../../types';

const initialState = {
  photo: ''
};

export const photoCabinetReducer = (state = initialState, action) => {
  switch (action.type) {
    case PHOTO_UPLOAD_CABINET:
      return {
        ...state,
        photo: action.data
      };
    default:
      return state;
  }
};
