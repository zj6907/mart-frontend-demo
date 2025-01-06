<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
const { data, fromAdmin } = defineProps(["data", "fromAdmin"])

const appImageProxy = ref(import.meta.env.APP_IMAGE_PROXY)
const router = useRouter()
function toDetail(ev) {
  ev.stopPropagation()
  router.push({ name: "CategoryDetail", params: { id: data.id } })
}

function toEdit(ev) {
  ev.stopPropagation()
  router.push({ name: "EditCategory", params: { id: data.id } })
}
</script>

<template>
  <div @click="toDetail" class="bg-white rounded-lg overflow-clip relative hover:scale-105 duration-200">
    <img class="object-cover aspect-[16/12]" :src="`${appImageProxy}${data.imageUrl}`" :alt="data.categoryName" />
    <div class="p-1">
      <span id="name" class="font-bold text-lg leading-none line-clamp-2">{{ data.categoryName }}</span>
      <p id="desc" class="italic leading-none --line-clamp --desc-text">
        {{ $filters.truncate(data.description, 10) }}
      </p>
    </div>
    <!-- <router-link v-if="$route.name === 'Categories'" :to="{ name: 'EditCategory', params: { id: data.id } }"> -->
    <button
      v-if="fromAdmin"
      @click="toEdit"
      class="absolute bottom-1 right-2 px-2 block bg-[#7066E0] text-gray-100 disabled:opacity-30 rounded-lg tracking-wider">
      Edit
    </button>
    <!-- </router-link> -->
  </div>
</template>

<style scoped>
.--desc-text {
  color: var(--desc-color, gray);
}
.--line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: var(--line-clamp-lines, 3); /* Use CSS Variables. Can Use Fallback. */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
