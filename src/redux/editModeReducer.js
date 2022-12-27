import { EDITMODE_OFF, EDITMODE_ON } from './types';

const initialState = {
  isEdit: false
};

export const editModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDITMODE_ON:
      return {
        ...state,
        isEdit: true
      };
    case EDITMODE_OFF:
      return {
        ...state,
        isEdit: false
      };
    default:
      return state;
  }
};
