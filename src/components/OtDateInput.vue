<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Select date'
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
  error: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  min: {
    type: String,
    default: ''
  },
  max: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
  emit('change', event.target.value)
}
</script>

<template>
  <div
    class="ot-date-input"
    :class="[
      `ot-date-input--${size}`,
      {
        'ot-date-input--disabled': disabled,
        'ot-date-input--error': error,
        'ot-date-input--full-width': fullWidth,
        'ot-date-input--has-value': modelValue
      }
    ]"
  >
    <input
      type="date"
      class="ot-date-input__native"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :min="min"
      :max="max"
      @input="handleInput"
    />
    <div class="ot-date-input__icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.ot-date-input {
  display: inline-flex;
  align-items: center;
  position: relative;
  background-color: var(--ot-gray-400);
  color: var(--ot-gray-200);
  border-radius: var(--ot-radius-base);
  transition: box-shadow var(--ot-transition-base);
}

.ot-date-input--full-width {
  width: 100%;
}

.ot-date-input--error {
  box-shadow: 0 0 0 2px var(--ot-danger);
}

.ot-date-input--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ot-date-input--disabled * {
  cursor: not-allowed;
}

.ot-date-input__native {
  width: 100%;
  appearance: none;
  background: transparent;
  border: none;
  color: var(--ot-gray-200);
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  outline: none;
  padding-right: 40px;
}

.ot-date-input__native::-webkit-calendar-picker-indicator {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.ot-date-input__native::-webkit-datetime-edit {
  padding: 0;
}

.ot-date-input__native::-webkit-datetime-edit-fields-wrapper {
  color: var(--ot-gray-200);
}

.ot-date-input:not(.ot-date-input--has-value)
  .ot-date-input__native::-webkit-datetime-edit-fields-wrapper {
  color: var(--ot-gray-100);
}

.ot-date-input__icon {
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  color: var(--ot-gray-100);
}

/* Sizes */
.ot-date-input--sm {
  min-height: 32px;
  padding: 6px 12px;
  font-size: var(--ot-font-sm);
}

.ot-date-input--md {
  min-height: 42px;
  padding: 8px 16px;
  font-size: var(--ot-font-sm);
}

.ot-date-input--lg {
  min-height: 48px;
  padding: 10px 20px;
  font-size: var(--ot-font-base);
}

/* Focus state */
.ot-date-input:focus-within:not(.ot-date-input--disabled):not(.ot-date-input--error) {
  box-shadow: 0 0 0 2px var(--ot-primary);
}
</style>
