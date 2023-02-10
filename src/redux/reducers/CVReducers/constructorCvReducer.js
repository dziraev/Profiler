import {
  CHANGE_DIRTY_STATUS_IN_CONSTRUCTOR_CV,
  CLEAR_FIELDS_IN_CONTACTS_CONSTRUCTOR_CV,
  CONSTRUCTOR_CV_LOADING_OFF,
  CONSTRUCTOR_CV_LOADING_ON,
  PHOTO_UPDATE_CV,
  RESET_DIRTY_STATUS_IN_CONSTRUCTOR_CV,
  UPDATE_FIELD_IN_CONTACTS_CONSTRUCTOR_CV,
  UPDATE_FIELDS_IN_CONSTRUCTOR_CV,
  UPDATE_PI_AND_CONTACTS_IN_CONSTRUCTOR_CV
} from '@types';
import { nullToEmptyString } from '@utils/nullToEmptyString';

export const initialState = {
  isLoading: true,
  isDirtyFormCv: false,
  personalInformation: {
    uuid: null,
    imageUuid: null,
    name: '',
    surname: '',
    country: '',
    countryId: '',
    position: '',
    positionId: '',
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
  }
};

export const constructorCvReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DIRTY_STATUS_IN_CONSTRUCTOR_CV:
      return {
        ...state,
        isDirtyFormCv: action.dirty
      };
    case RESET_DIRTY_STATUS_IN_CONSTRUCTOR_CV:
      return {
        ...state,
        isDirtyFormCv: false
      };
    case CONSTRUCTOR_CV_LOADING_ON: {
      return {
        ...state,
        isLoading: true
      };
    }
    case CONSTRUCTOR_CV_LOADING_OFF: {
      return {
        ...state,
        isLoading: false
      };
    }
    case UPDATE_FIELDS_IN_CONSTRUCTOR_CV: {
      return {
        ...state,
        contacts: {
          ...state.contacts,
          ...action.data.contacts
        }
      };
    }
    case UPDATE_PI_AND_CONTACTS_IN_CONSTRUCTOR_CV:
      const values = nullToEmptyString(action.data);
      return {
        ...state,
        personalInformation: {
          ...state.personalInformation,
          ...values.personalInformation
        },
        contacts: {
          ...state.contacts,
          ...values.contacts
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
    case UPDATE_FIELD_IN_CONTACTS_CONSTRUCTOR_CV:
      return {
        ...state,
        contacts: {
          ...state.contacts,
          [action.fieldName]: action.value
        }
      };
    case CLEAR_FIELDS_IN_CONTACTS_CONSTRUCTOR_CV:
      return {
        ...state,
        contacts: {
          ...state.contacts,
          phoneNumber: '',
          email: '',
          skype: '',
          linkedin: '',
          portfolio: ''
        }
      };
    default:
      return state;
  }
};
