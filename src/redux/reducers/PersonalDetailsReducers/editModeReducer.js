import { CHANGE_DIRTY_STATUS_FORM_PD, RESET_DIRTY_STATUS_FORM_PD } from '../../types';

const initialState = {
  isDirtyFormPD: false
};

export const editModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DIRTY_STATUS_FORM_PD:
      return {
        ...state,
        isDirtyFormPD: action.dirty
      };
    case RESET_DIRTY_STATUS_FORM_PD:
      return {
        ...state,
        isDirtyFormPD: false
      };
    default:
      return state;
  }
};
