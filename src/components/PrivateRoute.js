import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const PrivateRoute = ({ children }) => {
  const auth = getAuth();
  return auth.currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;