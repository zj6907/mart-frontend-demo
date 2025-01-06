<script setup>
import * as axiosClient from "/src/axiosClient.js"
import { computed, ref } from "vue"
import { useRoute } from "vue-router"
import { useStore } from "vuex"
// const { categories, products } = defineProps(["products", "categories"])
const store = useStore()
const categories = computed(() => store.state.categories)
const products = computed(() => store.state.products)

const productId = useRoute().params.id
const product = computed(() => {
  const original = products.value.find((i) => i.id == productId)
  return { ...original }
})
const category = computed(() => {
  const original = categories.value.find((i) => i.id == product.categoryId)
  return { ...original }
})

const appImageProxy = ref(import.meta.env.APP_IMAGE_PROXY)

function addToCollected(ev) {
  ev.target.disabled = true
  axiosClient.HTTP("post", `/collected/add`, {
    data: product.value,
    resolve: () => store.dispatch("loadAllCollected"),
    finalCallback: () => (ev.target.disabled = false),
  })
}

const quantity = ref(1)
function addToCart(ev) {
  ev.target.disabled = true
  axiosClient.HTTP("post", `/cartitem/add`, {
    data: {
      productId: product.value.id,
      quantity: quantity.value,
    },
    resolve: () => store.dispatch("loadCart"),
    finalCallback: () => (ev.target.disabled = false),
  })
}
</script>

<template>
  <div class="p-5 sm:pb-20 sm:flex gap-5 blur-box">
    <!-- Display Product Image -->
    <div class="basis-[40%]">
      <img class="object-cover mx-auto" :src="`${appImageProxy}${product.imageUrl}`" :alt="product.name" />
    </div>

    <!-- Display Product Details -->
    <div class="basis-[60%]">
      <h3 class="text-3xl font-semibold text-white text-center">{{ product.name }}</h3>
      <span id="categoryName" class="italic leading-none line-clamp-1">{{ category.categoryName }}</span>
      <span id="price" class="mt-2 text-xs">
        price : &nbsp;<b>￥{{ product.price }}</b>
      </span>
      <!-- Description -->
      <p class="--desc-text mt-1">{{ product.description }}</p>
      <!-- Add to Cart -->
      <div class="flex justify-between my-1 mx-2">
        <div class="tracking-wider">
          <span class="bg-gray-400 inline-block ml-2 px-2 rounded-l-lg">Quantity</span>
          <input class="bg-gray-300 w-12 text-black px-2 rounded-r-lg text-center" type="number" v-model="quantity" />
        </div>
        <button class="h-full mr-8 px-3 bg-[var(--bg-color-confirm)] disabled:opacity-30 tracking-wider rounded-xl" @click="addToCart">
          Add to Cart
        </button>
      </div>

      <div class="mt-2">
        <h5 class="tracking-wider font-semibold text-center">Features</h5>
        <ul class="text-sm --desc-text">
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, consectetur!</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, consectetur!</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, consectetur!</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, consectetur!</li>
        </ul>
      </div>
      <div class="mt-2">
        <button
          id="collect"
          @click="addToCollected"
          class="ml-2 px-2 bg-[var(--bg-color-create)] disabled:opacity-30 text-gray-100 tracking-wider rounded-lg">
          Collect
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@tailwind components;
@layer components {
  .--desc-text {
    color: var(--desc-color, rgba(255, 255, 255, 0.8));
  }
  .blur-box {
    /* Apply blur effect to the background */
    backdrop-filter: blur(10px);
    /* Gradual clear area */
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) calc(100% - 20px), rgba(0, 0, 0, 0) 100%);
    /* For webkit browsers */
    -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) calc(100% - 20px), rgba(0, 0, 0, 0) 100%);
  }
}
</style>
