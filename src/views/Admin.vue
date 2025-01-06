<script setup></script>

<template>
  <div>
    <h3 class="py-5 text-center text-3xl font-bold">Admin</h3>
    <div class="w-[80%] mx-auto my-5 flex flex-col grid grid-cols-2 gap-x-5 gap-y-8 sm:w-[60%]">
      <router-link :to="{ name: 'Categories' }">Categories</router-link>
      <router-link :to="{ name: 'AddCategory' }">Add Category</router-link>
      <router-link :to="{ name: 'Products' }">Products</router-link>
      <router-link :to="{ name: 'AddProduct' }">Add Product</router-link>
    </div>
  </div>
</template>

<style scoped>
@tailwind components;

@layer components {
  a {
    @apply p-2 text-center text-lg  bg-[#7066E0] disabled:opacity-30 text-gray-100 tracking-wider rounded-lg;
  }
  a:nth-child(even) {
    @apply bg-red-400;
  }

  /* .createBtn {
    @apply mt-8 p-3 rounded-lg bg-[#7066E0] disabled:opacity-30 text-gray-100 tracking-wider;
  } */
}
</style>
