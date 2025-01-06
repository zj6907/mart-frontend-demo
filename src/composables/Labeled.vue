<script setup>
defineProps(["label"])
const emit = defineEmits()
</script>

<template>
  <div class="mt">
    <label class="px-2 py inline-block text-label">{{ label }} </label><br />
    <slot name="input" :blurHandler="(e) => emit('emit', e.target.value)" />
  </div>
</template>

<style scoped>
.mt {
  margin-top: var(--margin-top, 0.5rem);
}
.py {
  padding-top: var(--label-py, 1px);
  padding-bottom: var(--label-py, 1px);
}
.text-label {
  color: var(--label-color, #cccccc);
}
</style>
