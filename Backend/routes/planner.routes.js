import express from "express"
import { protect } from "../middlewares/auth.middleware.js"
import { generatePlan } from "../controllers/planner.controllers.js"

const router = express.Router()

router.post("/", protect, generatePlan)

export default router
