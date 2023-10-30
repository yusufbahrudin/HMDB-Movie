<template>
  <div>
    <!-- <div id="preloader"></div> -->

    <header class="header">
      <div class="container">
        <div class="header-area">
          <div class="logo">
            <router-link to="/"><img src="/assets/img/logo.png" alt="logo" /></router-link>
          </div>
          <div class="header-right">
            <form @submit.prevent="searchData">
              <select>
                <option value="home">Home</option>
              </select>
              <input v-model="form.search" type="text" placeholder="Search movie ..." />
              <button type="submit"><i class="icofont icofont-search"></i></button>
            </form>
            <ul>
              <li>
                <a v-if="pageStatus === 'home'">Welcome, {{ username }}!</a>
              </li>
              <li><a @click.prevent="logout" v-if="pageStatus === 'home'">Logout</a></li>
              <li><a class="login-popup" href="#" v-if="pageStatus === 'login'">Login</a></li>
            </ul>
          </div>
          <div class="menu-area">
            <div class="responsive-menu"></div>
            <div class="mainmenu">
              <ul id="primary-menu">
                <li v-if="pageStatus === 'home'">
                  <a class="theme-btn" href="#"><i class="icofont icofont-ticket"></i> Bookmark</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
    <MiniLoginComponent />
  </div>
</template>

<script>
import { mapActions, mapWritableState } from "pinia"
import { useMovieStore } from "../stores/movie"

import MiniLoginComponent from "../components/MiniLoginComponent.vue"

export default {
  name: "NavbarComponent",
  components: {
    MiniLoginComponent,
  },

  data() {
    return {
      form: {
        search: "",
      },

      username: "",
    }
  },

  computed: {
    ...mapWritableState(useMovieStore, ["movies", "search", "pageStatus"]),
  },

  methods: {
    ...mapActions(useMovieStore, ["getMovies"]),

    searchData() {
      this.$router.push("/movies?search=" + this.form.search)
    },

    logout() {
      localStorage.clear()
      this.pageStatus = "login"
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
    },
  },

  watch: {
    ["$route.query.search"](after, before) {
      this.search = this.form.search
      this.page = 1
      this.getMovies()
    },

    ["pageStatus"](after, before) {
      this.username = localStorage.name
    },
  },

  created() {
    this.username = localStorage.name
    if (!localStorage.token) {
      this.pageStatus = "login"
    } else {
      this.pageStatus = "home"
    }
  },

  updated() {
    ;(function ($) {
      "use strict"
      $(".mainmenu ul#primary-menu").slicknav({
        allowParentLinks: true,
        prependTo: ".responsive-menu",
      })

      $(window).on("scroll", function () {
        if ($(this).scrollTop() > 600) {
          $(".scrollToTop").fadeIn()
        } else {
          $(".scrollToTop").fadeOut()
        }
      })
      $(".scrollToTop").on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 2000)
        return false
      })
      $(".menu-area ul > li > .theme-btn").on("click", function () {
        $(".buy-ticket").show()
        return false
      })
      $(".buy-ticket .buy-ticket-area > a").on("click", function () {
        $(".buy-ticket").hide()
        return false
      })

      $(".login-popup").on("click", function () {
        $(".login-area").show()
        return false
      })
      $(".login-box > a").on("click", function () {
        $(".login-area").hide()
        return false
      })
      jQuery(window).load(function () {
        jQuery("#preloader").fadeOut(500)
      })
    })(jQuery)
  },

  mounted() {
    ;(function ($) {
      "use strict"
      $(".mainmenu ul#primary-menu").slicknav({
        allowParentLinks: true,
        prependTo: ".responsive-menu",
      })

      $(window).on("scroll", function () {
        if ($(this).scrollTop() > 600) {
          $(".scrollToTop").fadeIn()
        } else {
          $(".scrollToTop").fadeOut()
        }
      })
      $(".scrollToTop").on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 2000)
        return false
      })
      $(".menu-area ul > li > .theme-btn").on("click", function () {
        $(".buy-ticket").show()
        return false
      })
      $(".buy-ticket .buy-ticket-area > a").on("click", function () {
        $(".buy-ticket").hide()
        return false
      })

      $(".login-popup").on("click", function () {
        $(".login-area").show()
        return false
      })
      $(".login-box > a").on("click", function () {
        $(".login-area").hide()
        return false
      })

      var heroSlider = $(".hero-area-slider")
      heroSlider.owlCarousel({
        loop: true,
        dots: true,
        autoplay: false,
        autoplayTimeout: 4000,
        nav: false,
        items: 1,
        responsive: {
          992: {
            dots: false,
          },
        },
      })
      heroSlider.on("changed.owl.carousel", function (property) {
        var current = property.item.index
        var prevRating = $(property.target).find(".owl-item").eq(current).prev().find(".hero-area-slide").html()
        var nextRating = $(property.target).find(".owl-item").eq(current).next().find(".hero-area-slide").html()
        $(".thumb-prev .hero-area-slide").html(prevRating)
        $(".thumb-next .hero-area-slide").html(nextRating)
      })
      $(".thumb-next").on("click", function () {
        heroSlider.trigger("next.owl.carousel", [300])
        return false
      })
      $(".thumb-prev").on("click", function () {
        heroSlider.trigger("prev.owl.carousel", [300])
        return false
      })
      var newsSlider = $(".news-slider")
      newsSlider.owlCarousel({
        loop: true,
        dots: true,
        autoplay: false,
        autoplayTimeout: 4000,
        nav: false,
        items: 1,
        responsive: {
          992: {
            dots: false,
          },
        },
      })
      newsSlider.on("changed.owl.carousel", function (property) {
        var current = property.item.index
        var prevRating = $(property.target).find(".owl-item").eq(current).prev().find(".single-news").html()
        var nextRating = $(property.target).find(".owl-item").eq(current).next().find(".single-news").html()
        $(".news-prev .single-news").html(prevRating)
        $(".news-next .single-news").html(nextRating)
      })
      $(".news-next").on("click", function () {
        newsSlider.trigger("next.owl.carousel", [300])
        return false
      })
      $(".news-prev").on("click", function () {
        newsSlider.trigger("prev.owl.carousel", [300])
        return false
      })
      var videoSlider = $(".video-slider")
      videoSlider.owlCarousel({
        loop: true,
        dots: true,
        autoplay: false,
        autoplayTimeout: 4000,
        nav: false,
        responsive: {
          0: {
            items: 1,
            margin: 0,
          },
          576: {
            items: 2,
            margin: 30,
          },
          768: {
            items: 3,
            margin: 30,
          },
          992: {
            items: 4,
            margin: 30,
          },
        },
      })

      $(".popup-youtube").magnificPopup({ type: "iframe" })
      $.extend(true, $.magnificPopup.defaults, {
        iframe: {
          patterns: {
            youtube: {
              index: "youtube.com/",
              id: "v=",
              src: "https://www.youtube.com/embed/%id%?autoplay=1",
            },
          },
        },
      })

      // jQuery(".portfolio-item").isotope()
      // $(".portfolio-menu li").on("click", function () {
      //   $(".portfolio-menu li").removeClass("active")
      //   $(this).addClass("active")
      //   var selector = $(this).attr("data-filter")
      //   $(".portfolio-item").isotope({
      //     filter: selector,
      //   })
      // })

      jQuery(window).load(function () {
        jQuery("#preloader").fadeOut(500)
      })
    })(jQuery)
  },
}
</script>

<style></style>
