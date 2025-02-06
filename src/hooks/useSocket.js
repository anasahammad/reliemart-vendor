import io from "socket.io-client";

const socket = io("https://new.kajghor.com");

export default function useSocket() {
  return {
    socket: socket,
    socketId: socket.id,
    sendToServer: function (key, data) {
      socket.emit(key, data);
    },
    receive: function (key, f) {
      socket.on(key, f);
    },
    joinRoom: function (roomName) {
      socket.emit("joinRoom", roomName);
    },
  };
}