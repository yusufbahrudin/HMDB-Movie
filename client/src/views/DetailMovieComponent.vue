<template>
  <div>
    <NavbarComponent />
    <BannerComponent />
    <section class="transformers-area">
      <div class="container">
        <div class="transformers-box">
          <div class="row flexbox-center">
            <div class="col-lg-5 text-lg-left text-center">
              <div class="single-portfolio-img">
                <img :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" alt="portfolio" />
                <a :href="trailer" class="popup-youtube">
                  <i class="icofont icofont-ui-play"></i>
                </a>
              </div>
            </div>
            <div class="col-lg-7">
              <div class="transformers-content">
                <h1>{{ movie.original_title }}</h1>
                <p>
                  <span v-for="(genre, index) in movie.genres" :key="genre">
                    {{ index === 0 && movie.genres.length == 1 ? genre.name : index === movie.genres.length - 1 ? genre.name : genre.name + " | " }}
                  </span>
                </p>
                <ul>
                  <li>
                    <div class="transformers-left">Status:</div>
                    <div class="transformers-right">
                      <a href="#">{{ movie.status }}</a>
                    </div>
                  </li>
                  <li>
                    <div class="transformers-left">Production:</div>
                    <div v-for="companies in movie.production_companies" :key="companies.id" class="transformers-right">{{ companies.name }}</div>
                  </li>
                  <li>
                    <div class="transformers-left">Released:</div>
                    <div class="transformers-right">{{ movie.release_date }}</div>
                  </li>
                  <li>
                    <div class="transformers-left">Cinema:</div>
                    <div class="transformers-right" style="text-align: justify">
                      {{ movie.overview }}
                    </div>
                  </li>
                  <li>
                    <div class="transformers-left">IMDB ID:</div>
                    <div class="transformers-right">{{ movie.imdb_id }}</div>
                  </li>
                  <li>
                    <div class="transformers-left">Vote:</div>
                    <div class="transformers-right">{{ movie.vote_average }}</div>
                  </li>
                  <li>
                    <div class="transformers-left">Language:</div>
                    <div class="transformers-right">
                      <span v-for="language in movie.spoken_languages" :key="language">{{ language.name }} . </span>
                    </div>
                  </li>

                  <li>
                    <div class="transformers-left">Budget:</div>
                    <div class="transformers-right">{{ movie.budget }}</div>
                  </li>

                  <li v-if="pageStatus === 'home'">
                    <div class="transformers-left">Bookmark:</div>
                    <div class="transformers-right"><button style="height: 36px; width: 70px; background: white; border: 0px; border-radius: 20px; font-weight: bold" @click="saveBookmark({ id: movie.id, title: movie.original_title })">Save</button></div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            v-html="movie.qr"
            class="theme-btn"
            style="background: transparent; border-radius: 10px; margin-bottom: 15px; width: 200px; height: 200px padding: 0px"
          />
        </div>
      </div>
    </section>
    <section class="details-area">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 text-center text-lg-left">
            <div class="portfolio-sidebar">
              <img v-for="img in gallery.preview_posters" :key="img" :src="img" alt="" data-aos="zoom-in" />
            </div>
          </div>
          <div class="col-lg-9 text-center text-lg-left">
            <div class="portfolio-sidebar">
              <img v-for="img in gallery.preview_backdrops" :key="img" :src="img" alt="" data-aos="flip-left" />
            </div>
          </div>
        </div>
        <br /><br /><br />
        <div id="disqus_thread"></div>
      </div>
      <br /><br />
    </section>
  </div>
</template>

<script>
import { useMovieStore } from "../stores/movie"
import { mapActions, mapWritableState } from "pinia"

import NavbarComponent from "../components/NavbarComponent.vue"
import BannerComponent from "../components/BannerComponent.vue"

export default {
  name: "DetailComponent",
  components: {
    NavbarComponent,
    BannerComponent,
  },

  data() {
    return {}
  },

  computed: {
    ...mapWritableState(useMovieStore, ["movieid", "movie", "gallery", "imdb_id", "trailer", "pageStatus"]),
  },

  methods: {
    ...mapActions(useMovieStore, ["getMovieDetail", "getMovieTrailer", "saveBookmark"]),
  },

  created() {
    this.movieid = this.$route.params.id
    this.getMovieDetail()
  },

 

  mounted() {
    const disqus_config = function () {
      this.page.url = this.$route.fullPath
      this.page.identifier = this.$route.params.id
    }
    ;(function () {
      const d = document,
        s = d.createElement("script")
      s.src = "https://movie-nolk2bgsno.disqus.com/embed.js"
      s.setAttribute("data-timestamp", +new Date())
      ;(d.head || d.body).appendChild(s)
    })()
  },

  watch: {
    ["imdb_id"](after, before) {
      this.getMovieTrailer()
    },
  },
}
</script>

<style></style>
