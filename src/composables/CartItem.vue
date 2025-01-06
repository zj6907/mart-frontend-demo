<script setup>
const emit = defineEmits()
const { i, appImageProxy } = defineProps(["i", "appImageProxy"])
</script>

<template>
  <div>
    <hr class="border-gray-400" />
    <div class="flex items-center">
      <!-- Display Product Image -->
      <div class="basis-[40%]">
        <img class="object-cover mx-auto" :src="`${appImageProxy}${i.product.imageUrl}`" :alt="i.product.name" />
      </div>
      <!-- Display Cart Product Details -->
      <div class="basis-[60%]">
        <p class="font-semibold">{{ i.product.name }}</p>
        <div class="mt-2">
          <span id="price" class="text-xs">
            price : &nbsp;<b>￥{{ i.product.price }}</b>
          </span>
          <br />
          <span class="text-xs">quantity: &nbsp;{{ i.quantity }}</span>
          <!-- Delete item -->
          <i @click="(e) => emit('emit', e, i)" class="bx bx-trash float-right mr-2 px-1" />
        </div>
        <!-- Item Total Price -->
        <span class="float-right text-sm">
          Total :&nbsp;<b>￥{{ i.totalPrice }}</b>
        </span>
      </div>
    </div>
  </div>
</template>
