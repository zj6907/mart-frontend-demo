import "./style.css"
import { createApp } from "vue"
import App from "./App.vue"
import router from "/src/router"
import store from "/src/store"
import * as filters from "./filters"

const app = createApp(App)
app.use(router).use(store).mount("#app")

app.config.globalProperties.$filters = filters
