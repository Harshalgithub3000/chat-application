import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../pages/home/Loader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, screenLoading } = useSelector((state) => state.user);
  // Wait for Redux Persist to rehydrate before checking authentication
  
  if (screenLoading) {
    return <Loader alert={"Loading..."}/> // Or a proper loader
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
