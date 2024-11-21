import { io, Socket } from "socket.io-client";
const socketUrl = import.meta.env.VITE_API_BASE_URL ?? "";

console.log(socketUrl, "url");

export const initializeSocket = (): Socket => {
  const socket = io("http://localhost:3000", {
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });
  socket.on("connect", () => console.log("socket connected", socket.id));
  socket.on("disconnect", () => console.log("socket disconnected"));
  socket.on("connect_error", (error) =>
    console.log("socket connection error", error)
  );
  return socket;
};
