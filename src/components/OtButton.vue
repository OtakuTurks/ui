<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger', 'warning', 'success'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  startIcon: {
    type: [String, Object],
    default: null
  },
  endIcon: {
    type: [String, Object],
    default: null
  }
})

defineEmits(['click'])
</script>

<template>
  <button
    class="ot-button"
    :class="[`ot-button--${variant}`, `ot-button--${size}`, { 'ot-button--full-width': fullWidth }]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <span v-if="startIcon" class="ot-button__icon ot-button__icon--start">
      <component v-if="typeof startIcon === 'object'" :is="startIcon" />
      <span v-else v-html="startIcon"></span>
    </span>
    <span class="ot-button__label">
      <slot />
    </span>
    <span v-if="endIcon" class="ot-button__icon ot-button__icon--end">
      <component v-if="typeof endIcon === 'object'" :is="endIcon" />
      <span v-else v-html="endIcon"></span>
    </span>
  </button>
</template>

<style scoped>
.ot-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--ot-font-family);
  font-weight: 600;
  border: none;
  border-radius: var(--ot-radius-base);
  cursor: pointer;
  transition: all var(--ot-transition-base);
  gap: var(--ot-spacing-sm);
}

.ot-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ot-button:active:not(:disabled) {
  transform: scale(0.95);
}

.ot-button--full-width {
  width: 100%;
}

/* Variants */
.ot-button--primary {
  background-color: var(--ot-primary);
  color: var(--ot-white);
}

.ot-button--primary:hover:not(:disabled) {
  background-color: var(--ot-primary-hover);
}

.ot-button--secondary {
  background-color: var(--ot-gray-400);
  color: var(--ot-gray-200);
}

.ot-button--secondary:hover:not(:disabled) {
  background-color: var(--ot-gray-300);
}

.ot-button--danger {
  background-color: var(--ot-danger);
  color: var(--ot-white);
}

.ot-button--danger:hover:not(:disabled) {
  background-color: var(--ot-danger-hover);
}

.ot-button--warning {
  background-color: var(--ot-warning);
  color: var(--ot-gray-500);
}

.ot-button--warning:hover:not(:disabled) {
  background-color: var(--ot-warning-hover);
}

.ot-button--success {
  background-color: var(--ot-success);
  color: var(--ot-white);
}

.ot-button--success:hover:not(:disabled) {
  background-color: var(--ot-success-hover);
}

/* Sizes */
.ot-button--sm {
  padding: 6px 12px;
  font-size: var(--ot-font-sm);
  min-height: 32px;
}

.ot-button--md {
  padding: 10px 16px;
  font-size: var(--ot-font-sm);
  min-height: 42px;
}

.ot-button--lg {
  padding: 12px 24px;
  font-size: var(--ot-font-base);
  min-height: 48px;
}

/* Icon */
.ot-button__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.ot-button__icon--start {
  margin-right: var(--ot-spacing-xs);
}

.ot-button__icon--end {
  margin-left: var(--ot-spacing-xs);
}

.ot-button__label {
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
}
</style>
