import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserAuthContext } from '../../store/UserContext/UserContext';

const AuthForm = () => {
  const { login, isAuth, register } = useContext(UserAuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuth) {
      navigate(from, { replace: true });
    }
  }, [isAuth]);

  const handleRegister = async () => {
    await register(email, password);
  };

  const handleLogin = async () => {
    await login(email, password);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>register</button>
      <button onClick={handleLogin}>login</button>
    </div>
  );
};

export default AuthForm;
