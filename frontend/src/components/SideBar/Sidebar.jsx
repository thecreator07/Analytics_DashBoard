import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboardCustomize, MdAutoGraph } from "react-icons/md";
import { TbLayoutDashboard, TbBrandGoogleAnalytics } from "react-icons/tb";
import { LiaCogSolid } from "react-icons/lia";
// import { IoNotifications } from "react-icons/io5";
import { SiCompilerexplorer } from "react-icons/si";
import { useSelector } from "react-redux";

const Sidebar = ({ show }) => {
  // const { dispatch } = useContext(UserContext)
  const mode = useSelector((state) => state.mode);

  const NavlinkStyle = ` my-2 px-6 py-3 text-lg font-medium hover:bg-[#151631]  hover:text-white;`;
  return (
    <div
      className={`w-full md:w-2/12 ${
        show ? "hidden" : ""
      } absolute md:relative flex-col justify-between h-full ${
        mode === "light" ? "bg-white text-[#414141]" : "bg-[#414141] text-white"
      } py-4 md:flex z-20`}
    >
      <div className="w-full">
        <div className="w-full flex justify-center px-4">
          <h1 className="font-semibold text-xl flex items-center gap-2">
            <MdDashboardCustomize />
            Analytics Dashboard
          </h1>
        </div>
        <div className="w-full mt-6">
          <NavLink
            to={"/main"}
            className={({ isActive }) =>
              isActive
                ? `${NavlinkStyle} ${
                    mode === "light"
                      ? "bg-[#FAF0E6] text-[#414141]"
                      : "bg-[#352F44] text-white"
                  } flex gap-2 items-center`
                : `${NavlinkStyle} flex gap-2 items-center`
            }
          >
            <MdAutoGraph />
            Dashboard
          </NavLink>
          {/* <NavLink
            to={"/analysis"}
            className={({ isActive }) =>
              isActive
                ? `${NavlinkStyle} ${
                    mode === "light"
                      ? "bg-[#FAF0E6] text-[#414141]"
                      : "bg-[#352F44] text-white"
                  } flex gap-2 items-center`
                : `${NavlinkStyle} flex gap-2 items-center`
            }
          >
            <TbBrandGoogleAnalytics />
            Analysis
          </NavLink> */}
          <NavLink
            to={"/explore"}
            className={({ isActive }) =>
              isActive
                ? `${NavlinkStyle} ${
                    mode === "light"
                      ? "bg-[#FAF0E6] text-[#414141]"
                      : "bg-[#352F44] text-white"
                  } flex gap-2 items-center`
                : `${NavlinkStyle} flex gap-2 items-center`
            }
          >
            <SiCompilerexplorer />
            Explore
          </NavLink>
          <NavLink
            to={"/settings"}
            className={({ isActive }) =>
              isActive
                ? `${NavlinkStyle} ${
                    mode === "light"
                      ? "bg-[#FAF0E6] text-[#414141]"
                      : "bg-[#352F44] text-white"
                  } flex gap-2 items-center`
                : `${NavlinkStyle} flex gap-2 items-center`
            }
          >
            <LiaCogSolid />
            Settings
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
