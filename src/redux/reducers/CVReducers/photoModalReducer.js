import { MODAL_IS_OPENED, MODAL_IS_CLOSED } from '../../types';

const initialState = {
  openModal: false
};

export const photoModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_IS_OPENED:
      return {
        ...state,
        openModal: true
      };
    case MODAL_IS_CLOSED:
      return {
        ...state,
        openModal: false
      };
    default:
      return state;
  }
};
