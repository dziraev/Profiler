import {
  CHANGE_DIRTY_STATUS_IN_SPECIFIC_CV,
  DELETE_PHOTO_IN_SPECIFIC_CV,
  RESET_DIRTY_STATUS_IN_SPECIFIC_CV,
  SPECIFIC_CV_LOADING_OFF,
  SPECIFIC_CV_LOADING_ON,
  SPECIFIC_CV_NOT_FOUND_BY_UUID,
  SPECIFIC_CV_NOT_FOUND_RESET,
  UPDATE_FIELDS_IN_SPECIFIC_CV,
  UPDATE_PHOTO_IN_SPECIFIC_CV
} from '@types';
import { nullToEmptyString } from '@utils/nullToEmptyString';

const initialState = {
  isLoading: true,
  notFound: false,
  isDirtyFormCv: false,
  isContactsExists: false,
  isAboutExists: false,
  status: '',
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
  },
  contacts: {
    phoneCode: '',
    phoneCodeId: '',
    phoneNumber: '',
    email: '',
    skype: '',
    linkedin: '',
    portfolio: ''
  },
  aboutYourself: {
    description: '',
    selfPresentation: ''
  }
};

export const specificCvReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DIRTY_STATUS_IN_SPECIFIC_CV:
      return {
        ...state,
        isDirtyFormCv: action.dirty
      };
    case RESET_DIRTY_STATUS_IN_SPECIFIC_CV:
      return {
        ...state,
        isDirtyFormCv: false
      };
    case SPECIFIC_CV_LOADING_ON: {
      return {
        ...state,
        isLoading: true
      };
    }
    case SPECIFIC_CV_LOADING_OFF: {
      return {
        ...state,
        isLoading: false
      };
    }
    case SPECIFIC_CV_NOT_FOUND_BY_UUID: {
      return {
        ...state,
        notFound: true
      };
    }
    case SPECIFIC_CV_NOT_FOUND_RESET: {
      return {
        ...state,
        notFound: false
      };
    }
    case UPDATE_FIELDS_IN_SPECIFIC_CV:
      const values = nullToEmptyString(action.data);
      return {
        ...state,
        ...values
      };
    case UPDATE_PHOTO_IN_SPECIFIC_CV:
      return {
        ...state,
        personalInformation: {
          ...state.personalInformation,
          imageUuid: action.data
        }
      };
    case DELETE_PHOTO_IN_SPECIFIC_CV:
      return {
        ...state,
        personalInformation: {
          ...state.personalInformation,
          imageUuid: null
        }
      };
    default:
      return state;
  }
};
