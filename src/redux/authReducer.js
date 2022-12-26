import { AUTH_IN, AUTH_OUT } from './types';

const initialState = {
  isAuth: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_IN:
      return { ...state, isAuth: true };
    case AUTH_OUT:
      return { ...state, isAuth: false };
    default:
      return state;
  }
};
