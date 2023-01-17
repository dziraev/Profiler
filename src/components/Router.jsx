import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authInAndPersonalDetailsLoad } from '../redux/actions';
import jwt_decode from 'jwt-decode';
import LoginPage from '../pages/LoginPage/LoginPage';
import PersonalCabinetPage from '../pages/PersonalCabinetPage/PersonalCabinetPage';
import MyCV from '../pages/MyCV/MyCV';
import PersonalDetails from '../pages/PersonalDetails/PersonalDetails';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import CV from '../pages/CV/CV';

const AuthRoutes = () => (
  <Routes>
    <Route path='/auth' element={<LoginPage />} />
    <Route path='/*' element={<Navigate to='/auth' />} />
  </Routes>
);
const MainRoutes = () => (
  <Routes>
    <Route path='/main' element={<PersonalCabinetPage />}>
      <Route path='personal-details' element={<PersonalDetails />} />
      <Route path='my-cv' element={<MyCV />} />
    </Route>
    <Route path='/cv' element={<CV />}>
      {/* <Route path='personal-info' element={< />} /> */}
    </Route>
    <Route path='/auth' element={<Navigate to='/main/my-cv' />} />
    <Route path='/' element={<Navigate to='/main/my-cv' />} />
    <Route path='/404' element={<NotFoundPage />} />
    <Route path='*' element={<NotFoundPage />} />
  </Routes>
);

const Router = () => {
  const dispatch = useDispatch();
  const { isAuth, isLoading } = useSelector((state) => state.authReducer);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwt_decode(token) : null;

    if (token && Date.now() > decodedToken.exp * 1000) {
      localStorage.removeItem('token');
    }

    if (token) {
      dispatch(authInAndPersonalDetailsLoad());
    }
  }, []);

  if (isLoading) {
    return;
  }

  return isAuth ? <MainRoutes /> : <AuthRoutes />;
};

export default Router;
