import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';

export const PrivateRoute = () => {
  const location = useLocation();
  const token = useAuth();

  return token ? <Outlet /> : <Navigate to='/auth' replace state={{ from: location }} />;
};
