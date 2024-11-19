import { capitalize } from "lodash";

import Badge from "shared/Badge";
import { twMerge } from "tailwind-merge";

export type IMessageCard = {
  avatar: string;
  name: string;
  role?: string;
  icon?: string;
  time?: string;
  className?: string;
  onClick?: () => void;
};

const MessageCard = ({
  name,
  role,
  icon,
  time,
  className,
  avatar,
  onClick,
}: IMessageCard) => {
  return (
    <div className="flex justify-between items-center cursor-pointer" onClick={onClick}>
      <div className="flex gap-2 items-center">
        
         <Badge name={avatar}/> 
       
        <div>
          <p className="text-[16px] leading-5 font-[600] text-[#ff8600] text-capitalize">
            {capitalize(name)}
          </p>
          <p
            className={twMerge(
              "text-[9px] font-[400] leading-3 text-[#959595] pl-[4px] pt-[2px]",
              className
            )}
          >
            {capitalize(role?.replace('-', ' '))}
          </p>
        </div>
      </div>
      <div>
        {icon && <img src={icon} alt="icon" className="w-[16px] h-[17px]" />}
        {time && (
          <p className="text-[9px] font-[400] leading-[9px] text-[#8d8d8d]">
            {time}
          </p>
        )}
      </div>
    </div>
  );
};

export default MessageCard;
