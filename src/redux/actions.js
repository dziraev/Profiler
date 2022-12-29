import {
  AUTH_IN,
  AUTH_OUT,
  COUNTRIES_LOAD,
  COUNTRIES_SEARCH,
  EDITMODE_OFF,
  EDITMODE_ON,
  PERSONALDETAILS_UPDATE,
  PHONECODE_AND_ID_UPDATE,
  PHONECODE_COUNTRYFLAG_UPDATE,
  PHONECODES_LOAD,
  POSITIONS_LOAD,
  LINK_IS_CLICKED,
  LINK_IS_NOT_CLICKED
} from './types';
import uniqid from 'uniqid';

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
      // const response = await fetch(`https://63a88eec100b7737b98198c8.mockapi.io/api/v1/countries`);
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.API_URL}:8080/api/v1/countries`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer_' + token,
          'Content-Type': 'application/json'
        }
      });
      const jsonData = await response.json();
      dispatch({
        type: COUNTRIES_LOAD,
        data: jsonData
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
export function phoneCodesCountryFlagUpdate(countryFlag) {
  return {
    type: PHONECODE_COUNTRYFLAG_UPDATE,
    countryFlag
  };
}

export function phoneCodesLoad() {
  return async (dispatch) => {
    try {
      // const response = await fetch('https://63a88eec100b7737b98198c8.mockapi.io/api/v1/phonecodes);
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.API_URL}:8080/api/v1/phonecodes`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer_' + token,
          'Content-Type': 'application/json'
        }
      });
      const jsonData = await response.json();
      dispatch({
        type: PHONECODES_LOAD,
        data: jsonData
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function positionsLoad() {
  return async (dispatch) => {
    try {
      // const response = await fetch(`https://63a88eec100b7737b98198c8.mockapi.io/api/v1/positions`);
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.API_URL}:8080/api/v1/positions`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer_' + token,
          'Content-Type': 'application/json'
        }
      });
      const jsonData = await response.json();
      dispatch({
        type: POSITIONS_LOAD,
        data: [{ id: uniqid(), name: 'None' }, ...jsonData]
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
