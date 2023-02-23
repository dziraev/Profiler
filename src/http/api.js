import axios from 'axios';

export const API_URL = `${window?._env_?.API_URL || process.env.API_URL}/api/v1/`; ////it's not correct. Can't do that window?._env_?.API_URL

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
