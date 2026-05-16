<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value)
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
  ariaLabel: {
    type: String,
    required: true
  }
})

defineEmits(['click'])
</script>

<template>
  <button
    class="ot-icon-button"
    :class="[`ot-icon-button--${variant}`, `ot-icon-button--${size}`]"
    :disabled="disabled"
    :aria-label="ariaLabel"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<style scoped>
.ot-icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--ot-radius-full);
  cursor: pointer;
  transition: all var(--ot-transition-base);
  padding: 0;
}

.ot-icon-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ot-icon-button:active:not(:disabled) {
  transform: scale(0.9);
}

/* Variants */
.ot-icon-button--primary {
  background-color: var(--ot-primary);
  color: var(--ot-white);
}

.ot-icon-button--primary:hover:not(:disabled) {
  background-color: var(--ot-primary-hover);
}

.ot-icon-button--secondary {
  background-color: var(--ot-gray-400);
  color: var(--ot-gray-200);
}

.ot-icon-button--secondary:hover:not(:disabled) {
  background-color: var(--ot-gray-300);
}

.ot-icon-button--danger {
  background-color: var(--ot-danger);
  color: var(--ot-white);
}

.ot-icon-button--danger:hover:not(:disabled) {
  background-color: var(--ot-danger-hover);
}

/* Sizes */
.ot-icon-button--sm {
  width: 30px;
  height: 30px;
}

.ot-icon-button--md {
  width: 40px;
  height: 40px;
}

.ot-icon-button--lg {
  width: 48px;
  height: 48px;
}
</style>
