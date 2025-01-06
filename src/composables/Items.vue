<script setup>
// import { defineAsyncComponent } from "vue"
const props = defineProps(["list", "itemPath"])

/**
 * Async Component can be slowly to render.
 * Don't use unless necessary!
 */
// const asyncComp = defineAsyncComponent(() => import(props.itemPath))
</script>

<template>
  <div class="text-black w-full px-5 py-2 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 shadow">
    <!-- <component :is="asyncComp" :data="i" v-for="(i, index) in list" :key="index" /> -->
    <slot />
  </div>
</template>
