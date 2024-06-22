import { useLocation, useNavigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import Sidebar from "../components/SideBar/Sidebar";
import Setting from "./Setting";
import DashBoard from "./DashBoard";
import Search from "./Search";
// import Analysis from "./AllData";
// import Explore from "./Search";
// Driver.js
const HomePage = () => {
  const mode = useSelector((state) => state.mode);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(mode);
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/main");
    }
  }, [location.pathname, navigate]);

  return (
    <div className="w-full h-screen flex">
      <Sidebar user={"user"} />
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
