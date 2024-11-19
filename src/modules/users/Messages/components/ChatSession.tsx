import { IoIosSearch } from "react-icons/io";
import { FiHeart } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { ITeams } from "@services/interfaces/response/team";
import { capitalize } from "lodash";
import {
  useGetAllMessagesQuery,
  useSendMessageMutation,
} from "@services/messages.service";
import io , {Socket} from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { IMessage } from "@services/interfaces/response/message";
import { getDecodedJwt } from "helpers/auth";
import Button from "shared/Button";
import Badge from "shared/Badge";
import { formatTime } from "@utils/constant";

type Props = {
  selectedTeam: ITeams;
};

const ChatSession = ({ selectedTeam }: Props) => {
  const teamId = selectedTeam?._id as string;
  const user = getDecodedJwt();

  const currentUserId = user?.user?.id;

  const { data } = useGetAllMessagesQuery(teamId);
  const [sendMessage] = useSendMessageMutation();
  const initialMessage = data?.data?.messages;
  const [messages, setMessages] = useState(initialMessage || []);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialMessage) {
      setMessages(initialMessage);
    }
  }, [initialMessage]);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_API_BASE_URL, {
      transports: ["websocket", "polling"],
    });
    setSocket(newSocket);
    newSocket.emit("joinRoom", teamId);

    newSocket.on("receiveMessage", (message: IMessage) => {
      console.log("New message received:", message);
      setMessages((prev) => [...prev, message]);
    });
    return () => {
      newSocket.disconnect();
    };
  }, [teamId]);

  const sendMessageHandler = async () => {
    const payload = {
      teamId,
      content: newMessage,
      userId: user?.user?.id,
    };
    await sendMessage(payload).unwrap();
    // const savedMessage = {
    //   content: res?.data?.message?.content,
    //   teamId: res?.data?.message?.team,
    //   userId: res?.data?.message?.sender,
    // };

     if (newMessage.trim() && socket) {
    socket.emit("sendMessage", payload);

      setNewMessage("");
    }
    // setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessageHandler();
      setNewMessage("");
    }
  };

  const scrollToTop = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
    messageContainerRef.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToTop();
  }, [messages]);

  return (
    <>
      {selectedTeam ? (
        <div className=" flex flex-col justify-between h-screen font-[Inter]">
          <div className="flex justify-between  items-center py-4 sticky top-0  z-10 bg-[#f6efef] shadow-sm shadow-[#d0c8c8] px-[16px]">
            <div className="flex gap-[4px] items-center">
              <div className="w-[45px] h-[45px] mr-2 rounded-full bg-slate-200 uppercase text-center pt-2 text-lg font-semibold">
                {capitalize(selectedTeam?.name?.charAt(0))}
              </div>
              <p className="text-[15px] leading-[18px] font-[600] text-[#2e2e2e]">
                {capitalize(selectedTeam?.name)}
              </p>
            </div>

            <div className="flex gap-4">
              <IoIosSearch className="w-[20px] h-[20px] text-[#8D8D8D]" />
              <FiHeart className="w-[20px] h-[20px] text-[#8D8D8D]" />
              <FiBell className="w-[20px] h-[20px] text-[#8D8D8D]" />
            </div>
          </div>
          <hr className="bg-[#8D8D8D]" />

          {/* chat */}
          <div
            className="flex-1 overflow-y-auto space-y-4 p-4 h-[400px]"
            ref={messageContainerRef}
          >
            {messages.map((item) => (
              <div
                key={item._id}
                className={`flex  gap-2 ${
                  item.sender._id === currentUserId
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {item.sender._id !== currentUserId && (
                  <Badge
                    name={item?.sender?.name?.charAt(0)}
                    className="w-[25px] h-[25px] mt-10 pt-0"
                  />
                )}
                <div
                  className={`relative max-w-[70%] p-3 rounded-[10px] shadow-md bg-[#f1f1f1]${
                    item.sender._id === currentUserId
                      ? " text-right rounded-br-none"
                      : " text-left rounded-bl-none"
                  }`}
                >
                  <p
                    className={`text-[16px] leading-5 font-[400]  ${
                      item.sender._id === currentUserId
                        ? "text-[#ff8600]"
                        : "text-[#2e2e2e]"
                    }`}
                  >
                    {item.content}
                  </p>
                  <div className="text-[#666] text-[0.75rem]">
                    <small>{capitalize(item.sender.name)}</small> -{" "}
                    <small>{formatTime(item.createdAt)}</small>
                  </div>
                </div>
                {item.sender._id === currentUserId && (
                  <Badge name={item?.sender?.name?.charAt(0)} />
                )}
              </div>
            ))}
          </div>
          <div className="bg-[#d9d9d9] rounded-[12px] px-[40px] py-[28px] sticky bottom-0">
            <div className="flex gap-[13px] ">
              <div className="flex items-center  gap-4 bg-white p-2 rounded-[16px] w-full ">
                <img src="/mic.png" alt="icon" className="w-[16px] h-[22px]" />
                <input
                  type="text"
                  placeholder="Write something..."
                  className="bg-transparent outline-none relative flex flex-grow"
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                  onKeyDown={handleKeyDown}
                />
                <div className="flex gap-2 bg-white absolute right-[140px]">
                  <img
                    src="/attachment.png"
                    alt="icon"
                    className="w-[24px] h-[20px]"
                  />
                  <img
                    src="/camera.png"
                    alt="icon"
                    className="w-[24px] h-[20px]"
                  />
                  <img
                    src="/smile.png"
                    alt="icon"
                    className="w-[24px] h-[20px]"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="rounded-full "
                onClick={sendMessageHandler}
              >
                <img src="/send.png" alt="icon" className="w-[36px] h-[36px]" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-[150px] text-lg text-[#818187]">
          Please select a team to chat with
        </div>
      )}
    </>
  );
};

export default ChatSession;
