import {
  AUTH_IN,
  AUTH_OUT,
  CHANGE_DIRTY_STATUS_FORM_PD,
  COUNTRIES_LOAD,
  COUNTRIES_SEARCH,
  INVALID_UPLOAD,
  LINK_IS_CLICKED,
  LINK_IS_NOT_CLICKED,
  LOADER_DISPLAY_OFF,
  LOADER_DISPLAY_ON,
  MODAL_IS_CLOSED,
  MODAL_IS_OPENED,
  PERSONALDETAILS_UPDATE,
  PHONECODE_AND_ID_UPDATE,
  PHONECODES_LOAD,
  POSITIONS_LOAD,
  RESET_DIRTY_STATUS_FORM_PD,
  UPDATE_PERSONALINFORMATION_FROM_PD,
  UPLOADED
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
      Object.keys(data).forEach(function (key) {
        if (this[key] == null) this[key] = '';
      }, data);
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

export function invalidUpload() {
  return {
    type: INVALID_UPLOAD
  };
}

export function uploaded() {
  return {
    type: UPLOADED
  };
}
export function updatePersonaInformationFromPD(data) {
  return {
    type: UPDATE_PERSONALINFORMATION_FROM_PD,
    data
  };
}
