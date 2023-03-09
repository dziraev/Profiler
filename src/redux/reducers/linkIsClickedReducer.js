import { LINK_IS_CLICKED, LINK_IS_NOT_CLICKED } from '@types';

const initialState = {
  linkIsClicked: false
};

export const linkIsClickedReducer = (state = initialState, action) => {
  switch (action.type) {
    case LINK_IS_CLICKED:
      return {
        ...state,
        linkIsClicked: action.data
      };
    case LINK_IS_NOT_CLICKED:
      return {
        ...state,
        linkIsClicked: false
      };
    default:
      return state;
  }
};
