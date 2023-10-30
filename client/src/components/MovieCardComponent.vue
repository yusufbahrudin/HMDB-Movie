<template>
  <div class="col-lg-3 col-md-4 col-sm-6 soon released">
    <router-link :to="'/movies/' + data.id">
      <div class="single-portfolio">
      <div class="single-portfolio-img">
        <img :src="'https://image.tmdb.org/t/p/original' + data.poster_path" alt="portfolio" />
        <!-- <a href="https://www.youtube.com/watch?v=qslT-yj9Oy8" class="popup-youtube">
          <i class="icofont icofont-ui-play"></i>
        </a> -->
      </div>
      <div class="portfolio-content">
        <h2>{{ data.title }}</h2>
        <div class="review">
          <div class="author-review">
            <i class="icofont icofont-star" v-for="star in stars" :key="star"></i>
          </div>
          <h4>{{ data.vote_average }}</h4>
        </div>
      </div>
    </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "MovieCardComponent",

  data() {
    return { stars: "" }
  },

  props: ["data"],

  created() {
    if (this.data.vote_average >= 0 && this.data.vote_average <= 2) {
      this.stars = 1
    } else if (this.data.vote_average >= 3 && this.data.vote_average <= 5) {
      this.stars = 2
    } else if (this.data.vote_average >= 5 && this.data.vote_average <= 7) {
      this.stars = 3
    } else if (this.data.vote_average >= 7 && this.data.vote_average <=8.5) {
      this.stars = 4
    } else {
      this.stars = 5
    }
  },

 
}
</script>

<style></style>
