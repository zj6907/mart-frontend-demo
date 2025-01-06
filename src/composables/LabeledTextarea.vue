<script setup>
import Labeled from "/src/composables/Labeled.vue"
defineProps(["value"])
</script>

<template>
  <Labeled>
    <template v-slot:input="{ blurHandler }">
      <textarea class="w-full px-2 pt-2 h-[4rem] rounded-md text-black" :value="value" @blur="blurHandler" />
    </template>
  </Labeled>
</template>
