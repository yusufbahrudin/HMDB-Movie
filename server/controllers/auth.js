const { User } = require("../models")
const { signToken, compareHash } = require("../helpers")
const { OAuth2Client } = require("google-auth-library")

class Auth {
  static async register(req, res, next) {
    try {
      const { email, password, name } = req.body
      const user = await User.create({ email, password, name })
      const token = signToken({ id: user.id, name: user.name, email: user.email })

      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email || !password) throw { name: "Unauthorized", message: "Invalid email or password !" }

      const user = await User.findOne({ where: { email } })

      if (!user || !compareHash(password, user.password)) throw { name: "Unauthorized", message: "Invalid email or password !" }

      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: signToken({ id: user.id, name: user.name, email: user.email }),
      })
    } catch (err) {
      next(err)
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers

      const client = new OAuth2Client()
      const ticket = await client.verifyIdToken({ idToken: google_token, audience: process.env.GOOGLE_CLIENT_ID })
      const payload = ticket.getPayload()

      let user = await User.findOne({ where: { email: payload.email } })

      if (!user) {
        user = await User.create({
          name: payload.name,
          email: payload.email,
          password: "google-login-" + Date.now(),
        })
      }

      const token = signToken({ id: user.id, email: user.email, name: user.name })

      res.status(200).json({ id: user.id, name: user.name, email: user.email, token })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = { Auth }
