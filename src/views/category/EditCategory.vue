<script setup>
import { computed, onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useStore } from "vuex"
import LabeledInput from "@composables/LabeledInput.vue"
import LabeledTextarea from "@composables/LabeledTextarea.vue"
import * as axiosClient from "/src/axiosClient.js"
const store = useStore()
const categories = computed(() => store.state.categories)
const category = computed(() => {
  const id = useRoute().params.id
  const original = categories.value.find((c) => c.id == id)
  return Object.assign({}, original)
})

const router = useRouter()
function editCategory(ev) {
  ev.target.disabled = true
  axiosClient.HTTP("put", `/category/update/${category.value.id}`, {
    data: category.value,
    resolve: (data) => {
      store.dispatch("loadCategories")
      router.push({ name: "Categories" })
    },
    finalCallback: () => {
      ev.target.disabled = false
    },
  })
}
</script>

<template>
  <div class="w-[80%] mx-auto">
    <h3 class="py-5 text-center text-3xl font-bold">Edit Category</h3>
    <LabeledInput label="Category Name" :value="category.categoryName" @emit="(v) => (category.categoryName = v)" />
    <LabeledTextarea label="Description" :value="category.description" @emit="(v) => (category.description = v)" />
    <LabeledInput label="imageUrl" :value="category.imageUrl" @emit="(v) => (category.imageUrl = v)" />
    <button
      @click="editCategory"
      class="block mx-auto mt-8 p-3 rounded-lg bg-[var(--bg-color-edit)] disabled:opacity- select-none text-gray-100 tracking-wider">
      Edit Category
    </button>
  </div>
</template>
