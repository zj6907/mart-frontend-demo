<script setup>
import LabeledInput from "../../composables/LabeledInput.vue"
import LabeledSelect from "../../composables/LabeledSelect.vue"
import LabeledTextarea from "@composables/LabeledTextarea.vue"
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import * as axiosClient from "../../axiosClient.js"

const router = useRouter()
const store = useStore()
const categories = computed(() => store.state.categories)

const [categoryId, name, price, description, imageUrl] = [ref(null), ref(null), ref(null), ref(null), ref(null)]
function addProduct(ev) {
  ev.target.disabled = true
  const data = {
    categoryId: categoryId.value,
    name: name.value,
    price: price.value,
    description: description.value,
    imageUrl: imageUrl.value,
  }
  axiosClient.HTTP("post", "/product/add", {
    data,
    resolve: (respData) => {
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
  <div class="editMain">
    <h3 class="viewTitle">Add Product</h3>
    <LabeledSelect label="Category" :list="categories" optDescPath="categoryName" optValuePath="id" @emit="(v) => (categoryId = v)" />
    <LabeledInput label="Name" @emit="(v) => (name = v)" />
    <LabeledInput label="Price" type="number" @emit="(v) => (price = v)" />
    <LabeledTextarea label="Description" @emit="(v) => (description = v)" />
    <LabeledInput label="imageUrl" @emit="(v) => (imageUrl = v)" />
    <div class="text-center">
      <button @click="addProduct" class="createBtn">Add Product</button>
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
