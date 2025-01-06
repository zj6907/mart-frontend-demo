<script setup>
import LabeledInput from "@composables/LabeledInput.vue"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import * as axiosClient from "/src/axiosClient.js"
const user = ref({})
const router = useRouter()
const validation = ref(null)
const store = useStore()

function login(ev) {
  try {
    if (!user.value.email) throw new Error("Email cannot be empty!")
    if (!user.value.password) throw new Error("Password cannot be empty!")
  } catch (error) {
    validation.value = error.message
    return
  }
  axiosClient.HTTP("post", "/user/login", {
    data: user.value,
    resolve: (data) =>
      store.dispatch("auth/onLoginSuccess", { accessToken: data.accessToken, refreshToken: data.refreshToken, roles: data.roles, router }),
  })
}
</script>

<template>
  <div
    class="w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] mx-auto mt-[10%] px-6 py-4 border-solid border-[2px] border-gray-400 rounded-sm backdrop-blur-[10px]">
    <h1 class="text-2xl font-bold text-center text-[--title-color-login] tracking-wider">Log In</h1>
    <span v-if="validation" class="inline-block mt-4 text-red-500 font-bold">{{ validation }}</span>
    <div>
      <LabeledInput label="Email" @emit="(v) => (user.email = v)" />
      <LabeledInput label="Password" type="password" @emit="(v) => (user.password = v)" />
      <button
        @click="login"
        class="mt-8 block mx-auto px-4 py-2 rounded-lg bg-[var(--bg-color-confirm)] disabled:opacity-30 text-gray-100 tracking-wider">
        Log In
      </button>
    </div>
    <div class="text-center mt-5">
      <span class="text-xs text-gray-300">Want to create another Account?</span>
      <router-link
        :to="{ name: 'Signup' }"
        class="block mx-auto w-fit bg-gray-500 px-3 py-1 rounded-lg disabled:opacity-30 text-gray-100 tracking-wider">
        Sign Up
      </router-link>
    </div>
  </div>
</template>

<style scoped></style>
