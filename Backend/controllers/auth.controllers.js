import jwt from "jsonwebtoken"
import User from "../models/User.model.js"
import { verifyGoogleToken } from "../services/google.service.js"

const createToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  })

const sendAuthCookie = (res, token) => {
  res.cookie(process.env.COOKIE_NAME, token, {
    httpOnly: true,
    secure: false, // set true in production
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
}

export const register = async (req, res) => {
  const { name, email, password } = req.body

  const exists = await User.findOne({ email })
  if (exists) return res.status(400).json({ message: "User exists" })

  const user = await User.create({ name, email, password })
  const token = createToken(user._id)

  sendAuthCookie(res, token)
  res.json({ user })
}

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user || !user.password)
    return res.status(401).json({ message: "Invalid credentials" })

  const match = await user.comparePassword(password)
  if (!match)
    return res.status(401).json({ message: "Invalid credentials" })

  const token = createToken(user._id)
  sendAuthCookie(res, token)

  res.json({ user })
}

export const googleLogin = async (req, res) => {
  const { token } = req.body
  const decoded = await verifyGoogleToken(token)

  let user = await User.findOne({ email: decoded.email })

  if (!user) {
    user = await User.create({
      name: decoded.name,
      email: decoded.email,
    })
  }

  const jwtToken = createToken(user._id)
  sendAuthCookie(res, jwtToken)

  res.json({ user })
}

export const logout = async (_, res) => {
  res.clearCookie(process.env.COOKIE_NAME)
  res.json({ message: "Logged out" })
}
