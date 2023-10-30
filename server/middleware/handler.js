const handleError = (err, req, res, next) => {
  console.log(err, "📌 Ini dari handle errror middleware !")
  if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
    res.status(400).json({ message: err.errors[0].message })
  } else if (err.name === "Unauthorized") {
    res.status(401).json({ message: err.message })
  } else if (err.name === "JsonWebTokenError") {
    res.status(401).json({ message: "Invalid token" })
  } else if (err.name === "Forbidden") {
    res.status(403).json({ message: err.message })
  } else if (err.name === "Duplicate") {
    res.status(400).json({ message: err.message })
  } else if (err.name === "Not Found") {
    res.status(400).json({ message: err.message })
  } else {
    res.status(500).json({ message: "Internal Server Error" })
  }
}

module.exports = { handleError }
