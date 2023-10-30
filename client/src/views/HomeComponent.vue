<template>
  <div>
    <NavbarComponent />
    <BannerComponent />
    <MovieListComponent />
  </div>
</template>

<script>
import NavbarComponent from "../components/NavbarComponent.vue"
import BannerComponent from "../components/BannerComponent.vue"
import MovieListComponent from "../views/MovieListComponent.vue"

import { mapWritableState } from "pinia"
import { useMovieStore } from "../stores/movie"

export default {
  name: "HomeComponent",
  components: {
    NavbarComponent,
    BannerComponent,
    MovieListComponent,
  },

  computed: {
    ...mapWritableState(useMovieStore, ["pageStatus"]),
  },

 
}
</script>

<style></style>
