import axios from 'axios';

export const API_URL = 'localhost:8080/api/v1/auth/';

const $api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json'
  }
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default $api;
