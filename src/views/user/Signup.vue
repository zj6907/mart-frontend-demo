<script setup>
import LabeledInput from "@composables/LabeledInput.vue"
import { ref } from "vue"
import { useRouter } from "vue-router"
import * as axiosClient from "/src/axiosClient.js"
const user = ref({})
const confirmPassword = ref(null)
const router = useRouter()
const validation = ref(null)
function signUp(ev) {
  try {
    if (!user.value.email) throw new Error("Email cannot be empty!")
    if (!user.value.firstName && !user.value.lastName) throw new Error("User name cannot be empty!")
    if (!user.value.password) throw new Error("Password cannot be empty!")
    if (!confirmPassword.value) throw new Error("Confirm Password cannot be empty!")
    if (user.value.password !== confirmPassword.value) throw new Error("Confirmpassword are not consistent!")
  } catch (error) {
    validation.value = error.message
    return
  }
  axiosClient.HTTP("post", "/user/signup", {
    data: user.value,
    resolve: (resp) => router.replace({ name: "Home" }),
  })
}
</script>

<template>
  <div
    class="w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] mx-auto mt-[10%] px-6 py-4 border-solid border-[2px] border-gray-400 rounded-sm backdrop-blur-[10px]">
    <h1 class="text-2xl font-bold text-center text-[--title-color-create] tracking-wider">Create Account</h1>
    <span v-if="validation" class="inline-block mt-4 text-red-500 font-bold">{{ validation }}</span>
    <div>
      <LabeledInput label="Email" @emit="(v) => (user.email = v)" />
      <div class="flex gap-4">
        <LabeledInput label="First Name" @emit="(v) => (user.firstName = v)" />
        <LabeledInput label="Last Name" @emit="(v) => (user.lastName = v)" />
      </div>
      <LabeledInput label="Password" type="password" @emit="(v) => (user.password = v)" />
      <LabeledInput label="Confirm Password" type="password" @emit="(v) => (confirmPassword = v)" />
      <button
        @click="signUp"
        class="mt-8 block mx-auto px-4 py-3 rounded-lg bg-[var(--bg-color-create)] disabled:opacity-30 text-gray-100 tracking-wider">
        Create Account
      </button>
    </div>
    <div class="text-center mt-5">
      <span class="text-xs text-gray-300">Already Have an Account?</span>
      <router-link
        :to="{ name: 'Login' }"
        class="block w-fit m-auto bg-gray-500 px-4 py-1 rounded-lg disabled:opacity-30 text-gray-100 tracking-wider">
        Log in Here
      </router-link>
    </div>
  </div>
</template>

<style scoped>
div {
  --label-color: rgb(204, 204, 204);
}
</style>
