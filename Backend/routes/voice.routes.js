import express from "express"
import { speakController } from "../controllers/voice.controllers.js"

const router = express.Router()

router.post("/", speakController)

export default router
