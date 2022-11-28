import React, { createContext, useState } from 'react';
import jwt from 'jwt-decode';

import AuthService from './utils/AuthService';

export const UserAuthContext = createContext(null);

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  const login = async (email, password) => {
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.token);
      setUser(jwt(response.data.token));
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (email, password) => {
    try {
      const response = await AuthService.register(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.token);
      setUser(jwt(response.data.token));
      setIsAuth(true);
    } catch (error) {
      // console.log(error);
    }
  };

  const logout = async () => {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem('token');
      setUser({});
      setIsAuth(false);
    } catch (error) {
      // console.log(error);
    }
  };

  const checkAuth = () => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      setUser(jwt(userToken));
      setIsAuth(true);
    }
  };

  return (
    <UserAuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        isAuth,
        setIsAuth,
        checkAuth,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserContext;
