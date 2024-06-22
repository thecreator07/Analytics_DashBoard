import { useLocation, useNavigate, Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
// import Sidebar from "../components/sidebar/Sidebar";
// import Navbar from "../components/Navbar/Navbar";

// import { fetchUserData } from "../api/userAPI"
// import { UserContext } from "../context/userContext";
// import Topics from "./Topics";
// import Settings from "./Settings";
// import AllInsights from "./AllInsights";
import { useSelector } from "react-redux";
import NavSec from "../components/Navbar/NavSec";
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
    if (location.pathname === "/home") {
      navigate("/home/main");
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
        {/* <NavSec user={"userData"} /> */}
        <Routes>
          <Route exact path="/main" element={<DashBoard />} />
          {/* <Route exact path="/analysis" element={<Analysis />} /> */}
          <Route exact path="/explore" element={<Search />} />
          <Route exact path="/settings" element={<Setting />} />
        </Routes>
      </div>
    </div>
  );
};

export default HomePage;
