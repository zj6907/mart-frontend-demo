<script setup>
import { computed, onMounted } from "vue"
import { useStore } from "vuex"

const store = useStore()
const cartitemsCount = computed(() => {
  return store.state.cart?.cartitems?.length
})

onMounted(() => {
  if (!store.state.cart) store.dispatch("loadCart")
})
</script>

<template>
  <div class="relative h-full px-2 flex items-center justify-center">
    <i class="bx bxs-cart text-6xl hover:text-[var(--primary-color)] transition-all duration-300"></i>
    <span
      v-if="cartitemsCount"
      class="bg-red-500 w-fit px-1 aspect-square overflow-hidden text-sm rounded-[50%] flex items-center absolute translate-x-1.5 translate-y-[-1rem]">
      {{ cartitemsCount }}
    </span>
  </div>
</template>
