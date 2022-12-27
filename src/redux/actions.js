import {
  AUTH_IN,
  AUTH_OUT,
  COUNTRIES_LOAD,
  COUNTRIES_SEARCH,
  PERSONALDETAILS_UPDATE,
  PHONECODE_AND_ID_UPDATE,
  PHONECODES_LOAD
} from './types';

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
      // const token = localStorage.getItem('token');
      // const response = await fetch(`${process.env.API_URL}:8080/api/v1/countries`, {
      //   method: 'GET',
      //   headers: {
      //     Authorization: 'Bearer_' + token,
      //     'Content-Type': 'application/json'
      //   }
      // });
      // const jsonData = await response.json();
      const jsonData = [
        { id: 14, countryName: 'Belarus' },
        { id: 1, countryName: 'Afganistan' },
        { id: 142, countryName: 'Russia' },
        { id: 5444, countryName: 'Ukraine' },
        { id: 544, countryName: 'India' }
      ];
      dispatch({
        type: COUNTRIES_LOAD,
        data: jsonData
      });
    } catch (e) {
      console.log(e);
    }
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
      const response = await fetch(`https://63a88eec100b7737b98198c8.mockapi.io/api/v1/codes`);
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
