<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button
    class="ot-button"
    :class="[`ot-button--${variant}`, `ot-button--${size}`]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
.ot-button {
  font-family: inherit;
  font-weight: 500;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.ot-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Variants */
.ot-button--primary {
  background-color: #42b883;
  color: white;
}

.ot-button--primary:hover:not(:disabled) {
  background-color: #35a070;
}

.ot-button--secondary {
  background-color: #f1f1f1;
  color: #333;
}

.ot-button--secondary:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.ot-button--outline {
  background-color: transparent;
  color: #42b883;
  border: 2px solid #42b883;
}

.ot-button--outline:hover:not(:disabled) {
  background-color: #42b883;
  color: white;
}

/* Sizes */
.ot-button--small {
  padding: 6px 12px;
  font-size: 12px;
}

.ot-button--medium {
  padding: 10px 20px;
  font-size: 14px;
}

.ot-button--large {
  padding: 14px 28px;
  font-size: 16px;
}
</style>
