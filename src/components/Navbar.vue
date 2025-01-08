<script setup>
import { computed, onMounted, ref, watchEffect } from "vue"
import CartIcon from "@composables/CartIcon.vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"

const store = useStore()
const router = useRouter()
const isAuthenticated = computed(() => store.state.auth.isAuthenticated)
const roles = computed(() => store.state.auth.roles)
function logout() {
  store.dispatch("auth/logout", { router })
}

onMounted(() => {
  // Control hidden of dropdown-menu
  const dropdowns = document.querySelectorAll(".dropdown-menu")
  for (const dropdown of dropdowns) {
    const parentL = dropdown.parentElement
    // Hover events on Computers
    parentL.addEventListener("mouseenter", (ev) => display(dropdown))
    parentL.addEventListener("mouseleave", (ev) => hide(dropdown))
    // Click events on Mobiles
    parentL.addEventListener("click", (ev) => {
      ev.stopPropagation()
      toggle(dropdown)
    })
    // Close dropdown-menu when clicked an anchor
    const links = dropdown.querySelectorAll("ul > li > a")
    for (const a of links) {
      a.addEventListener("click", (ev) => {
        ev.stopPropagation() // This is important!!!
        hide(dropdown)
      })
    }
  }

  // Toggle dropdown-menu
  function toggle(dropdown) {
    if (dropdown.style.display === "none") display(dropdown)
    else hide(dropdown) // dropdown.classList.toggle("block") // This doesn't work!!!
  }
  function hide(dropdown) {
    dropdown.style.display = "none"
  }
  function display(dropdown) {
    dropdown.style.display = "block"
    alignToRightWhenAcross(dropdown)
  }
  // Prevent the dropdown-menu goes beyond the right side of the view port
  function alignToRightWhenAcross(dropdown) {
    const rect = dropdown.getBoundingClientRect()
    if (rect.right > window.innerWidth) {
      // console.log(`${rect.right - window.innerWidth}px`)
      dropdown.style.left = `${window.innerWidth - rect.right}px`
    }
  }
})
</script>

<template>
  <nav class="h-full flex">
    <ul class="flex text-white text-lg h-full">
      <!-- Browser menu -->
      <li>
        <a href="#">
          <span class="tab-text font-semibold">Browser <i class="fas fa-caret-down" /></span>
          <i class="bx bx-category tab-icon hidden"></i>
        </a>
        <div class="dropdown-menu">
          <ul>
            <li>
              <router-link :to="{ name: 'Categories' }">Categories</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Products' }">Products</router-link>
            </li>
            <li v-if="isAuthenticated">
              <router-link :to="{ name: 'AllCollected' }">All Collected Items</router-link>
            </li>
          </ul>
        </div>
      </li>

      <!-- Account menu -->
      <li class="relative">
        <a href="#">
          <span class="tab-text font-semibold">Accounts <i class="fas fa-caret-down" /></span>
          <i class="bx bxs-user-account tab-icon hidden"></i>
        </a>
        <div class="dropdown-menu">
          <ul>
            <li v-if="!isAuthenticated">
              <router-link :to="{ name: 'Signup' }">Sign up</router-link>
            </li>
            <li v-if="!isAuthenticated">
              <router-link :to="{ name: 'Login' }">Log in</router-link>
            </li>
            <li v-if="isAuthenticated">
              <a @click="logout">Log out</a>
            </li>
            <li>
              <router-link v-if="roles?.some((r) => r.authority === 'ADMIN')" :to="{ name: 'Admin' }">Admin</router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>

    <!-- Shopping Cart -->
    <router-link v-if="isAuthenticated" :to="{ name: 'CartItems' }">
      <CartIcon />
    </router-link>
  </nav>
</template>

<style scoped>
/* fonts for caret, bx-, ... */
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css");
@tailwind components;
@layer components {
  ul a {
    @apply px-2 sm:px-6 hover:text-[var(--primary-color)] line-clamp-6  duration-300 flex items-center h-full;
  }
  ul li {
    @apply relative  h-full;
  }
  .dropdown-menu {
    @apply hidden;
  }
  li:hover .dropdown-menu {
    @apply block absolute top-full left-0 py-3 shadow-lg bg-[var(--color-black)] bg-opacity-100 w-fit;
  }
  li:hover .dropdown-menu a {
    @apply leading-none py-3 min-w-24 text-center;
  }
  @media (max-width: 440px) {
    .tab-text {
      @apply hidden;
    }
    .tab-icon {
      @apply block h-full text-4xl  px-1 pt-5 hover:text-[var(--primary-color)] transition-all duration-300;
    }
  }
}
</style>
