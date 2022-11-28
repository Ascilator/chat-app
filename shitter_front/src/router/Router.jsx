import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../components/AuthForm/AuthForm';
import Room from '../components/Room/Room';
import RoomManager from '../components/RoomManager/RoomManager';
import RequireAuth from './components/RequireAuth';

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<AuthForm />} />
      <Route
        path="/rooms"
        element={
          <RequireAuth>
            <RoomManager />
          </RequireAuth>
        }
      />
      <Route
        path="/rooms/:roomId"
        element={
          <RequireAuth>
            <Room />
          </RequireAuth>
        }
      />
      <Route path="*" element={<div>dead end</div>} />
    </Routes>
  );
};

export default Router;
