<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'warning', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  removable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['remove'])
</script>

<template>
  <span
    class="ot-tag"
    :class="[`ot-tag--${variant}`, `ot-tag--${size}`]"
  >
    <slot />
    <button
      v-if="removable"
      class="ot-tag__remove"
      @click.stop="$emit('remove')"
      aria-label="Remove"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    </button>
  </span>
</template>

<style scoped>
.ot-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--ot-spacing-xs);
  border-radius: var(--ot-radius-sm);
  font-weight: 500;
  border: 1px solid;
}

/* Variants */
.ot-tag--primary {
  background-color: rgba(55, 125, 255, 0.1);
  border-color: var(--ot-primary);
  color: var(--ot-primary);
}

.ot-tag--secondary {
  background-color: rgba(170, 176, 183, 0.1);
  border-color: var(--ot-gray-100);
  color: var(--ot-gray-100);
}

.ot-tag--success {
  background-color: rgba(45, 202, 140, 0.1);
  border-color: var(--ot-success);
  color: var(--ot-success);
}

.ot-tag--warning {
  background-color: rgba(255, 190, 61, 0.1);
  border-color: var(--ot-warning);
  color: var(--ot-warning);
}

.ot-tag--danger {
  background-color: rgba(255, 113, 91, 0.1);
  border-color: var(--ot-danger);
  color: var(--ot-danger);
}

/* Sizes */
.ot-tag--sm {
  padding: 2px 8px;
  font-size: var(--ot-font-xs);
}

.ot-tag--md {
  padding: 4px 12px;
  font-size: var(--ot-font-sm);
}

.ot-tag--lg {
  padding: 6px 16px;
  font-size: var(--ot-font-sm);
}

.ot-tag__remove {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  display: flex;
  opacity: 0.6;
  transition: opacity var(--ot-transition-fast);
  margin-left: var(--ot-spacing-xs);
}

.ot-tag__remove:hover {
  opacity: 1;
}
</style>