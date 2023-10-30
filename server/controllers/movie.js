const axios = require("axios")
const youtube = require("@citoyasha/yt-search")

const { Bookmark } = require("../models")

class Movie {
  static async getMovies(req, res, next) {
    try {
      const { page = 1, query = "" } = req.query

      let url = "https://api.themoviedb.org/3/discover/movie"
      let params = { api_key: process.env.TMDB_TOKEN, page, query }

      if (query) url = "https://api.themoviedb.org/3/search/movie"

      const { data } = await axios.get(url, { params })

      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async getMovieDetail(req, res, next) {
    try {
      const { id } = req.params
      let url = "https://api.themoviedb.org/3/movie/" + id
      let params = { api_key: process.env.TMDB_TOKEN }

      const { data } = await axios.get(url, { params })

      const qr = await axios({
        url: "https://api.qr-code-generator.com/v1/create?access-token=" + process.env.QR_TOKEN,
        method: "GET",
        params: {
          frame_name: "no-frame",
          qr_code_text: `https://hmdb61.web.app/movies/${id}`,
          image_format: "SVG",
        },
      })

      res.status(200).json({ ...data, qr: qr.data })
    } catch (err) {
      next(err)
    }
  }

  static async getMovieTrailer(req, res, next) {
    try {
      const { imdb_id } = req.params

      let query = imdb_id + " trailer"
      const result = await youtube.search(query, 10)

      res.status(200).json({ youtube: result[0].link })
    } catch (err) {
      next(err)
    }
  }

  static async getMovieImage(req, res, next) {
    try {
      const { id } = req.params
      let url = `https://api.themoviedb.org/3/movie/${id}/images`
      let params = { api_key: process.env.TMDB_TOKEN }

      const { data } = await axios.get(url, { params })

      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async bookmarkMovie(req, res, next) {
    try {
      const { id } = req.params
      const { title } = req.body
      console.log("📌 title: ", title, id)
      const find = await Bookmark.findOne({ where: { MovieId: id, UserId: req.user.id } })
      if (find) throw { name: "Duplicate", message: "Movie already saved" }
      const save = await Bookmark.create({ UserId: req.user.id, MovieId: id, title })
      res.status(200).json(save)
    } catch (err) {
      next(err)
    }
  }

  static async getBookmark(req, res, next) {
    try {
      const bookmark = await Bookmark.findAll({ where: { UserId: req.user.id } })
      res.status(200).json(bookmark)
    } catch (err) {
      next(err)
    }
  }

  static async deleteBookmark(req, res, next) {
    try {
      const { id } = req.params
      const bookmark = await Bookmark.destroy({ where: { id } })
      res.status(200).json({ message: `Data ${id} deleted` })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = { Movie }
