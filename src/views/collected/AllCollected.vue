<script setup>
import Items from "@composables/Items.vue"
import ProductItem from "@views/product/ProductItem.vue"
import { computed } from "vue"
import { useStore } from "vuex"
import { Toast } from "../../SweetAlert"

const store = useStore()
const allCollected = computed(() => {
  if (!store.state.allCollected.length) store.dispatch("loadAllCollected")
  return store.state.allCollected
})

import * as axiosClient from "/src/axiosClient.js"
function cancelCollect(ev, id) {
  ev.target.disabled = true
  axiosClient.HTTP("delete", `/collected/delete/${id}`, {
    resolve: () => store.dispatch("loadAllCollected"),
    finalCallback: () => (ev.target.disabled = false),
  })
}
</script>

<template>
  <div>
    <h3 class="pt-5 text-center text-3xl font-bold text-white">All Collected Products</h3>
    <div class="my-1 px-5">
      <span class="relative top-2 left-2 text-xs">Total {{ allCollected.length }} products found.</span>
    </div>
    <!-- <Items :list="products" itemPath="/src/views/product/ProductItem.vue"> </Items> -->
    <Items>
      <ProductItem deletable="true" @delete.stop="cancelCollect" :deleteId="i.id" :data="i.product" v-for="(i, index) in allCollected" :key="index" />
    </Items>
  </div>
</template>

<style scoped>
div {
  --line-clamp-lines: 2;
}

@tailwind components;
@layer components {
}
</style>
