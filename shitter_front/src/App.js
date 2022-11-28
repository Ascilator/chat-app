import { useContext, useEffect, useState } from 'react';
import AuthForm from './components/AuthForm/AuthForm';
import Router from './router/Router';
import socket from './socket/socket';
import { UserAuthContext } from './store/UserContext/UserContext';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const { checkAuth, isAuth } = useContext(UserAuthContext);

  useEffect(() => {
    checkAuth();
    console.log('afd', isAuth);
  }, [isAuth]);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
