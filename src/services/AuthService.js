import $api from '../http/api';

export default class AuthService {
  static async login(email, password) {
    return $api.post('/login', { email, password });
  }
}
