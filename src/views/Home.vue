<script setup>
import Items from "@composables/Items.vue"
import CategoryItem from "@views/category/CategoryItem.vue"
import ProductItem from "@views/product/ProductItem.vue"
import { computed, onMounted, ref, watch, watchEffect } from "vue"
import { useStore } from "vuex"

const store = useStore()
const categories = computed(() => store.state.categories)
const products = computed(() => store.state.products)

const catList = computed(() => {
  const length = Math.min(categories.value.length, 6)
  return categories.value.slice(0, length)
})

const prodList = computed(() => {
  const length = Math.min(products.value.length, 6)
  return products.value.slice(0, length)
})
</script>

<template>
  <div class="px-[6%] py-8 text-center">
    <h4 class="text-2xl font-bold pb-1">Top Categories</h4>
    <Items>
      <CategoryItem :data="i" v-for="(i, index) in catList" :key="index" />
    </Items>
    <h4 class="text-2xl font-bold pt-8 pb-1">Top Products</h4>
    <Items>
      <ProductItem :data="i" v-for="(i, index) in prodList" :key="index" />
    </Items>
  </div>
</template>

<style scoped>
/* Define CSS Variables */
div {
  --line-clamp-lines: 1;
}

@tailwind components;
@layer components {
}
</style>
