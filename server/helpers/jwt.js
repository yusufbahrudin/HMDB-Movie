const jwt = require("jsonwebtoken")

const signToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET)
}

const verifyToken = (data) => {
  return jwt.verify(data, process.env.JWT_SECRET)
}

module.exports = { signToken, verifyToken }
