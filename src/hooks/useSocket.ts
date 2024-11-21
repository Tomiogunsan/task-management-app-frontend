import { IMessage } from "@services/interfaces/response/message";
import { useGetAllMessagesQuery } from "@services/messages.service";
import { getDecodedJwt } from "helpers/auth";
import { useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (teamId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const user = getDecodedJwt();

  const { data } = useGetAllMessagesQuery(teamId);
  const initialMessage = data?.data?.messages;

  const url = import.meta.env.VITE_API_URL;

  // Initialize the socket connection
  useEffect(() => {
    const newSocket = io(url, {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {});

    // newSocket.on("connect_error", (error) => {

    // });

    // newSocket.on("disconnect", () => {
    //   console.log("Socket disconnected");
    // });

    return () => {
      newSocket.disconnect(); // Clean up when the hook is unmounted
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (initialMessage) {
      setMessages(initialMessage);
    }
  }, [initialMessage]);

  useEffect(() => {
    if (socket && teamId) {
      socket.emit("joinTeam", teamId);

      //   return () => {
      //     socket.emit("leaveRoom", teamId);
      //   };
    }
  }, [socket, teamId]);

  // Listen for new messages
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (message: IMessage) => {
      setMessages((prev) => {
        if (prev.some((msg) => msg._id === message._id)) return prev;
        return [...prev, message];
      });
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket]);

  // Send a message
  const sendMessage = useCallback(
    (message: IMessage) => {
      if (socket) {
        const payload = {
          teamId,
          content: message.content,
          userId: user?.user?.id,
          messageId: message._id,
        };
        socket.emit("sendMessage", payload);

        setMessages((prev) => [...prev, message]); // Optimistically update the messages
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [socket, teamId]
  );

  return { socket, messages, sendMessage };
};

export default useSocket;
