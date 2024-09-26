import { NavLink, useLocation } from "react-router-dom";
import { SiTask } from "react-icons/si";

import { RiTeamFill } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import { UsersPath } from "@constants/path";

const USER_SIDENAV = [
  {
    name: "Team",
    path: UsersPath.TEAM,
    icon: <RiTeamFill />,
    iconWhite: <RiTeamFill className="text-white" />,
  },
  
];


const SideNav = () => {
const location = useLocation();
const pathName = location.pathname.split("/")[2];

  return (
    <div className="overflow-auto bg-[#002248] flex flex-col border-r-2 border-[#F7F7F8] text-[#334155] font-[Inter] h-screen">
      <div className="h-[5rem] px-[28px] py-[8px]">
        <SiTask className="h-[50px] w-[143px] text-blue-700" />
      </div>
      <div className="flex flex-col gap-2 pl-4 pr-4">
        {USER_SIDENAV.map((sidenav) => (
          <NavLink
            className={twMerge(
              "grid grid-flow-col items-center justify-start gap-3 px-[14px] text-[14px] font-[400] text-white h-[40px]",
              "transition-[all_.3s] rounded-[10px]",
              "[&.active]:bg-white",
              "[&.active]:text-[#002248]"
            )}
            to={sidenav.path}
            key={sidenav.name}
            // onClick={(e) => {
            //   if (sidenav.disabled) {
            //     e.preventDefault();
            //     e.stopPropagation();
            //   }
            // }}
          >
            {pathName === sidenav.path ? (
              //   <sidenav.IconYellow
              //   // style={{
              //   //   marginLeft: "8px",
              //   // }}
              //   />
              <div>{sidenav.iconWhite} </div>
            ) : (
              //   <sidenav.Icon
              //   // style={{
              //   //   marginLeft: "8px",
              //   // }}
              //   />
              <div>{sidenav.icon} </div>
            )}
            <span>{sidenav.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="flex flex-col py-8 pl-4 mt-auto">
        {/* <NavLink
          className="text-[#334155] font-bold active:text-blue-800 active:font-extrabold  flex items-center gap-3"
          to={ADMIN_SIDENAV_NOTIFICATION.path}
          key={ADMIN_SIDENAV_NOTIFICATION.name}
          style={active}
        >
          {pathName === ADMIN_SIDENAV_NOTIFICATION.path ? (
            <ADMIN_SIDENAV_NOTIFICATION.IconBlue
              style={{
                marginLeft: '8px',
              }}
            />
          ) : (
            <ADMIN_SIDENAV_NOTIFICATION.Icon
              style={{
                marginLeft: '8px',
              }}
            />
          )}

          <span className="text-[#334155] text-[14px] font-[400] mr-[30px]">
            {ADMIN_SIDENAV_NOTIFICATION.name}
          </span>
          <span className="bg-[#CF142B] text-white h-[20px] w-[25px] rounded-[12px] flex items-center  text-[14px] font-[400] justify-center">
            4
          </span>
        </NavLink> */}
      </div>

      {/* <footer className="flex flex-col px-4 py-4 sticky top-auto bottom-0 border-t bg-inherit">
        <div className="px-[14px]">
          <div className="flex items-center justify-between text-white ">
            <p className="  text-[14px] font-[600]">{user?.fullname}</p>
            <Menu
              align="end"
              position="anchor"
              direction="top"
              menuButton={
                <MenuButton>
                  <span className="icon-dots-horizontal" />
                </MenuButton>
              }
              transition={true}
            >
              {menuOptions?.map((menuItem, i) => {
                return (
                  <MenuItem
                    className="w-[14rem] flex gap-2 items-center"
                    key={i}
                    onClick={() => menuItem?.action()}
                  >
                    <span>
                      <menuItem.icon />
                    </span>
                    <span
                      className={`${menuItem.classname} text-[12px] font-[500]`}
                    >
                      {menuItem?.menuTitle}
                    </span>
                  </MenuItem>
                );
              })}
            </Menu>
          </div>
          <p className=" text-[#FFFFFFB2] text-[14px] font-[400] whitespace-nowrap">
            {user?.email}
          </p>
        </div>
      </footer> */}
    </div>
  );
};

export default SideNav;
