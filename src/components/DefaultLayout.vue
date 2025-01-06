<script setup>
import Header from "@components/Header.vue"
import Footer from "@components/Footer.vue"
import { computed, onMounted, ref } from "vue"
import { useStore } from "vuex"
import * as axiosClient from "/src/axiosClient.js"

const store = useStore()
const categories = computed(() => store.state.categories)
const products = computed(() => store.state.products)

if (!store.state.categories?.length) store.dispatch("loadCategories")
if (!store.state.products?.length) store.dispatch("loadProducts")
store.dispatch("auth/checkAuthentication")
</script>

<template>
  <Header class="relative z-40" />
  <main class="pt-[60px] pb-[200px] relative z-20">
    <router-view v-if="categories && products" :categories="categories" :products="products" />
  </main>
  <Footer class="relative z-40" />
</template>
