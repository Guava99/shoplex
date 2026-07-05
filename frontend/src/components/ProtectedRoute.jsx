import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(ShopContext);
  const location = useLocation();

  if (!token) {
    toast.error('Please login to continue', { toastId: 'auth-required' });
    return <Navigate to={`/login?returnTo=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
