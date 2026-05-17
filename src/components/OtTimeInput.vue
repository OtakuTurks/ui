<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Select time'
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
  },
  step: {
    type: Number,
    default: 60
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
    class="ot-time-input"
    :class="[
      `ot-time-input--${size}`,
      {
        'ot-time-input--disabled': disabled,
        'ot-time-input--error': error,
        'ot-time-input--full-width': fullWidth,
        'ot-time-input--has-value': modelValue
      }
    ]"
  >
    <input
      type="time"
      class="ot-time-input__native"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :min="min"
      :max="max"
      :step="step"
      @input="handleInput"
    />
    <div class="ot-time-input__icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.ot-time-input {
  display: inline-flex;
  align-items: center;
  position: relative;
  background-color: var(--ot-gray-400);
  color: var(--ot-gray-200);
  border-radius: var(--ot-radius-base);
  transition: box-shadow var(--ot-transition-base);
}

.ot-time-input--full-width {
  width: 100%;
}

.ot-time-input--error {
  box-shadow: 0 0 0 2px var(--ot-danger);
}

.ot-time-input--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ot-time-input--disabled * {
  cursor: not-allowed;
}

.ot-time-input__native {
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

.ot-time-input__native::-webkit-calendar-picker-indicator {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.ot-time-input__native::-webkit-datetime-edit {
  padding: 0;
}

.ot-time-input__native::-webkit-datetime-edit-fields-wrapper {
  color: var(--ot-gray-200);
}

.ot-time-input:not(.ot-time-input--has-value)
  .ot-time-input__native::-webkit-datetime-edit-fields-wrapper {
  color: var(--ot-gray-100);
}

.ot-time-input__icon {
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  color: var(--ot-gray-100);
}

/* Sizes */
.ot-time-input--sm {
  min-height: 32px;
  padding: 6px 12px;
  font-size: var(--ot-font-sm);
}

.ot-time-input--md {
  min-height: 42px;
  padding: 8px 16px;
  font-size: var(--ot-font-sm);
}

.ot-time-input--lg {
  min-height: 48px;
  padding: 10px 20px;
  font-size: var(--ot-font-base);
}

/* Focus state */
.ot-time-input:focus-within:not(.ot-time-input--disabled):not(.ot-time-input--error) {
  box-shadow: 0 0 0 2px var(--ot-primary);
}
</style>
