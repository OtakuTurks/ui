<script setup>
import { ref, provide } from 'vue'

const props = defineProps({
  multiple: {
    type: Boolean,
    default: false
  }
})

const activeItems = ref(new Set())

const toggleItem = (name) => {
  if (props.multiple) {
    if (activeItems.value.has(name)) {
      activeItems.value.delete(name)
    } else {
      activeItems.value.add(name)
    }
  } else {
    if (activeItems.value.has(name)) {
      activeItems.value.clear()
    } else {
      activeItems.value.clear()
      activeItems.value.add(name)
    }
  }
}

provide('otAccordion', {
  activeItems,
  toggleItem
})
</script>

<template>
  <div class="ot-accordion">
    <slot />
  </div>
</template>

<style scoped>
.ot-accordion {
  display: flex;
  flex-direction: column;
  gap: var(--ot-spacing-xs, 8px);
  width: 100%;
}
</style>
