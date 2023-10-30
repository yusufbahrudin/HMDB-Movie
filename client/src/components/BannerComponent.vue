<template>
  <!-- breadcrumb area start -->
  <section class="breadcrumb-area">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="breadcrumb-area-content">
            <h1 style="cursor: pointer">Iron Movie 61</h1>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useMovieStore } from "../stores/movie"
import { mapWritableState } from "pinia"

import axios from "axios"

export default {
  computed: {
    ...mapWritableState(useMovieStore, ["banner", "movieid", "gallery"]),
  },

  watch: {
    ["banner"](after, before) {
      const banner = document.querySelector(".breadcrumb-area")
      banner.style.background = `url(${after})`
      banner.style.backgroundRepeat = "no-repeat"
      banner.style.backgroundPosition = "center"
      banner.style.backgroundSize = "cover"
      banner.style.padding = "280px 0 200px"
    },

    ["movieid"](after, before) {
      this.getImage(after)
    },
  },

  methods: {
    async getImage(movieId) {
      try {
        const { data } = await axios.get("https://api.cyborg1201.online/movies/images/" + movieId)

        this.gallery.backdrops = data.backdrops
        this.gallery.logos = data.logos
        this.gallery.posters = data.posters
        this.gallery.preview_backdrops = []
        this.gallery.preview_posters = []

        if (this.gallery.backdrops[0]) {
          this.banner = "https://image.tmdb.org/t/p/original/" + this.gallery.backdrops[0].file_path
        }

        const random = Math.floor(Math.random() * data.backdrops.length)
        if (this.gallery.backdrops[random]) {
          this.banner = "https://image.tmdb.org/t/p/original" + this.gallery.backdrops[random].file_path
        }

        while (this.gallery.preview_posters.length !== 5) {
          const random = Math.floor(Math.random() * this.gallery.posters.length)
          this.gallery.preview_posters.push("https://image.tmdb.org/t/p/original" + this.gallery.posters[random].file_path)
        }

        while (this.gallery.preview_backdrops.length !== 4) {
          const random = Math.floor(Math.random() * this.gallery.backdrops.length)
          this.gallery.preview_backdrops.push("https://image.tmdb.org/t/p/original" + this.gallery.backdrops[random].file_path)
        }
      } catch (err) {
        console.log(err)
        Toastify({
          text: err.response.data,
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function () {}, // Callback after click
        }).showToast()
      }
    },
  },

 
}
</script>

<style></style>
