import { ALL_CV_LOAD, ALL_CV_LOADING_OFF, ALL_CV_LOADING_ON } from '@types';

const initialState = {
  isLoadingAllCv: true,
  allCv: []
};

export const cvsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_CV_LOAD: {
      return {
        ...state,
        allCv: [...action.data]
      };
    }
    case ALL_CV_LOADING_ON: {
      return {
        ...state,
        isLoadingAllCv: true
      };
    }
    case ALL_CV_LOADING_OFF: {
      return {
        ...state,
        isLoadingAllCv: false
      };
    }
    default:
      return state;
  }
};
