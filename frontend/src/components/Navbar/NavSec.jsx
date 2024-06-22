import { MenuItem, Select, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import div from "../../components/div";
// import { useMediaQuery, useTheme } from "@mui/material";
// import { setLogout, setMode } from "../../state/state";

import { TbSearch } from "react-icons/tb";
import { MdDarkMode } from "react-icons/md";
import { BsFillCloudSunFill } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";
import { IoMdNotifications, IoMdHelpCircle } from "react-icons/io";
import { MdOutlineMenuOpen } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
// import { MenuItem, Select } from "@material-ui/core";
import { setmode } from "../../state/sliceReducer.js";
const NavSec = () => {
  const [value, setvalue] = React.useState();
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const isNonMobileScreens = useMediaQuery("width<1000px");
  console.log(isNonMobileScreens)
  // const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [IsMobileMenuToggled, setIsMobileMenuToggled] = React.useState(true);
  const mode = useSelector((state) => state.mode);
  // // const theme = useTheme();
  // const neutralLight = theme.palette.neutral.light;
  // const dark = theme.palette.neutral.dark;
  // const background = theme.palette.background.default;
  // const primaryLight = theme.palette.primary.light;
  // const alt = theme.palette.background.alt;

  // const fullName = `${user.firstName} ${user.lastName}`;
  useEffect(() => {
    document.body.style.background = mode === "light" ? "white" : "#414141";
  }, [mode]);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        // backgroundColor={alt}
        className={`w-full sticky px-2 md:px-4 py-4 z-50 bg-gray-300 `}
      >
        {/* <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className="md:gap-7 gap-2"
        >
          <h2
            className="font-bold viber text-xs bg-clip-text"
            // onClick={() => navigate("/home")}
          >
            Viber
          </h2>
        </div> */}
        {isNonMobileScreens ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            gap="2rem"
          >
            <button onClick={() => dispatch(setmode())}>
              {mode === "dark" ? (
                <BsFillCloudSunFill className="text-yellow-500" size={25} />
              ) : (
                <MdDarkMode
                  className="text-black bg-clip-text transparent gradcol"
                  size={25}
                />
              )}
            </button>
            <BiMessageDetail
              className={`${mode === "dark" ? "text-white" : "text-black"}`}
              size={25}
            />
            <IoMdNotifications
              className={`text-black ${
                mode === "dark" ? "text-white" : "text-black"
              }`}
              size={25}
            />
            <IoMdHelpCircle
              className={`text-black ${
                mode === "dark" ? "text-white" : "text-black"
              }`}
              size={25}
            />
            {/* <select
              className="select"
              value={username}
              onChange={handleSelectChange}
              style={{ color: "white", background: "gray" }}
            >
              <option value={username}>{username}</option>
              <option onClick={() => dispatch(setLogout())}>Log Out</option>
            </select> */}
            <Select
              value={fullName}
              style={{
                // backgroundColor: neutralLight,
                width: "150px",
                color: mode === "dark" ? "white" : "black",
                borderRadius: "0.25rem",
                padding: "0.25rem 1rem",
              }}
            >
              <MenuItem value={"fullName"}>
                <span>{"fullName"}</span>
              </MenuItem>
              <MenuItem
              //  onClick={() => dispatch(setLogout())}
              >
                Log Out
              </MenuItem>
            </Select>
          </div>
        ) : (
          <button
            className="fixed right-2"
            onClick={() => setIsMobileMenuToggled(!IsMobileMenuToggled)}
          >
            {IsMobileMenuToggled ? (
              <MdOutlineMenuOpen
                style={{
                  color: mode === "dark" ? "white" : "black",
                }}
                size={30}
              />
            ) : (
              <IoCloseSharp
                style={{
                  color: mode === "dark" ? "white" : "black",
                }}
                size={25}
              />
            )}
          </button>
        )}
      </div>
      {/* {!isNonMobileScreens && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          // style={{ backgroundColor: alt }}
          className={`transitioning ${
            IsMobileMenuToggled ? "-right-96 " : " right-0"
          } w-fit top-10 z-50 flex items-end rounded-bl-md pb-2 pr-2 pl-2 gap-2  flex-col fixed`}
        >
          <button onClick={() => dispatch(setmode())}>
            {mode === "dark" ? (
              <BsFillCloudSunFill className="text-yellow-500" size={25} />
            ) : (
              <MdDarkMode
                className="text-black bg-clip-text transparent gradcol"
                size={25}
              />
            )}
          </button>
          <BiMessageDetail
            className={`${mode === "dark" ? "text-white" : "text-black"}`}
            size={25}
          />
          <IoMdNotifications
            className={`${mode === "dark" ? "text-white" : "text-black"}`}
            size={25}
          />
          <IoMdHelpCircle
            className={`${mode === "dark" ? "text-white" : "text-black"}`}
            size={25}
          />
          <Select
            value={"fullName"}
            style={{
              // backgroundColor: neutralLight,
              width: "150px",
              color: mode === "dark" ? "white" : "black",
              borderRadius: "0.25rem",
              padding: "0.25rem 1rem",
            }}
          >
            <MenuItem value={"fullName"}>
              <span>{"fullName"}</span>
            </MenuItem>
            <MenuItem
            // onClick={() => dispatch(setLogout())}
            >
              Log Out
            </MenuItem>
          </Select>
        </div>
      )} */}
    </>
  );
};

export default NavSec;
