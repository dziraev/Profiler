import {
  AUTH_IN,
  AUTH_OUT,
  COUNTRIES_LOAD,
  COUNTRIES_SEARCH,
  EDITMODE_OFF,
  EDITMODE_ON,
  LINK_IS_CLICKED,
  LINK_IS_NOT_CLICKED,
  PERSONALDETAILS_UPDATE,
  PHONECODE_AND_ID_UPDATE,
  PHONECODES_LOAD,
  POSITIONS_LOAD
} from './types';
import uniqid from 'uniqid';
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

export function editModeOn() {
  return {
    type: EDITMODE_ON
  };
}

export function editModeOff() {
  return {
    type: EDITMODE_OFF
  };
}

export function linkIsClicked() {
  return {
    type: LINK_IS_CLICKED
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
        data: [{ id: uniqid(), name: 'None' }, ...data]
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
