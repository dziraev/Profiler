import {
  AUTH_IN,
  AUTH_OUT,
  COUNTRIES_LOAD,
  COUNTRIES_SEARCH,
  PERSONALDETAILS_UPDATE
} from './types';
import { API_URL } from '../http/api';

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

export function countriesLoad() {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://192.168.205.11:8080/api/v1/countries', {
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

export function personalDetailsUpdate(data) {
  return {
    type: PERSONALDETAILS_UPDATE,
    data
  };
}
