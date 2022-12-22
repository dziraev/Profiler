import { COUNTRIES_LOAD } from './types';

const initialState = {
  countries: []
};

export const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case COUNTRIES_LOAD: {
      return {
        ...state,
        countries: action.data
      };
    }
    default:
      return state;
  }
};
