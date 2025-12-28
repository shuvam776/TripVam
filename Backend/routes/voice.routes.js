import express from "express"
import { voice } from "../controllers/voice.controllers.js"
import { protect } from "../middlewares/auth.middleware.js"

const router = express.Router()
router.post("/", protect, voice)

export default router
