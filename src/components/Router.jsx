import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import PersonalCabinetPage from '../pages/PersonalCabinetPage/PersonalCabinetPage';
import MyCV from '../pages/MyCV/MyCV';
import PersonalDetails from '../pages/PersonalDetails/PersonalDetails';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import { useSelector } from 'react-redux';

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
      <Route path='to-cv' element={<MyCV />} />
    </Route>
    <Route path='/' element={<Navigate to='/main/personal-details' />} />
    <Route path='*' element={<NotFoundPage />} />
  </Routes>
);

const Router = () => {
  const { isAuth } = useSelector((state) => state.authReducer);
  return isAuth ? <MainRoutes /> : <AuthRoutes />;
};

export default Router;
