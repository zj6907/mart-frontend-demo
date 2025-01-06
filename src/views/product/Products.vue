<script setup>
import Items from "@composables/Items.vue"
import ProductItem from "@views/product/ProductItem.vue"
import { computed, ref } from "vue"
import { useStore } from "vuex"
// defineProps(["products"])
const store = useStore()
const products = computed(() => store.state.products)

const fromAdmin = ref(store.state.auth.previousRoute === "Admin")
</script>

<template>
  <div>
    <h3 class="pt-5 text-center text-3xl font-bold text-white">All Products</h3>
    <div class="my-1 px-5">
      <span class="relative top-2 left-2 text-xs">Total {{ products.length }} products found.</span>
      <router-link v-if="fromAdmin" :to="{ name: 'AddProduct' }">
        <button class="px-2 py-1 mr-3 block float-end bg-gray-100 rounded-md tracking-wide text-black">Add Product</button>
      </router-link>
    </div>
    <!-- <Items :list="products" itemPath="/src/views/product/ProductItem.vue"> </Items> -->
    <Items>
      <ProductItem :fromAdmin="fromAdmin" :data="i" v-for="(i, index) in products" :key="index" />
    </Items>
  </div>
</template>

<style scoped>
div {
  --line-clamp-lines: 2;
}

@tailwind components;
@layer components {
}
</style>
