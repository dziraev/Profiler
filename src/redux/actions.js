import { AUTH_IN, AUTH_OUT, COUNTRIES_LOAD, PERSONALDETAILS_UPDATE } from './types';

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

export function countriesLoad(str) {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://63a2d4e1471b38b206fd9b87.mockapi.io/country?search=${str}`
      );
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

export function personalDetailsUpdate(data) {
  return {
    type: PERSONALDETAILS_UPDATE,
    data
  };
}
