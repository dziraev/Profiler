import { UPDATE_PERSONALINFORMATION_FROM_PD } from '../../types';

export const initialState = {
  imageUuid: null,
  personalInformation: {
    name: '',
    surname: '',
    country: '',
    countryId: '',
    position: '',
    positionId: '',
    city: '',
    isReadyToRelocate: false,
    isReadyForRemoteWork: false
  }
};

export const personalInformationReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PERSONALINFORMATION_FROM_PD:
      return {
        ...state,
        personalInformation: {
          ...state.personalInformation,
          ...action.data
        }
      };
    default:
      return state;
  }
};
