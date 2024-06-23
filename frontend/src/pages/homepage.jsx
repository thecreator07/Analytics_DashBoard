import { useLocation, useNavigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import Sidebar from "../components/SideBar/Sidebar";
import Setting from "./Setting";
import DashBoard from "./DashBoard";
import Search from "./Search";
import { MdOutlineMenu } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
// import Analysis from "./AllData";
// import Explore from "./Search";
// Driver.js
const HomePage = () => {
  const mode = useSelector((state) => state.mode);
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  console.log(mode);
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/main");
    }
  }, [location.pathname, navigate]);

  return (
    <div className="w-full mt-6 md:mt-0 h-screen flex">
      <Sidebar show={show} />
      <div className="w-full md:hidden flex fixed top-0 right-0 z-30 items-center gap-3 px-2">
        <span onClick={() => setShow(!show)}>
          {show ? (
            <MdOutlineMenu size={30} className="text-[#AA77FF]-500" />
          ) : (
            <RxCross2 size={30} className="text-[#AA77FF]-500" />
          )}
        </span>
      </div>
      <div
        className={`w-full md:w-10/12 h-full
         ${mode === "light" ? "bg-slate-100" : "bg-[#0F0F0F]"}
          overflow-hidden`}
      >
        <Routes>
          <Route exact path="/main" element={<DashBoard />} />
          <Route exact path="/explore" element={<Search />} />
          <Route exact path="/settings" element={<Setting />} />
        </Routes>
      </div>
    </div>
  );
};

export default HomePage;
