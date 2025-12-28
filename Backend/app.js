import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.routes.js"

const app = express()
console.log(process.env.CORS_ORIGIN)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ,
    credentials: true,
  })
)

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
import plannerRoutes from "./routes/planner.routes.js"

app.use("/api/planner", plannerRoutes)

app.get("/api/health", (_, res) => {
  res.json({ status: "ok" })
})

export default app
