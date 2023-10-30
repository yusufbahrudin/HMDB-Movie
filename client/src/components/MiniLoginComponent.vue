<template>
  <div>
    <div class="login-area" v-if="pageStatus === 'login'">
      <div class="login-box">
        <a href="#"><i class="icofont icofont-close"></i></a>
        <h2>LOGIN</h2>
        <form @submit.prevent="login(form)">
          <h6>EMAIL ADDRESS</h6>
          <input v-model="form.email" type="text" style="color: black" />
          <h6>PASSWORD</h6>
          <input v-model="form.password" type="password" style="color: black" />

          <button href="#" type="submit" class="theme-btn" style="">LOG IN</button>
          <br /><br />
          <GoogleLogin :callback="callback" />
        </form>
      </div>
    </div>

    <div class="buy-ticket">
      <div class="container">
        <div class="buy-ticket-area">
          <a href="#"><i class="icofont icofont-close"></i></a>
          <h1 style="color: black; margin-bottom: 30px">Bookmark list:</h1>
          <div class="row">
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">MovieId</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(x, index) in bookmark" :key="x.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ x.title }}</td>
                  <td>{{ x.MovieId }}</td>
                  <td>
                    <button @click="detail(x.MovieId)" class="btn-sm btn-info" style="margin-right: 10px">Detail</button>
                    <button @click="deleteBookmark({ id: x.id, title: x.title })" class="btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMovieStore } from "../stores/movie"
import { mapActions, mapWritableState } from "pinia"

import axios from "axios"

export default {
  name: "MiniLoginComponent",

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    }
  },

  methods: {
    ...mapActions(useMovieStore, ["login", "getBookmark", "getMovieDetail", "deleteBookmark"]),

    detail(MovieId) {
      this.movieid = MovieId
      this.$router.push("/movies/" + MovieId)
    },

    async callback(response) {
      console.log(response)
      try {
        const { data } = await axios({
          url: "https://api.cyborg1201.online/auth/google",
          method: "POST",
          headers: { google_token: response.credential },
        })
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
        Toastify({ text: "Login failed", duration: 2000, style: { background: "red" } }).showToast()
      }
    },
  },

  computed: {
    ...mapWritableState(useMovieStore, ["pageStatus", "bookmark", "movieid"]),
  },

  watch: {
    ["movieid"](after, before) {
      this.getMovieDetail()
    },

    ["pageStatus"]() {
      if (this.pageStatus === "home") {
        this.getBookmark()
      }
    },
  },

  created() {
    if (this.pageStatus === "home") {
      this.getBookmark()
    }
  },
}
</script>

<style></style>
