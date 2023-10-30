import { createRouter, createWebHistory } from "vue-router"
import HomeComponent from "../views/HomeComponent.vue"
import DetailMovieComponent from "../views/DetailMovieComponent.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeComponent,
    },
    {
      path: "/movies",
      name: "Movie",
      component: HomeComponent,
    },
    {
      path: "/movies/:id",
      name: "MovieDetail",
      component: DetailMovieComponent,
    },
  ],
})

export default router
