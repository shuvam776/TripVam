import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import searchRoutes from "./routes/search.routes.js"
import authRoutes from "./routes/auth.routes.js"
import voiceRoutes from "./routes/voice.routes.js"
import plannerRoutes from "./routes/planner.routes.js"
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
app.use("/api/voice",voiceRoutes)
app.use("/api/auth", authRoutes)

app.use("/api/planner", plannerRoutes)

app.use("/api/search", searchRoutes)

app.get("/api/health", (_, res) => {
  res.json({ status: "ok" })
})

export default app
