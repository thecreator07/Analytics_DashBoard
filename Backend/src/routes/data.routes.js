import { Router } from "express"
import { searchData, getAllTempData, getDashboardData } from "../Controller/analytic.controller.js"

const router = Router()
router.route("/get_temp_data").post(getAllTempData)
router.route("/get_dashboard_data").post(getDashboardData)
router.route("/get_all_insight_data").post(searchData)


export default router