import { useLocation, useNavigate, Route, Routes } from "react-router-dom"
import { useContext, useEffect } from "react"
import Sidebar from "../components/sidebar/Sidebar"
import Navbar from "../components/Navbar/Navbar"
// import { fetchUserData } from "../api/userAPI"
import { UserContext } from "../context/userContext"
import Topics from "./Topics"
import Settings from "./Settings"
import AllInsights from "./AllInsights"
import { useSelector } from "react-redux"

const Routing = () => {
const state=useSelector(state)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/main")
    }
  }, [location.pathname, navigate])


  // useEffect(() => { 
  //   // console.log(state.isAuth)
  //   console.log(state.user)
  //   if (state.isAuth === false) {
  //     navigate("/")
  //   }
  // },[navigate, state])

  return (
    <div className="w-full h-screen flex">
      <Sidebar user={"userData"} />
      <div className={`w-full md:w-10/12 h-full ${state.theme === "light" ? "bg-slate-100" : "bg-slate-700"} overflow-hidden`}>
        <Navbar user={"userData"} />
        <Routes>
          <Route exact path="/main" element={<Dashboard user={"userData"} />} />
          <Route exact path="/topics" element={<Topics />} />
          <Route exact path="/all-insights" element={<AllInsights />} />
          <Route exact path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  )
}

export default Routing
