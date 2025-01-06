<script setup>
import { useRoute } from "vue-router"
import Items from "@composables/Items.vue"
import ProductItem from "@views/product/ProductItem.vue"
import { useStore } from "vuex"
import { computed } from "vue"
// const { categories, products } = defineProps(["categories", "products"])
const store = useStore()
const categories = computed(() => store.state.categories)
const products = computed(() => store.state.products)

const categoryId = useRoute().params.id
const category = computed(() => categories.value.find((i) => i.id == categoryId))
const productsC = computed(() => products.value.filter((i) => i.categoryId == categoryId))
</script>

<template>
  <div>
    <h3 class="pt-5 text-center text-3xl font-bold text-white">All products for {{ category.categoryName }}</h3>
    <div class="my-1 px-5">
      <span class="relative top-2 left-2 text-xs">Total {{ productsC.length }} products found.</span>
    </div>
    <Items>
      <ProductItem :data="i" v-for="(i, index) in productsC" :key="index" />
    </Items>
  </div>
</template>
