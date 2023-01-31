import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { authInAndPersonalDetailsLoad } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  useEffect(() => {
    try {
      const decodedToken = token ? jwt_decode(token) : null;

      if (token && Date.now() > decodedToken?.exp * 1000) {
        localStorage.removeItem('token');
      }
      if (token) {
        dispatch(authInAndPersonalDetailsLoad());
      }
    } catch (e) {
      navigate('/auth');
    }
  }, []);
  return token;
};
