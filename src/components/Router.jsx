import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PersonalInformation, Contacts, AboutYourself } from '@cvSteps';
import { PrivateRoute } from '@hoc/PrivateRoute';
import { MainPaths } from '@configs/configs';
import LoginPage from '../pages/LoginPage/LoginPage';
import PersonalCabinetPage from '../pages/PersonalCabinetPage/PersonalCabinetPage';
import MyCV from '../pages/MyCV/MyCV';
import PersonalDetails from '../pages/PersonalDetails/PersonalDetails';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import CV from '../pages/CV/CV';
import GeneralErrorPage from '../pages/GeneralErrorPage/GeneralErrorPage';

export const Router = () => {
  const navigate = useNavigate();
  const statusCode = useSelector((state) => state.statusCodeReducer.statusCode);
  useEffect(() => {
    if (statusCode === 500) {
      navigate(MainPaths.GENERAL_ERROR);
    }
  }, [statusCode]);

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path='/' element={<Navigate to='/main/my-cv' />} />
        <Route path='/main' element={<PersonalCabinetPage />}>
          <Route path='/main' element={<Navigate to='/my-cv' replace />} />
          <Route path='personal-details' element={<PersonalDetails />} />
          <Route path='my-cv' element={<MyCV />} />
        </Route>
        <Route path='/cv' element={<CV />}>
          <Route path='/cv' element={<Navigate to='/main/my-cv' replace />} />
          <Route path='personal-info' element={<PersonalInformation />} />
          <Route path='personal-info/:uuid' element={<PersonalInformation />} />
          <Route path='contacts/:uuid' element={<Contacts />} />
          <Route path='about-yourself/:uuid' element={<AboutYourself />} />
        </Route>
        <Route path='/404' element={<NotFoundPage />} />
        <Route path='/error' element={<GeneralErrorPage />} />
      </Route>
      <Route path='/auth' element={<LoginPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};
