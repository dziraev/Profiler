import { AUTH_IN, AUTH_OUT } from './types';

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
