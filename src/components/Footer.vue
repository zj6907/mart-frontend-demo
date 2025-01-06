<template>
  <div>
    <footer
      class="bg-[var(--color-black)] fixed bottom-0 w-full text-center --padding text-[.6rem] sm:text-xs grid grid-cols-4 justify-evenly gap-x-1">
      <ul>
        <li>Get to Know Us</li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Android App</a></li>
        <li><a href="#">iOS App</a></li>
      </ul>
      <ul>
        <li>Connect with Us</li>
        <li><a href="#">Facebook</a></li>
        <li><a href="#">Twitter</a></li>
        <li><a href="#">Instagram</a></li>
      </ul>
      <ul>
        <li>Make Money with Us</li>
        <li><a href="#">Sell with Us</a></li>
        <li><a href="#">Become an Affiliate</a></li>
        <li><a href="#">Advertise Your Products</a></li>
      </ul>
      <ul>
        <li>Let Us Help You</li>
        <li><a href="#">Return to Center</a></li>
        <li><a href="#">100% Purchase Protection</a></li>
        <li><a href="#">Help</a></li>
        <li><a href="#">App Download</a></li>
      </ul>
    </footer>
  </div>
</template>

<style scoped>
@tailwind components;

@layer components {
  .--padding {
    @apply px-3 py-1 sm:px-5 md:px-10 lg:px-24 xl:px-44 2xl:px-56;
  }
  ul li {
    @apply line-clamp-1;
  }
  ul li:first-child {
    @apply text-gray-400;
  }
  ul li:not(:first-child) {
    @apply text-gray-500;
  }
}
</style>
