const { handleError } = require("./handler")
const { verifyToken } = require("../helpers/index")
const { User, Bookmark } = require("../models")

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers

    if (!access_token) throw { name: "Unauthorized", message: "Invalid Token" }

    const token = verifyToken(access_token)
    const user = await User.findByPk(token.id)

    if (!user) throw { name: "Unauthorized", message: "Invalid token" }

    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}

const authorization = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findByPk(req.params.id)

    if (!bookmark) {
      throw { name: "Not Found", message: "Data not found" }
    }

    if (bookmark.UserId === req.user.id) {
      next()
    } else {
      throw { name: "Forbidden", message: "Access Forbidden" }
    }
  } catch (err) {
    next(err)
  }
}

module.exports = { handleError, authentication, authorization }
