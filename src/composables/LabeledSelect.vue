<script setup>
// import { getValueAtPath } from "/src/filters"
import Labeled from "/src/composables/Labeled.vue"
defineProps(["list", "value", "optDescPath", "optValuePath"])
</script>

<template>
  <Labeled>
    <template v-slot:input="{ blurHandler }">
      <select :value="value" class="w-full px-2 h-[2.5rem] text-center rounded-md text-black" @change="blurHandler">
        <option v-for="(i, index) in list" :key="index" :value="$filters.getValueAtPath(i, optValuePath)">
          {{ $filters.getValueAtPath(i, optDescPath) }}
        </option>
      </select>
    </template>
  </Labeled>
</template>
