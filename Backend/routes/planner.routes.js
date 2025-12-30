import express from "express"
import { explorePlanner } from "../controllers/planner.controllers.js"

const router = express.Router()

router.post("/explore", explorePlanner)

export default router
