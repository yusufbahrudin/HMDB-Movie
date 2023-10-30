const { Auth, Movie } = require("../controllers/index")
const { authentication, authorization } = require("../middleware")

const express = require("express")
const router = express.Router()

router.post("/auth/register", Auth.register)
router.post("/auth/login", Auth.login)
router.post("/auth/google", Auth.googleLogin)

router.get("/movies", Movie.getMovies)
router.get("/movies/images/:id", Movie.getMovieImage)
router.get("/movies/trailer/:imdb_id", Movie.getMovieTrailer)
router.get("/movies/:id", Movie.getMovieDetail)

router.use(authentication)
router.get("/bookmark", Movie.getBookmark)
router.post("/bookmark/:id", Movie.bookmarkMovie)
router.delete("/bookmark/:id", authorization, Movie.deleteBookmark)

module.exports = { router }
