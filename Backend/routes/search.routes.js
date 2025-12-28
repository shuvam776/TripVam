import express from "express"
import { search } from "../controllers/search.controllers.js"
import { protect } from "../middlewares/auth.middleware.js"

const router = express.Router()
router.post("/", protect, search)

export default router
