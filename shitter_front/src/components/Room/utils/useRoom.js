import { useEffect, useState } from 'react';
import socket from '../../../socket/socket';
import {
  END_OF_TYPING,
  JOINED_ROOM,
  JOIN_ROOM,
  MESSAGE_TO_CLIENT,
  MESSAGE_TO_SERVER,
  TYPING,
} from '../../../socket/socketEvents';

const useRoom = (room) => {
  const [isJoinedRoom, setIsJoinedRoom] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [typer, setTyper] = useState(null);

  const joinedRoomCallback = () => {
    setIsJoinedRoom(true);
  };

  const messageToClientCallback = (payload) => {
    setMessageList((prevState) => {
      return [...prevState, payload];
    });
  };

  const typingCallBack = (sender) => {
    setTyper(sender);
  };

  const endOfTypingCallback = () => {
    setTyper(null);
  };

  useEffect(() => {
    socket.on(JOINED_ROOM, joinedRoomCallback);
    socket.on(MESSAGE_TO_CLIENT, messageToClientCallback);
    socket.on(TYPING, typingCallBack);
    socket.on(END_OF_TYPING, endOfTypingCallback);

    return () => {
      socket.off(JOINED_ROOM, joinedRoomCallback);
      socket.off(MESSAGE_TO_CLIENT, messageToClientCallback);
      socket.off(TYPING, typingCallBack);
      socket.off(END_OF_TYPING, endOfTypingCallback);
    };
  }, [room]);

  useEffect(() => {
    if (room) {
      socket.emit(JOIN_ROOM, room);
    }
  }, [room]);

  const sendMessage = ({ sender, message }) => {
    socket.emit(MESSAGE_TO_SERVER, {
      sender,
      room: room,
      message,
    });
  };

  const sendTyping = ({ sender, room }) => {
    socket.emit(TYPING, {
      sender,
      room,
    });
  };

  const sendEndOfTyping = ({ room }) => {
    socket.emit(END_OF_TYPING, { room });
  };

  return {
    sendMessage,
    isJoinedRoom,
    messageList,
    typer,
    sendEndOfTyping,
    sendTyping,
  };
};

export default useRoom;
