<script setup>
import { ref } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  copiedLabel: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 2000
  },
  variant: {
    type: String,
    default: 'secondary',
    validator: (value) => ['primary', 'secondary', 'danger', 'warning', 'success'].includes(value)
  },
  size: {
    type: String,
    default: 'sm',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['copy', 'success', 'error'])

const copied = ref(false)
const copyTimeout = ref(null)

const copyToClipboard = async () => {
  if (props.disabled || copied.value) return

  emit('copy', props.text)

  try {
    await navigator.clipboard.writeText(props.text)
    copied.value = true
    emit('success', props.text)

    if (copyTimeout.value) clearTimeout(copyTimeout.value)

    copyTimeout.value = setTimeout(() => {
      copied.value = false
    }, props.duration)
  } catch (err) {
    emit('error', err)
    console.error('Failed to copy text: ', err)
  }
}
</script>

<template>
  <button
    class="ot-copy-button"
    :class="[
      `ot-copy-button--${variant}`,
      `ot-copy-button--${size}`,
      { 'ot-copy-button--copied': copied }
    ]"
    :disabled="disabled"
    type="button"
    @click="copyToClipboard"
  >
    <span class="ot-copy-button__icon-container">
      <Transition name="ot-copy-icon-fade" mode="out-in">
        <!-- Success State (Checkmark) -->
        <svg
          v-if="copied"
          key="check"
          class="ot-copy-button__icon ot-copy-button__icon--check"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>

        <!-- Default State (Copy Icon) -->
        <svg
          v-else
          key="copy"
          class="ot-copy-button__icon ot-copy-button__icon--copy"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </Transition>
    </span>

    <span v-if="label" class="ot-copy-button__label">
      {{ copied ? copiedLabel || label : label }}
    </span>
  </button>
</template>

<style scoped>
.ot-copy-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--ot-font-family);
  font-weight: 600;
  border: none;
  border-radius: var(--ot-radius-base, 8.7px);
  cursor: pointer;
  transition: all var(--ot-transition-base, 250ms) cubic-bezier(0.4, 0, 0.2, 1);
  gap: var(--ot-spacing-xs, 4px);
  position: relative;
  overflow: hidden;
}

.ot-copy-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ot-copy-button:active:not(:disabled) {
  transform: scale(0.95);
}

/* Icon Container */
.ot-copy-button__icon-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

.ot-copy-button__icon {
  color: inherit;
}

/* Label */
.ot-copy-button__label {
  font-size: var(--ot-font-sm, 14px);
  color: inherit;
}

/* Variants */
.ot-copy-button--primary {
  background-color: var(--ot-primary);
  color: var(--ot-white);
}
.ot-copy-button--primary:hover:not(:disabled) {
  background-color: var(--ot-primary-hover);
}

.ot-copy-button--secondary {
  background-color: var(--ot-bg-tertiary, #2a2c34);
  color: var(--ot-gray-100, #aab0b7);
  border: 1px solid var(--ot-gray-300, #2a2c34);
}
.ot-copy-button--secondary:hover:not(:disabled) {
  background-color: var(--ot-gray-300, #2a2c34);
  color: var(--ot-white);
}

.ot-copy-button--success {
  background-color: var(--ot-success);
  color: var(--ot-white);
}
.ot-copy-button--success:hover:not(:disabled) {
  background-color: var(--ot-success-hover);
}

.ot-copy-button--danger {
  background-color: var(--ot-danger);
  color: var(--ot-white);
}

.ot-copy-button--warning {
  background-color: var(--ot-warning);
  color: var(--ot-gray-500);
}

/* Success Copied States */
.ot-copy-button--copied.ot-copy-button--secondary {
  background-color: rgba(45, 202, 140, 0.15);
  color: var(--ot-success, #2dca8c);
  border-color: var(--ot-success, #2dca8c);
}

.ot-copy-button--copied.ot-copy-button--primary {
  background-color: var(--ot-success, #2dca8c);
}

/* Sizes */
.ot-copy-button--sm {
  padding: 6px 12px;
  font-size: var(--ot-font-xs, 12px);
  min-height: 32px;
}

.ot-copy-button--md {
  padding: 8px 16px;
  font-size: var(--ot-font-sm, 14px);
  min-height: 38px;
}

.ot-copy-button--lg {
  padding: 10px 20px;
  font-size: var(--ot-font-base, 16px);
  min-height: 44px;
}

/* Transitions */
.ot-copy-icon-fade-enter-active,
.ot-copy-icon-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.ot-copy-icon-fade-enter-from {
  opacity: 0;
  transform: scale(0.5) rotate(-45deg);
}

.ot-copy-icon-fade-leave-to {
  opacity: 0;
  transform: scale(0.5) rotate(45deg);
}
</style>
