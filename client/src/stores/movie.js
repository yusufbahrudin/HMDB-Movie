import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { useRoute } from "vue-router"

import axios from "axios"

export const useMovieStore = defineStore("movie", {
  state: () => ({
    page: 1,
    search: "",
    movieid: 53861,
    movie: {},
    movies: [],
    $route: useRoute(),
    pageStatus: "login",
    gallery: {
      backdrops: [],
      posters: [],
      logos: [],
      preview_posters: [],
      preview_backdrops: [],
    },
    imdb_id: "",
    trailer: "",
    loading: false,
    bookmark: [],

    banner: "https://image.tmdb.org/t/p/original/enjSvyTyOL4nA5qF1giVs7Q9FqF.jpg",
  }),

  actions: {
    async login(form) {
      try {
        const { data } = await axios.post("https://api.cyborg1201.online/auth/login", form)

        this.pageStatus = "home"
        localStorage.token = data.token
        localStorage.email = data.email
        localStorage.name = data.name
        Toastify({
          text: "Hello " + data.name + " !",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "blue",
          },
          onClick: function () {}, // Callback after click
        }).showToast()
      } catch (err) {
        console.log(err.response.data)
        Toastify({
          text: err.response.data.message,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "red",
          },
          onClick: function () {},
        }).showToast()
      }
    },

    async saveBookmark(obj) {
      try {
        const { id, title } = obj
        const { data } = await axios({
          url: "https://api.cyborg1201.online/bookmark/" + id,
          method: "POST",
          headers: { access_token: localStorage.token },
          data: { title },
        })
        Toastify({
          text: `Movie ${title} saved`,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "green",
          },
          onClick: function () {},
        }).showToast()
        this.getBookmark()
      } catch (err) {
        console.log(err)
        Toastify({
          text: err.response.data.message,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "red",
          },
          onClick: function () {}, // Callback after click
        }).showToast()
      }
    },

    async getBookmark() {
      try {
        const { data } = await axios({
          url: "https://api.cyborg1201.online/bookmark/",
          method: "GET",
          headers: { access_token: localStorage.token },
        })
        this.bookmark = data
      } catch (err) {
        console.log(err)
        Toastify({
          text: err.response.data.message,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "red",
          },
          onClick: function () {}, // Callback after click
        }).showToast()
      }
    },

    async deleteBookmark(obj) {
      try {
        const { id, title } = obj
        const { data } = await axios({
          url: "https://api.cyborg1201.online/bookmark/" + id,
          method: "DELETE",
          headers: { access_token: localStorage.token },
        })
        Toastify({
          text: `Movie ${title} deleted`,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "green",
          },
          onClick: function () {}, // Callback after click
        }).showToast()
        this.getBookmark()
      } catch (err) {
        console.log(err.response)
        Toastify({
          text: err.response.data.message,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "red",
          },
          onClick: function () {}, // Callback after click
        }).showToast()
      }
    },

    async getMovies() {
      try {
        let url = "https://api.cyborg1201.online/movies"

        if (this.$route.query.search) {
          this.page = 1
          this.movies = []
        }

        let params = {
          query: this.$route.query.search,
          page: this.page,
        }

        let { data } = await axios.get(url, { params })

        this.movies = [...this.movies, ...data.results]
        this.loading = false
        this.page++
      } catch (err) {
        this.loading = false
        console.log(err.response)
        Toastify({
          text: err.response.data.message,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "red",
          },
          onClick: function () {}, // Callback after click
        }).showToast()
      }
    },

    async getMovieDetail() {
      try {
        let url = "https://api.cyborg1201.online/movies/" + this.movieid

        const { data } = await axios.get(url)
        this.movieid = data.id
        this.movie = data
        this.imdb_id = data.imdb_id
      } catch (err) {
        console.log(err)
        Toastify({
          text: err.response.data.message,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "red",
          },
          onClick: function () {}, // Callback after click
        }).showToast()
      }
    },

    async getMovieTrailer() {
      try {
        let url = "https://api.cyborg1201.online/movies/trailer/" + this.imdb_id

        const { data } = await axios.get(url)
        this.trailer = data.youtube
      } catch (err) {
        console.log(err)
        Toastify({
          text: err.response.data.message,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "red",
          },
          onClick: function () {}, // Callback after click
        }).showToast()
      }
    },
  },
})
