import {
  ALL_CV_LOAD,
  ALL_CV_LOADING_OFF,
  ALL_CV_LOADING_ON,
  AUTH_IN,
  AUTH_OUT,
  CHANGE_DIRTY_STATUS_FORM_PD,
  CHANGE_DIRTY_STATUS_IN_CONSTRUCTOR_CV,
  CHANGE_DIRTY_STATUS_IN_SPECIFIC_CV,
  CLEAR_FIELDS_IN_CONTACTS_CONSTRUCTOR_CV,
  CONSTRUCTOR_CV_LOADING_OFF,
  CONSTRUCTOR_CV_LOADING_ON,
  COUNTRIES_LOAD,
  COUNTRIES_SEARCH,
  FAILED_TO_SAVE,
  INVALID_UPLOAD_PHOTO,
  LINK_IS_CLICKED,
  LINK_IS_NOT_CLICKED,
  LOADER_DISPLAY_OFF,
  LOADER_DISPLAY_ON,
  MODAL_IS_CLOSED,
  MODAL_IS_OPENED,
  PERSONALDETAILS_LOADING_OFF,
  PERSONALDETAILS_LOADING_ON,
  PERSONALDETAILS_UPDATE,
  PHONECODE_AND_ID_UPDATE,
  PHONECODES_LOAD,
  PHOTO_UPDATE_CABINET,
  PHOTO_UPDATE_CV,
  PHOTO_UPLOAD_CABINET,
  PHOTO_UPLOAD_CV,
  PHOTO_FAILED_CABINET,
  PHOTO_FAILED_CV,
  POSITIONS_LOAD,
  RESET_DIRTY_STATUS_FORM_PD,
  SAVED_SUCCESFULLY,
  UPDATE_PERSONALINFORMATION_IN_CONSTRUCTOR_CV,
  RESET_DIRTY_STATUS_IN_CONSTRUCTOR_CV,
  RESET_DIRTY_STATUS_IN_SPECIFIC_CV,
  SPECIFIC_CV_LOADING_OFF,
  SPECIFIC_CV_LOADING_ON,
  SPECIFIC_CV_NOT_FOUND_BY_UUID,
  UPDATE_CONTACTS_IN_CONSTRUCTOR_CV,
  UPDATE_CONTACTS_IN_SPECIFIC_CV,
  UPDATE_EXTRA_FIELDS_IN_SPECIFIC_CV,
  UPDATE_FIELD_IN_CONTACTS_CONSTRUCTOR_CV,
  UPDATE_FIELDS_IN_CONSTRUCTOR_CV,
  UPDATE_FIELDS_IN_CONTACTS_CONSTRUCTOR_CV,
  UPDATE_PERSONALINFORMATION_IN_SPECIFIC_CV,
  UPDATE_PHOTO_IN_SPECIFIC_CV,
  UPLOADED_PHOTO,
  UPDATE_PI_AND_CONTACTS_IN_CONSTRUCTOR_CV
} from '@types';
import $api from '../http/api';

export function authIn() {
  return {
    type: AUTH_IN
  };
}

export function authOut() {
  return {
    type: AUTH_OUT
  };
}

export function loaderOn() {
  return {
    type: LOADER_DISPLAY_ON
  };
}

export function loaderOff() {
  return {
    type: LOADER_DISPLAY_OFF
  };
}

export function authInAndPersonalDetailsLoad() {
  return async (dispatch) => {
    try {
      dispatch(personalDetailsLoadingOn());
      dispatch(constructorCvLoadingOn());
      dispatch(loaderOn());
      const { data } = await $api.get('profile');
      dispatch(personalDetailsUpdate({ ...data, userInDB: true }));
      dispatch(
        updatePIandContactsInConstructorCv({
          personalInformation: {
            name: data.name,
            surname: data.surname,
            country: data.country,
            countryId: data.countryId,
            position: data.position,
            positionId: data.positionId
          },
          contacts: {
            phoneCode: data.phoneCode,
            phoneCodeId: data.phoneCodeId,
            phoneNumber: data.cellPhone,
            email: data.email
          }
        })
      );
      dispatch(authIn());
    } catch (e) {
      if (e?.response?.status === 404) {
        dispatch(authIn());
      }
      console.log(e);
    } finally {
      dispatch(loaderOff());
      dispatch(constructorCvLoadingOff());
      dispatch(personalDetailsLoadingOff());
    }
  };
}

export function changeDirtyStatusFormPD(dirty) {
  return {
    type: CHANGE_DIRTY_STATUS_FORM_PD,
    dirty
  };
}

export function resetDirtyStatusFormPD() {
  return {
    type: RESET_DIRTY_STATUS_FORM_PD
  };
}

export function linkIsClicked(path) {
  return {
    type: LINK_IS_CLICKED,
    data: path
  };
}

export function linkIsNotClicked() {
  return {
    type: LINK_IS_NOT_CLICKED
  };
}

export function countriesLoad() {
  return async (dispatch) => {
    try {
      const { data } = await $api.get('countries');
      dispatch({
        type: COUNTRIES_LOAD,
        data
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function countriesSearch(text) {
  return {
    type: COUNTRIES_SEARCH,
    searchText: text
  };
}

export function phoneCodesAndIdUpdate(phoneCode, phoneCodeId) {
  return {
    type: PHONECODE_AND_ID_UPDATE,
    phoneCode,
    phoneCodeId
  };
}

export function phoneCodesLoad() {
  return async (dispatch) => {
    try {
      const { data } = await $api.get('phonecodes');
      dispatch({
        type: PHONECODES_LOAD,
        data
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function positionsLoad() {
  return async (dispatch) => {
    try {
      const { data } = await $api.get('positions');
      dispatch({
        type: POSITIONS_LOAD,
        data
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function personalDetailsLoadingOn() {
  return {
    type: PERSONALDETAILS_LOADING_ON
  };
}

export function personalDetailsLoadingOff() {
  return {
    type: PERSONALDETAILS_LOADING_OFF
  };
}

export function personalDetailsUpdate(data) {
  return {
    type: PERSONALDETAILS_UPDATE,
    data
  };
}

export function closePhotoModal() {
  return {
    type: MODAL_IS_CLOSED
  };
}

export function openPhotoModal() {
  return {
    type: MODAL_IS_OPENED
  };
}

export function invalidUploadPhoto() {
  return {
    type: INVALID_UPLOAD_PHOTO
  };
}

export function uploadedPhoto() {
  return {
    type: UPLOADED_PHOTO
  };
}

export function updatePersonaInformationInConstructorCv(data) {
  return {
    type: UPDATE_PERSONALINFORMATION_IN_CONSTRUCTOR_CV,
    data
  };
}

export function photoUpdateCabinet(data) {
  return {
    type: PHOTO_UPDATE_CABINET,
    data
  };
}

export function photoUploadCabinet(data) {
  return {
    type: PHOTO_UPLOAD_CABINET,
    data
  };
}

export function photoUpdateCV(data) {
  return {
    type: PHOTO_UPDATE_CV,
    data
  };
}

export function photoUploadCV(data) {
  return {
    type: PHOTO_UPLOAD_CV,
    data
  };
}

export function allCvLoad() {
  return async (dispatch) => {
    try {
      dispatch({ type: ALL_CV_LOADING_ON });
      const { data } = await $api.get('cvs');
      dispatch({
        type: ALL_CV_LOAD,
        data
      });
    } catch (e) {
      console.log(e);
    } finally {
      dispatch({ type: ALL_CV_LOADING_OFF });
    }
  };
}

export function constructorCvLoadingOn() {
  return {
    type: CONSTRUCTOR_CV_LOADING_ON
  };
}

export function constructorCvLoadingOff() {
  return {
    type: CONSTRUCTOR_CV_LOADING_OFF
  };
}

export function updatePIandContactsInConstructorCv(data) {
  return {
    type: UPDATE_PI_AND_CONTACTS_IN_CONSTRUCTOR_CV,
    data
  };
}

export function updateFieldInContactsConstructorCv(fieldName, value) {
  return {
    type: UPDATE_FIELD_IN_CONTACTS_CONSTRUCTOR_CV,
    fieldName,
    value
  };
}
export function updateFieldsInConstructorCv(data) {
  return {
    type: UPDATE_FIELDS_IN_CONSTRUCTOR_CV,
    data
  };
}

export function clearFieldsInContactsConstructorCv() {
  return {
    type: CLEAR_FIELDS_IN_CONTACTS_CONSTRUCTOR_CV
  };
}

export function specificCvLoadingOn() {
  return {
    type: SPECIFIC_CV_LOADING_ON
  };
}

export function specificCvLoadingOff() {
  return {
    type: SPECIFIC_CV_LOADING_OFF
  };
}

export function specificCvNotFound() {
  return {
    type: SPECIFIC_CV_NOT_FOUND_BY_UUID
  };
}

export function updatePersonaInformationInSpecificCv(data) {
  return {
    type: UPDATE_PERSONALINFORMATION_IN_SPECIFIC_CV,
    data
  };
}

export function updateContactsInSpecificCv(data) {
  return {
    type: UPDATE_CONTACTS_IN_SPECIFIC_CV,
    data
  };
}

export function updateExtraFieldsInSpecificCv(data) {
  return {
    type: UPDATE_EXTRA_FIELDS_IN_SPECIFIC_CV,
    data
  };
}

export function getPersonalInformationInSpecificCv(uuid) {
  return async (dispatch) => {
    try {
      dispatch(specificCvLoadingOn());
      const { data } = await $api.get('cvs/' + uuid);
      const { isContactsExists, ...rest } = data;
      dispatch(
        updatePersonaInformationInSpecificCv({
          personalInformation: rest,
          extraFields: {
            isContactsExists
          }
        })
      );
    } catch (e) {
      if (e?.response?.status === 404) {
        dispatch(specificCvNotFound());
      }
    } finally {
      dispatch(specificCvLoadingOff());
    }
  };
}

export function getContactsSpecificCv(uuid) {
  return async (dispatch) => {
    try {
      dispatch(specificCvLoadingOn());

      const { data, status } = await $api.get('cvs/' + uuid + '/contacts');
      if (status === 200) {
        dispatch(
          updateContactsInSpecificCv({
            contacts: data,
            isContactsExists: true
          })
        );
      }
    } catch (e) {
      if (e?.response?.status === 404) {
        dispatch(specificCvNotFound());
      }
      console.log(e);
    } finally {
      dispatch(specificCvLoadingOff());
    }
  };
}

export function changeDirtyStatusInConstructorCv(dirty) {
  return {
    type: CHANGE_DIRTY_STATUS_IN_CONSTRUCTOR_CV,
    dirty
  };
}

export function resetDirtyStatusInConstructorCv() {
  return {
    type: RESET_DIRTY_STATUS_IN_CONSTRUCTOR_CV
  };
}

export function changeDirtyStatusInSpecificCv(dirty) {
  return {
    type: CHANGE_DIRTY_STATUS_IN_SPECIFIC_CV,
    dirty
  };
}

export function resetDirtyStatusInSpecificCv() {
  return {
    type: RESET_DIRTY_STATUS_IN_SPECIFIC_CV
  };
}

export function photoUpdateInSpecificCV(data) {
  return {
    type: UPDATE_PHOTO_IN_SPECIFIC_CV,
    data
  };
}

export function failedToSave() {
  return {
    type: FAILED_TO_SAVE
  };
}

export function savedSuccessfully() {
  return {
    type: SAVED_SUCCESFULLY
  };
}

export function photoFailedCV(data) {
  return {
    type: PHOTO_FAILED_CV,
    data
  };
}

export function photoFailedCabinet(data) {
  return {
    type: PHOTO_FAILED_CABINET,
    data
  };
}
