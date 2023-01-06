import { POSITIONS_LOAD } from '../../types';

const initialState = {
  positions: []
};

export const positionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSITIONS_LOAD:
      return {
        ...state,
        positions: [...action.data]
      };
    default:
      return state;
  }
};
