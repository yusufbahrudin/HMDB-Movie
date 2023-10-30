<template>
  <section class="portfolio-area pt-60">
    <div class="container">
      <div class="row flexbox-center">
        <div class="col-lg-6 text-center text-lg-left">
          <div class="section-title">
            <h1><i class="icofont icofont-movie"></i> Spotlight This Month</h1>
          </div>
        </div>
        <div class="col-lg-6 text-center text-lg-right">
          <div class="portfolio-menu">
            <ul>
              <li data-filter="*" class="active">Latest</li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <div class="row portfolio-item">
        <MovieCardComponent v-for="movie in movies" :key="movie.id" :data="movie" data-aos="zoom-in-down"/>
      </div>
      <div v-if="movies.length == 0" class="row portfolio-item" style="display: flex; justify-content: center; margin-top: 70px">
        <h1>404</h1>
      </div>
    </div>
    <br><br><br>
  </section>
</template>

<script>
import MovieCardComponent from "../components/MovieCardComponent.vue"

import { mapActions, mapWritableState } from "pinia"
import { useMovieStore } from "../stores/movie"

export default {
  name: "MovieListComponent",

  data() {
    return {
      pagination: {
        total: 500,
        page_prev: [],
        page_next: [],
        randomBanner: 0,
      },
    }
  },

  components: {
    MovieCardComponent,
  },

  methods: {
    ...mapActions(useMovieStore, ["getMovies"]),

    async fetchPosts() {
      if (this.loading) return
      this.loading = true
      this.getMovies()
    },

    handleScroll() {
      const scrollY = window.scrollY
      const clientHeight = document.documentElement.clientHeight
      const contentHeight = document.documentElement.scrollHeight

      if (scrollY + clientHeight >= contentHeight - 300) {
        if (!this.$route.query.search) {
          this.fetchPosts()
        }
      }
    },
  },

  watch: {
    ["$route.query.page"](newPage, oldPage) {
      this.page = newPage
    },
  },

  computed: {
    ...mapWritableState(useMovieStore, ["movies", "page", "search", "loading"]),
  },

  created() {
    if (this.$route.query.page && this.$route.query.page < 500) {
      this.page = this.$route.query.page
    }
  },

  mounted() {
    this.fetchPosts()
    window.addEventListener("scroll", this.handleScroll)
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll)
  },
}
</script>

<style></style>
