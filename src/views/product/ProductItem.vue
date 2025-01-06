<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
const emit = defineEmits()
const { data, fromAdmin, deletable, deleteId } = defineProps(["data", "fromAdmin", "deletable", "deleteId"])

const appImageProxy = ref(import.meta.env.APP_IMAGE_PROXY)

const router = useRouter()
function toDetail(ev) {
  ev.stopPropagation()
  router.push({ name: "ProductDetail", params: { id: data.id } })
}
function toEdit(ev) {
  ev.stopPropagation()
  router.push({ name: "EditProduct", params: { id: data.id } })
}
</script>

<template>
  <div @click="toDetail" class="relative flex flex-col bg-gray-100 rounded-lg overflow-clip hover:scale-105 duration-200">
    <div class="flex-grow">
      <img class="w-full object-contain aspect-video bg-white" :src="`${appImageProxy}${data.imageUrl}`" :alt="data.name" />
      <!-- Product Deail -->
      <div class="px-1 py-1">
        <span id="name" class="w-full font-bold text-lg leading-none --line-clamp">{{ data.name }}</span>
        <p id="desc" class="italic leading-none --line-clamp">{{ $filters.truncate(data.description, 10) }}</p>
        <span id="price" class="block mt-1 text-xs font-bold">
          Price: <b>￥{{ data.price }}</b>
        </span>
      </div>
    </div>
    <!-- Tools -->
    <div class="flex flex-grow-0 justify-end items-center">
      <!-- Edit -->
      <button v-if="fromAdmin" @click="toEdit" class="px-3 mb-1 mr-2 block bg-[#8781cc] text-gray-100 disabled:opacity-30 rounded-lg tracking-wider">
        Edit
      </button>
      <!-- Delete -->
      <i v-if="deletable" @click="(ev) => emit('delete', ev, deleteId)" class="bx bx-trash pr-1 mr-1 mb-1" />
    </div>
  </div>
</template>

<style scoped>
@tailwind components;

@layer components {
  .--line-clamp {
    display: -webkit-box;
    -webkit-line-clamp: var(--line-clamp-lines, 3); /* Use CSS Variables. Can Use Fallback. */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  #desc {
    /* Default fallback */
    color: var(--child-desc-color, gray);
  }
}
</style>
