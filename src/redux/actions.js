import {
  ALL_CV_LOAD,
  ALL_CV_LOADING_OFF,
  ALL_CV_LOADING_ON,
  AUTH_IN,
  AUTH_OUT,
  CHANGE_DIRTY_STATUS_FORM_CV,
  CHANGE_DIRTY_STATUS_FORM_PD,
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
  RESET_DIRTY_STATUS_FORM_CV,
  RESET_DIRTY_STATUS_FORM_PD,
  SAVED_SUCCESFULLY,
  UPDATE_PERSONALINFORMATION_FROM_PD,
  UPDATE_PERSONALINFORMATION_IN_SPECIFIC_CV,
  UPDATE_PHOTO_IN_SPECIFIC_CV,
  UPLOADED_PHOTO
} from './types';
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
      dispatch(loaderOn());
      const { data } = await $api.get('profile');
      dispatch(personalDetailsUpdate({ ...data, userInDB: true }));
      dispatch(
        updatePersonaInformationFromPD({
          name: data.name,
          surname: data.surname,
          country: data.country,
          countryId: data.countryId,
          position: data.position,
          positionId: data.positionId
        })
      );
      dispatch(authIn());
    } catch (e) {
      if (e.response && e.response.status === 404) {
        dispatch(authIn());
      }
      console.log(e);
    } finally {
      dispatch(loaderOff());
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

export function updatePersonaInformationFromPD(data) {
  return {
    type: UPDATE_PERSONALINFORMATION_FROM_PD,
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

export function getPersonalInformation(uuid) {
  return async (dispatch) => {
    try {
      const { data } = await $api.get('cvs/' + uuid);
      dispatch({
        type: UPDATE_PERSONALINFORMATION_IN_SPECIFIC_CV,
        data
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function personalInfoUpdateInSpecificCV(data) {
  return {
    type: UPDATE_PERSONALINFORMATION_IN_SPECIFIC_CV,
    data
  };
}

export function changeDirtyStatusFormCv(dirty) {
  return {
    type: CHANGE_DIRTY_STATUS_FORM_CV,
    dirty
  };
}

export function resetDirtyStatusFormCv() {
  return {
    type: RESET_DIRTY_STATUS_FORM_CV
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