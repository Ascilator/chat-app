import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const RoomManager = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/rooms/${uuidv4()}`);
  };
  return (
    <div>
      <button onClick={handleClick}>join room</button>
    </div>
  );
};

export default RoomManager;
