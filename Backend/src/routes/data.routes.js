import { Router } from "express"
import { getSearchData, getAllTempData, getDashboardData } from "../Controller/analytic.controller.js"

const router = Router()
router.route("/getAllData").post(getAllTempData)
router.route("/getVisualData").post(getDashboardData)
router.route("/search").post(getSearchData)


export default router