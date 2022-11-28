import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserAuthContext } from '../../store/UserContext/UserContext';

const RequireAuth = ({ children }) => {
  const { isAuth } = useContext(UserAuthContext);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
