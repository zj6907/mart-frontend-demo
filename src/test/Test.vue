<script setup>
import { onMounted, ref } from "vue"
import * as axiosClient from "/src/axiosClient.js"
import { Toast } from "/src/SweetAlert"

function testAddCategories() {
  categories.forEach((c) => {
    data.value.push({
      categoryName: c.name,
      description: "Category of " + c.slug,
      imageUrl: "https://images.unsplash.com/photo-1561882468-9110e03e0f78",
    })
    axiosClient.HTTP("post", "/category/create", { data })
  })
}

async function testAddAllProducts() {
  const resp = await fetch("https://dummyjson.com/products?limit=9999")
  let products = null
  if (resp.ok) {
    const data = await resp.json()
    products = data.products
  }
  const list = []
  for (const p of products) {
    let temp = {
      name: p.title,
      price: p.price,
      description: p.description,
      imageUrl: p.thumbnail,
    }
    const cname = kebabToCapitalizedString(p.category)
    const resp = await axiosClient.inst().get("/category?name=" + cname)
    temp.categoryId = resp.data.id
    list.push(temp)
  }

  console.log("list completed - " + list.length)
  axiosClient.HTTP("post", "/product/addAll", { data: list })
}

function kebabToCapitalizedString(kebab) {
  return kebab
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function test() {
  products.products.forEach((p) => {
    console.log(p.price)
  })
}
</script>

<template>
  <h3 class="viewTitle">Test!</h3>
  <!-- <pre>{{ products.products }}</pre> -->
  <button @click="testAddCategories" class="block mx-auto my-4 px-5 py-2 bg-red-500 rounded-lg">AddCategories</button>
  <button @click="testAddAllProducts" class="block mx-auto my-4 px-5 py-2 bg-red-500 rounded-lg">AddAllProducts</button>
  <button @click="test" class="block mx-auto my-4 px-5 py-2 bg-red-500 rounded-lg">Test</button>
</template>
