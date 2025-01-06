<script setup>
import { Toast } from "../../SweetAlert"
import Items from "@composables/Items.vue"
import CategoryItem from "@views/category/CategoryItem.vue"
import { computed, ref } from "vue"
import { useStore } from "vuex"
import { onBeforeRouteLeave } from "vue-router"

const store = useStore()
const categories = computed(() => store.state.categories)

const fromAdmin = ref(store.state.auth.previousRoute === "Admin")
</script>

<template>
  <div>
    <h3 class="py-5 text-center text-3xl font-bold">All Categories</h3>
    <div class="my-1 px-5">
      <span class="relative top-2 left-2 text-xs">Total {{ categories.length }} categories found.</span>
      <router-link v-if="fromAdmin" :to="{ name: 'AddCategory' }">
        <button class="text-black mr-3 px-2 py-1 block float-end bg-gray-100 rounded-md tracking-wide">Add Category</button>
      </router-link>
    </div>
    <!-- <Items :list="categories" itemPath="/src/views/category/CategoryItem.vue" /> -->
    <Items> <CategoryItem :fromAdmin="fromAdmin" :data="i" v-for="(i, index) in categories" :key="index" /> </Items>
  </div>
</template>
