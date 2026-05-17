<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div
    class="ot-input-group"
    :class="[`ot-input-group--${size}`, { 'ot-input-group--full-width': fullWidth }]"
  >
    <slot />
  </div>
</template>

<style scoped>
.ot-input-group {
  display: inline-flex;
  align-items: stretch;
  gap: 0;
}

.ot-input-group--full-width {
  width: 100%;
}

.ot-input-group :deep(.ot-input) {
  border-radius: 0;
  flex: 1;
}

.ot-input-group :deep(.ot-input:first-child) {
  border-radius: var(--ot-radius-base) 0 0 var(--ot-radius-base);
}

.ot-input-group :deep(.ot-input:last-child) {
  border-radius: 0 var(--ot-radius-base) var(--ot-radius-base) 0;
}

.ot-input-group :deep(.ot-button) {
  border-radius: 0;
}

.ot-input-group :deep(.ot-button:first-child) {
  border-radius: var(--ot-radius-base) 0 0 var(--ot-radius-base);
}

.ot-input-group :deep(.ot-button:last-child) {
  border-radius: 0 var(--ot-radius-base) var(--ot-radius-base) 0;
}

.ot-input-group__addon {
  display: flex;
  align-items: center;
  padding: 0 var(--ot-spacing-md);
  background-color: var(--ot-gray-500);
  color: var(--ot-gray-100);
  font-size: var(--ot-font-sm);
  border: 1px solid var(--ot-gray-300);
  white-space: nowrap;
}

.ot-input-group__addon:first-child {
  border-radius: var(--ot-radius-base) 0 0 var(--ot-radius-base);
  border-right: none;
}

.ot-input-group__addon:last-child {
  border-radius: 0 var(--ot-radius-base) var(--ot-radius-base) 0;
  border-left: none;
}

/* Sizes */
.ot-input-group--sm .ot-input-group__addon {
  font-size: var(--ot-font-xs);
  padding: 0 var(--ot-spacing-sm);
}

.ot-input-group--lg .ot-input-group__addon {
  font-size: var(--ot-font-base);
  padding: 0 var(--ot-spacing-lg);
}
</style>
