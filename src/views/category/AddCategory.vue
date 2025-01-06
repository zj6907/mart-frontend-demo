<script setup>
import { ref } from "vue"
import LabeledInput from "../../composables/LabeledInput.vue"
import LabeledTextarea from "@composables/LabeledTextarea.vue"
import * as axiosClient from "../../axiosClient.js"

const categoryName = ref(null)
const description = ref(null)
const imageUrl = ref(null)

function createCategory(ev) {
  ev.target.disabled = true
  const data = {
    categoryName: categoryName.value,
    description: description.value,
    imageUrl: imageUrl.value ?? "https://images.unsplash.com/photo-1561882468-9110e03e0f78", //todo
  }
  axiosClient.HTTP("post", "/category/create", {
    data,
    finalCallback: () => {
      ev.target.disabled = false
    },
  })
}
</script>

<template>
  <div class="editMain">
    <h3 class="viewTitle">Add Category</h3>
    <!-- {{ categoryName }} - {{ description }} - {{ imageUrl }} -->
    <LabeledInput label="Category Name" @emit="(v) => (categoryName = v)" />
    <LabeledTextarea label="Description" @emit="(v) => (description = v)" />
    <LabeledInput label="imageUrl" @emit="(v) => (imageUrl = v)" />
    <div class="text-center">
      <button @click="createCategory" class="createBtn">Create Category</button>
    </div>
  </div>
</template>

<style scoped>
@tailwind components;

@layer components {
  .editMain {
    @apply w-[80%] mx-auto;
  }
  .viewTitle {
    @apply py-5 text-center text-3xl font-bold;
  }
  .createBtn {
    @apply mt-8 p-3 rounded-lg bg-[#7066E0] disabled:opacity-30 text-gray-100 tracking-wider;
  }
}
</style>
