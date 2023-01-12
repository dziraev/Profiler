import { AUTH_IN, AUTH_OUT, LOADER_DISPLAY_OFF, LOADER_DISPLAY_ON } from './types';

const initialState = {
  isAuth: false,
  isLoading: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_IN:
      return { ...state, isAuth: true };
    case AUTH_OUT:
      return { ...state, isAuth: false };
    case LOADER_DISPLAY_ON:
      return {
        ...state,
        isLoading: true
      };
    case LOADER_DISPLAY_OFF:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
