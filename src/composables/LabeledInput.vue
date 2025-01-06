<script setup>
import Labeled from "/src/composables/Labeled.vue"
defineProps(["value", "type", "step", "min", "placeHolder"])
</script>

<template>
  <Labeled>
    <template v-slot:input="{ blurHandler }">
      <input
        class="w-full px-2 customHeight rounded-md text-black"
        :value="value"
        :type="type ?? 'text'"
        :step="step"
        :min="min"
        :placeholder="placeHolder"
        @blur="blurHandler" />
    </template>
  </Labeled>
</template>

<style scoped>
@tailwind components;
@layer components {
  .customHeight {
    height: var(--input-height, 2rem);
  }
}
</style>
