import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { LiaProjectDiagramSolid } from "react-icons/lia";
import { RiTeamFill } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import { AuthPagePath, UsersPath } from "@constants/path";

import { logOut } from "helpers/auth";

const USER_SIDENAV = [
  {
    name: "Team",
    path: UsersPath.TEAM(),
    icon: <RiTeamFill />,
    iconWhite: <RiTeamFill />,
  },
  {
    name: "Project",
    path: UsersPath.PROJECT(),
    icon: <LiaProjectDiagramSolid />,
    iconWhite: <LiaProjectDiagramSolid />,
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
    <div className="overflow-auto bg-[#F7F7F8] flex flex-col border-r-2 border-[#F7F7F8] text-[#000] font-[Inter] h-screen ">
      <div className="flex items-center gap-2 pl-8 pr-4 py-8">
        <img src="/logo.png" alt="logo" className="h-[36px] w-[31px] " />
        <h1 className="text-[25px] font-[600] leading-8 text-[#3B3B45]">
          Collab
        </h1>
      </div>
      <div className="flex flex-col gap-2 pl-8 pr-4">
        {USER_SIDENAV.map((sidenav) => (
          <NavLink
            className={twMerge(
              "grid grid-flow-col items-center justify-start gap-3 px-[14px] text-[14px] font-[400] text-[#818187] h-[40px]",
              "transition-[all_.3s] rounded-[10px]",
              "[&.active]:bg-[#FFf] ",
              "[&.active]:text-[#FF8600]"
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

      <div className="flex flex-col py-8 mt-auto w-[232px]  pl-8">
        <div className="flex flex-col items-center justify-center bg-[#fff] rounded-[12px] shadow-md px-4 pb-4 gap-[6px]">
          <div className="w-[60px] h-[60px] rounded-full bg-slate-200" />
          <h3 className="text-[18px] font-[500] leading-6 text-[#3B3B45]">
            Theresa milly
          </h3>
          <p className="text-[12px] leading-4 font-[400] text-[#818187]">
            Influencer
          </p>
          <div
            className="bg-[#FF860029] rounded-[12px] flex gap-2 items-center justify-center p-4 w-full cursor-pointer"
            onClick={handleLogout}
          >
            <img src="/export.png" alt="icon" className="w-[18px]" />
            <p className="text-[#ff8600] text-[14px] leading-5 font-[500]">
              Logout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
