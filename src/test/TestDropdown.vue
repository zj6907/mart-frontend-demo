<template>
  <div class="flex justify-between px-[3%] py-4 bg-[var(--color-black)] select-none">
    <h1 class="text-lg font-bold text-[--color-primary]">Logo</h1>
    <ul class="top-menu">
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li>
        <a href="#">Pages <i class="fas fa-caret-down"></i></a>
        <div class="dropdown-menu">
          <ul>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Portfolio</a></li>
            <li>
              <a href="#">Team <i class="fas fa-caret-right"></i></a>
              <div class="dropdown-menu-1">
                <ul>
                  <li><a href="#">Team 1</a></li>
                  <li><a href="#">Team 2</a></li>
                  <li><a href="#">Team 3</a></li>
                  <li><a href="#">Team 4</a></li>
                </ul>
              </div>
            </li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
      </li>
      <li><a href="#">Blog</a></li>
      <li><a href="#">Contact Us</a></li>
    </ul>
  </div>
</template>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css");
@tailwind components;
@layer components {
  ul {
    @apply flex;
  }
  ul li {
    @apply relative px-5;
  }
  ul a {
    transition: all 0.3s;
  }
  ul a:hover {
    color: var(--primary-color);
  }
  .dropdown-menu {
    @apply hidden;
  }
  ul li:hover .dropdown-menu {
    @apply block absolute top-full left-0 bg-[var(--color-black)];
    /* transition: opacity 1s ease, visibility 0s 0.5s; */
    transition: opacity 3s ease, visibility 3s 3s; /* Transition effect */
  }
  .dropdown-menu ul {
    @apply block p-5;
  }
  .dropdown-menu li {
    @apply w-24 p-1;
  }
  .dropdown-menu-1 {
    @apply hidden;
    transition: opacity 3s ease, visibility 3s 0s; /* Transition effect */
  }
  .dropdown-menu li:hover .dropdown-menu-1 {
    @apply block absolute top-0  sm:left-[110px] left-[-140px] bg-[var(--color-black)];
  }
}
</style>
