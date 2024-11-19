import { ITeams } from "@services/interfaces/response/team";
import ChatSession from "./components/ChatSession";
import SideBar from "./components/SideBar";
import { useState } from "react";

const Messages = () => {
  const [selectedTeam, setSelectedTeam] = useState<ITeams>();
  const handleClick = (data: ITeams) => {
    setSelectedTeam(data);
  };
  return (
    <div className=" px-8  ">
      <div className="grid grid-cols-3 gap-4 p-[32px] rounded-[12px] bg-[#fff] h-screen">
        <div className="bg-[#f6f6f6] rounded-[12px] p-[16px] ">
          <SideBar onClick={handleClick} />
        </div>
        <div className="col-span-2 bg-[#f6f6f6] rounded-[12px] ">
          <ChatSession selectedTeam={selectedTeam as ITeams} />
        </div>
      </div>
    </div>
  );
};

export default Messages;
