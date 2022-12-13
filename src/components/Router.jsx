import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

const AuthRoutes = () => (
  <Routes>
    <Route path='/auth' element={<LoginPage />} />
    <Route path='/error' element={<NotFoundPage />} />
    <Route path='/*' element={<Navigate to='/auth' />} />
  </Routes>
);
const MainRoutes = () => (
  <Routes>
    <Route path='/main' element={<h1>HELLO WORLD</h1>} />
    <Route path='/*' element={<NotFoundPage />} />
  </Routes>
);

const Router = () => {
  const [isAuth, setIsAuth] = useState(false);
  return isAuth ? <MainRoutes /> : <AuthRoutes />;
};

export default Router;
