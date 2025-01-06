<script setup>
import Items from "@composables/Items.vue"
import { computed, ref } from "vue"
import { useStore } from "vuex"
import { Toast } from "../../SweetAlert"
import CartItem from "@composables/CartItem.vue"

const store = useStore()
const cart = computed(() => {
  if (!store.state.auth.isAuthenticated) {
    // Toast.error("Not authenticated yet, please log in!")
    return {}
  }
  if (!store.state.cart) store.dispatch("loadCart")
  return store.state.cart
})

const appImageProxy = ref(import.meta.env.APP_IMAGE_PROXY)

import * as axiosClient from "/src/axiosClient.js"
function deleteFromCart(ev, i) {
  ev.target.disabled = true
  axiosClient.HTTP("delete", `/cartitem/delete/${i.id}`, {
    resolve: () => store.dispatch("loadCart"),
    finalCallback: () => (ev.target.disabled = false),
  })
}
</script>

<template>
  <div class="blur-box mx-auto sm:w-[80%] sm:px-10 lg:w-[60%] xl:w-[50%]">
    <h3 class="pt-5 text-center text-3xl font-bold text-white">Cart Items</h3>
    <div v-if="cart.cartitems && cart.cartitems.length" class="mb-4 text-center text-gray-300">
      <span class="relative top-2 left-2 text-xs">Total {{ cart.cartitems && cart.cartitems.length }} items.</span>
    </div>
    <div v-else class="my-1 px-5"><span>Not items yet.</span></div>

    <!-- <Items :list="products" itemPath="/src/views/product/ProductItem.vue"> </Items> -->
    <div v-if="cart.cartitems && cart.cartitems.length" class="px-5 py-2 shadow">
      <div v-for="(i, index) in cart.cartitems" :key="index">
        <CartItem :i="i" :appImageProxy="appImageProxy" @emit="deleteFromCart" />
      </div>
      <!-- Total Price -->
      <span class="block float-right mt-2 pt-1 border-solid border-t-[2px] border-t-gray-300">
        Total price : &nbsp;<b>￥{{ cart.totalPrice }}</b>
      </span>
      <!-- <br /> -->
      <button class="block mt-14 py-1 px-2 mx-auto bg-[var(--bg-color-confirm)] rounded-lg">Go to Payment</button>
    </div>
  </div>
</template>

<style scoped>
@tailwind components;
@layer components {
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
