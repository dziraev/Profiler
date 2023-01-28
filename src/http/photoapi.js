import axios from 'axios';

export const API_URL = `${process.env.API_URL}/api/v1/`;

const photoapi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'multipart/form-data'
  }
});

photoapi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default photoapi;
