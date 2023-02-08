import { UPDATE_PERSONALINFORMATION_IN_SPECIFIC_CV, UPDATE_PHOTO_IN_SPECIFIC_CV } from '@types';

const initialState = {
  personalInformation: {
    uuid: '',
    imageUuid: '',
    name: '',
    surname: '',
    positionId: '',
    position: '',
    countryId: '',
    country: '',
    city: '',
    isReadyToRelocate: false,
    isReadyForRemoteWork: false
  }
};

export const specificCvReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PERSONALINFORMATION_IN_SPECIFIC_CV:
      return {
        ...state,
        personalInformation: { ...action.data }
      };
    case UPDATE_PHOTO_IN_SPECIFIC_CV:
      return {
        ...state,
        personalInformation: {
          ...state.personalInformation,
          imageUuid: action.data
        }
      };
    default:
      return state;
  }
};
