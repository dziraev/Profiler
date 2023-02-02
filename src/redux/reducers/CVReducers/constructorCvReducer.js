import {
  CHANGE_DIRTY_STATUS_FORM_CV,
  PHOTO_UPDATE_CV,
  RESET_DIRTY_STATUS_FORM_CV,
  UPDATE_PERSONALINFORMATION_FROM_PD
} from '@types';
import { nullToEmptyString } from '@utils/nullToEmptyString';

export const initialState = {
  isDirtyFormCv: false,
  personalInformation: {
    uuid: null,
    imageUuid: null,
    name: 'test',
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

export const constructorCvReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PERSONALINFORMATION_FROM_PD:
      const values = nullToEmptyString(action.data);
      return {
        ...state,
        personalInformation: {
          ...state.personalInformation,
          ...values
        }
      };
    case PHOTO_UPDATE_CV:
      return {
        ...state,
        personalInformation: {
          ...state.personalInformation,
          imageUuid: action.data
        }
      };
    case CHANGE_DIRTY_STATUS_FORM_CV:
      return {
        ...state,
        isDirtyFormCv: action.dirty
      };
    case RESET_DIRTY_STATUS_FORM_CV:
      return {
        ...state,
        isDirtyFormCv: false
      };
    default:
      return state;
  }
};
