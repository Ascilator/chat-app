import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UserAuthContext } from '../../store/UserContext/UserContext';
import useRoom from './utils/useRoom';

const Room = () => {
  const location = useLocation();
  const [room, setRoom] = useState('');
  const {
    sendMessage,
    isJoinedRoom,
    messageList,
    typer,
    sendTyping,
    sendEndOfTyping,
  } = useRoom(room);
  const { user } = useContext(UserAuthContext);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (message != '') {
      sendTyping({
        room,
        sender: user.email,
      });
    } else {
      sendEndOfTyping({
        room,
      });
    }
  }, [message]);

  useEffect(() => {
    const roomLoc = location.pathname.split('/').slice(-1).join();
    setRoom(roomLoc);
  }, []);

  return isJoinedRoom ? (
    <div>
      <div>Hello, {user.email}</div>
      <div>
        {messageList.map((el) => {
          return (
            <div key={el.id}>
              <b>{el.sender}</b> {el.message}
            </div>
          );
        })}

        {typer && typer !== user.email && <div>{typer} is typing</div>}
      </div>

      <div>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <button
        onClick={() => {
          if (!message) return;
          sendMessage({
            sender: user.email,
            room: room,
            message,
          });
          setMessage('');
        }}
      >
        send message
      </button>
    </div>
  ) : (
    <div>loading</div>
  );
};

export default Room;
