<script setup>
import { computed, onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useStore } from "vuex"
import LabeledSelect from "@composables/LabeledSelect.vue"
import LabeledInput from "@composables/LabeledInput.vue"
import LabeledTextarea from "@composables/LabeledTextarea.vue"
import * as axiosClient from "/src/axiosClient.js"

const store = useStore()
const products = computed(() => store.state.products)
const categories = computed(() => store.state.categories)

const route = useRoute()
const product = computed(() => {
  const id = route.params.id
  const original = products.value.find((i) => i.id == id)
  return { ...original }
})

const router = useRouter()
function editProduct(ev) {
  ev.target.disabled = true
  axiosClient.HTTP("put", `/product/update/${product.value.id}`, {
    data: product.value,
    resolve: (data) => {
      store.dispatch("loadProducts")
      router.push({ name: "Products" })
    },
    finalCallback: () => {
      ev.target.disabled = false
    },
  })
}
</script>

<template>
  <div class="w-[80%] mx-auto">
    <h3 class="py-5 text-center text-3xl font-bold">Edit Product</h3>
    <LabeledSelect
      label="Category"
      :list="categories"
      optValuePath="id"
      optDescPath="categoryName"
      :value="product.categoryId"
      @emit="(v) => (product.categoryId = v)" />
    <LabeledInput label="Name" :value="product.name" @emit="(v) => (product.name = v)" />
    <LabeledTextarea label="Description" :value="product.description" @emit="(v) => (product.description = v)" />
    <LabeledInput label="Image URL" :value="product.imageUrl" @emit="(v) => (product.imageUrl = v)" />
    <LabeledInput label="Price" type="number" step=".01" min="0" symbol="￥" :value="product.price" @emit="(v) => (product.price = v)" />
    <button @click="editProduct" class="block mx-auto mt-8 p-3 rounded-lg bg-[#7066E0] disabled:opacity-30 text-gray-100 tracking-wider select-none">
      Edit Product
    </button>
  </div>
</template>
