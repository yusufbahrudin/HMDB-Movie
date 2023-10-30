if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const { router } = require("./routes")
const { handleError } = require("./middleware")

const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)

app.use(handleError)
app.listen(port, () => console.log("# Server listening on port:", port))
