const bcrypt = require("bcrypt")

const salt = bcrypt.genSaltSync(10)

const hashData = (data) => {
  return bcrypt.hashSync(data, salt)
}

const compareHash = (a, b) => {
  return bcrypt.compareSync(a, b)
}

module.exports = { hashData, compareHash }
