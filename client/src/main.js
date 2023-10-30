import { createApp, markRaw } from "vue"
import { createPinia } from "pinia"
import { useRoute, useRouter } from "vue-router"

import vue3GoogleLogin from "vue3-google-login"

import App from "./App.vue"
import router from "./router"

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.$router = markRaw(router)
})

app.use(pinia)
app.use(router)

app.use(vue3GoogleLogin, {
  clientId: "4384493045-0ta09m4r8kjvurmcifqfle1b018k574p.apps.googleusercontent.com",
})

app.mount("#app")
