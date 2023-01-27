import { ALL_CV_LOAD } from '../../types';

const initialState = {
  allCv: []
};

export const cvReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_CV_LOAD: {
      return {
        ...state,
        allCv: [...action.data]
      };
    }

    default:
      return state;
  }
};
