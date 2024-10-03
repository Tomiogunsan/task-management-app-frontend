import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { SiTask } from "react-icons/si";

import { RiTeamFill } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import { AuthPagePath, UsersPath } from "@constants/path";
import { IoPerson } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { logOut } from "helpers/auth";

const USER_SIDENAV = [
  {
    name: "Team",
    path: UsersPath.TEAM,
    icon: <RiTeamFill />,
    iconWhite: <RiTeamFill className="text-white" />,
  },
  {
    name: "Project",
    path: UsersPath.PROJECT,
    icon: <RiTeamFill />,
    iconWhite: <RiTeamFill className="text-white" />,
  },
];

const SideNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathName = location.pathname.split("/")[2];

  const handleLogout = () => {
    logOut();
    navigate(AuthPagePath.signin(), { replace: true });
  };

  return (
    <div className="overflow-auto bg-[#F7F7F8] flex flex-col border-r-2 border-[#F7F7F8] text-[#000] font-[Inter] h-screen">
      <div className="h-[5rem] px-[28px] py-[8px]">
        <SiTask className="h-[50px] w-[143px] text-blue-700" />
      </div>
      <div className="flex flex-col gap-2 pl-4 pr-4">
        {USER_SIDENAV.map((sidenav) => (
          <NavLink
            className={twMerge(
              "grid grid-flow-col items-center justify-start gap-3 px-[14px] text-[14px] font-[400] text-[#000] h-[40px]",
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
              <div>{sidenav.iconWhite} </div>
            ) : (
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

      <footer className="flex flex-col px-4 py-4 sticky top-auto bottom-0 border-t  bg-[#002248] text-white">
        <div className="px-[14px] ">
          <div className="flex gap-2">
            <IoPerson />{" "}
            <div>
              <p className="  text-[14px] font-[600]">Nife</p>

              <p className=" text-[#FFFFFFB2] text-[14px] font-[400] whitespace-nowrap">
                {/* {user?.email} */}yyy@gmail.com
              </p>
            </div>
          </div>

          <div
            className="flex gap-2 cursor-pointer pt-4"
            onClick={handleLogout}
          >
            <BiLogOut size={20} className="" />
            <p>LogOut</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SideNav;
