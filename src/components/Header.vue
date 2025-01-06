<script setup>
import { onMounted } from "vue"
import Navbar from "@components/Navbar.vue"
// import "@assets/stylesheets/navbar.css"

onMounted(() => {
  if (false && isSmallScreen()) {
    const headerMenu = document.querySelector("#header-menu")
    const navbar = document.querySelector("#navbar")
    // Toggle the menu icon
    headerMenu.addEventListener("click", (event) => toggleNavbar())

    // On small devices: Collapse the navbar when leaving the bottom
    let navBottom = -1
    navbar.addEventListener("mouseleave", (event) => {
      if (isSmallScreen() && event.clientY > navBottom) toggleNavbar()
    })

    // Add a blur background for small screen navbar navbar
    const navBg = document.querySelector("#nav-bg")

    function toggleNavbar() {
      return
      headerMenu.classList.toggle("bx-x")
      navbar.classList.toggle("block")
      navBg.classList.toggle("active") // navBg.style.display = "block" | ""
      // Toggle the nav background
      if (!navBg.style.height) {
        // When navbar is displayed, record the bottom. So when navbar collapses, it won't trigger mouseleave >> toggleNavbar
        navBottom = navbar.getBoundingClientRect().bottom - 1
        navBg.style.height = navbar.getBoundingClientRect().height - 3 + "px"
      } else navBg.style.height = null
      if (!navBg.style.top) navBg.style.top = navbar.getBoundingClientRect().top + "px"
      else navBg.style.top = null
    }

    navbar.querySelectorAll("*").forEach((e) => {
      e.addEventListener("click", (event) => {
        // Add click animations on <navbar> <a>
        event.target.classList.add("flash")
        setTimeout(() => {
          // Clear animation
          event.target.classList.remove("flash")
          // Close navbar
          toggleNavbar()
        }, 300)
      })
    })
  }
})

function isSmallScreen() {
  return window.matchMedia("(max-width: 640px)").matches
}
</script>

<template>
  <div>
    <header
      class="flex justify-between items-center text-white w-full h-[70px] fixed z-30 top-0 left-0 pl-[3%] lg:pl-24 bg-[var(--color-black)] bg-opacity-10 backdrop-blur-md select-none border-bottom: 2px solid rgba(255, 255, 255, 0.1) ]">
      <div id="logo">
        <router-link :to="{ name: 'Home' }" class="text-[var(--primary-color)] text-2xl no-underline font-semibold"> Logo </router-link>
      </div>
      <!-- Hidden for now -->
      <!-- <i class="bx bx-menu text-white text-4xl block sm:hidden" id="header-menu"></i> -->
      <Navbar class="relative z-20" />
    </header>
    <!-- <div id="nav-bg" /> -->
  </div>
</template>

<style scoped>
/* @import url("@assets/stylesheets/navbar.css"); */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  header::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    /* background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent); */
    background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
    transition: 0.35s;
  }
  header:hover::before {
    left: 100%;
  }

  /* Hidden for now */
  @media (max-width: 640px) {
    /* .navbar {
      @apply fixed w-full top-full left-0 px-[3%] py-5 bg-white bg-opacity-10 hidden;
      border-bottom: 2px solid rgba(255, 255, 255, 0.1);
    } */
    /* #nav-bg {
      @apply fixed w-full mt-1 backdrop-blur-md hidden;
      z-index: 99;
    }
    #nav-bg.active {
      display: block;
    } */
  }

  /* Flash effect  */
  .flash {
    animation: flashAnim 0.2s ease-out; /* Animation duration and type */
  }
  @keyframes flashAnim {
    50% {
      background-color: lightgray; /* Original background color */
    }
  }
}
</style>
