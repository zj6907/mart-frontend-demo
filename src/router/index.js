import { createRouter, createWebHistory } from "vue-router"
import DefaultLayout from "../components/DefaultLayout.vue"
import Home from "../views/Home.vue"
import About from "../views/About.vue"
import GuestLayout from "../components/GuestLayout.vue"
import Categories from "../views/category/Categories.vue"
import CategoryDetail from "@views/category/CategoryDetail.vue"
import AddCategory from "../views/category/AddCategory.vue"
import EditCategory from "../views/category/EditCategory.vue"
import Products from "@views/product/Products.vue"
import ProductDetail from "@views/product/productDetail.vue"
import AddProduct from "../views/product/AddProduct.vue"
import EditProduct from "@views/product/EditProduct.vue"
import AllCollected from "@views/collected/AllCollected.vue"
import CartItems from "@views/cart/CartItems.vue"
import Admin from "../views/Admin.vue"
import Signup from "@views/user/Signup.vue"
import Login from "@views/user/Login.vue"

import Test from "/src/test/Test.vue"
import TestDropdown from "/src/test/TestDropdown.vue"
import GuestTest from "/src/test/GuestTest.vue"

const routes = [
  {
    path: "/",
    name: "DefaultLayout",
    component: DefaultLayout,
    children: [
      { path: "/", name: "Home", component: Home },
      { path: "/about", name: "About", component: About },
      { path: "/admin", name: "Admin", component: Admin },
      { path: "/categories", name: "Categories", component: Categories },
      { path: "/admin/categoryDetail/:id", name: "CategoryDetail", component: CategoryDetail },
      { path: "/admin/category/add", name: "AddCategory", component: AddCategory },
      { path: "/admin/category/edit/:id", name: "EditCategory", component: EditCategory },
      { path: "/products", name: "Products", component: Products },
      { path: "/admin/productDetail/:id", name: "ProductDetail", component: ProductDetail },
      { path: "/admin/product/add", name: "AddProduct", component: AddProduct },
      { path: "/admin/product/edit/:id", name: "EditProduct", component: EditProduct },
      { path: "/allCollected", name: "AllCollected", component: AllCollected, meta: { requiresAuth: true } },
      { path: "/cartitems", name: "CartItems", component: CartItems, meta: { requiresAuth: true } },
      { path: "/test", name: "Test", component: Test },
    ],
  },
  { path: "/signup", name: "Signup", component: Signup },
  { path: "/login", name: "Login", component: Login },
  { path: "/guest", name: "GuestLayout", component: GuestLayout, children: [] },
  { path: "/guestTest", name: "GuestTest", component: GuestTest },
  { path: "/testDropdown", name: "TestDropdown", component: TestDropdown },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

import store from "/src/store"
// Global navigation guard
router.beforeEach((to, from, next) => {
  // track previous route
  store.commit("auth/setPreviousRoute", from.name)

  if (to.name === "Login") {
    // set unauthenticated. Just for unexpected cases.
    store.dispatch("auth/removeTokens")
    store.dispatch("auth/clearAuthorities")
    if (!store.state.auth.redirect) {
      store.commit("auth/setRedirect", from.name)
      store.commit("auth/setRedirectData", router)
    }
  }

  // Check if the route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // If the user is not authenticated, redirect to the login page
    if (!store.state.auth.isAuthenticated) {
      // Store the original route the user was trying to visit
      store.commit("auth/setRedirect", to.name)
      // save the current route's params and query first.
      store.commit("auth/setRedirectData", router)
      next({ name: "Login" })
    } else {
      next() // Continue to the requested route
    }
  } else {
    next() // Continue if no authentication is required
  }
})

export default router
