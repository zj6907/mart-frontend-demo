<script setup>
import axios from "axios"
// import { Toast } from "./SweetAlert.js"
import store from "/src/store"
import router from "/src/router"

const _axiosClient = axios.create({
  baseURL: import.meta.env.APP_BASE_URL,
  timeout: 2000,
  headers: { "X-Custom-Header": "foobar" },
})

function inst() {
  return _axiosClient
}

// const HTTP = (url, o = {}) => {
//   _axiosClient[o.method](url, o).finally(() => console.log("--- finally"))
// }
const HTTP = (o = {}) => {
  _axiosClient(o)
    .then(() => console.log("then..."))
    .catch((e) => console.log("error..."))
    .finally(() => console.log("--- finally"))
}

const excludePatterns = [/^\/user\/login/, /^\/user\/signup/]
// Set up an interceptor to add the Authorization header dynamically
_axiosClient.interceptors.request.use(
  (config) => {
    if (!excludePatterns.some((p) => p.test(config.url))) {
      const accessToken = localStorage.getItem("accessToken")
      if (accessToken && accessToken.length) {
        config.headers["Authorization"] = `Bearer ${accessToken}`
      }
    }
    return config
  },
  (error) => {
    console.log("=== request error before sending")
    return Promise.reject(error)
  }
)

// Axios Response Interceptor
_axiosClient.interceptors.response.use(
  (response) => {
    if (response.config.resolve) {
      response.config.resolve()
    }
    return response
  }, // If the response is successful, return it as is
  (error) => {
    if (error.config && error.config.reject) {
      error.config.reject()
    }
    return Promise.reject(error) // Return the error to the caller
  }
)

function test() {
  HTTP({ url: "https://dummyjson.com/products/1", method: "get", resolve: () => console.log("===resolve"), reject: () => console.log("===reject") })
}
</script>

<template>
  <div class="flex justify-around">
    <div class="c1 bg-blue-500 p-4">Column 1</div>
    <div class="c2 bg-green-500 p-4">Column 2</div>
    <button @click="test">Test</button>
  </div>
</template>

<style scoped>
@tailwind components;

@layer components {
  .c1 {
    flex-basis: 20%;
    /* flex-grow: 1; */
  }
  .c2 {
    flex-basis: 60%;
    /* flex-grow: 3; */
  }
}
</style>
