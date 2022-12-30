import { COUNTRIES_LOAD, COUNTRIES_SEARCH } from '../../types';

const initialState = {
  searchText: '',
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
    case COUNTRIES_SEARCH: {
      return {
        ...state,
        searchText: action.searchText
      };
    }
    default:
      return state;
  }
};
