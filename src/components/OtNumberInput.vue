<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  min: {
    type: Number,
    default: -Infinity
  },
  max: {
    type: Number,
    default: Infinity
  },
  step: {
    type: Number,
    default: 1
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
  controls: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const currentValue = computed(() => props.modelValue)

const canDecrement = computed(() => currentValue.value > props.min)
const canIncrement = computed(() => currentValue.value < props.max)

const increment = () => {
  if (props.disabled || !canIncrement.value) return
  const newValue = Math.min(currentValue.value + props.step, props.max)
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

const decrement = () => {
  if (props.disabled || !canDecrement.value) return
  const newValue = Math.max(currentValue.value - props.step, props.min)
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

const handleInput = (event) => {
  const value = parseFloat(event.target.value)
  if (!isNaN(value)) {
    const clampedValue = Math.max(props.min, Math.min(props.max, value))
    emit('update:modelValue', clampedValue)
    emit('change', clampedValue)
  }
}
</script>

<template>
  <div
    class="ot-number-input"
    :class="[
      `ot-number-input--${size}`,
      {
        'ot-number-input--disabled': disabled,
        'ot-number-input--error': error,
        'ot-number-input--full-width': fullWidth
      }
    ]"
  >
    <button
      v-if="controls"
      type="button"
      class="ot-number-input__btn ot-number-input__btn--decrement"
      :disabled="disabled || !canDecrement"
      @click="decrement"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 13H5v-2h14v2z" />
      </svg>
    </button>
    <input
      type="number"
      class="ot-number-input__field"
      :value="currentValue"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      @input="handleInput"
    />
    <button
      v-if="controls"
      type="button"
      class="ot-number-input__btn ot-number-input__btn--increment"
      :disabled="disabled || !canIncrement"
      @click="increment"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.ot-number-input {
  display: inline-flex;
  align-items: center;
  background-color: var(--ot-gray-400);
  color: var(--ot-gray-200);
  border-radius: var(--ot-radius-base);
  transition: box-shadow var(--ot-transition-base);
}

.ot-number-input--full-width {
  width: 100%;
}

.ot-number-input--error {
  box-shadow: 0 0 0 2px var(--ot-danger);
}

.ot-number-input--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ot-number-input--disabled * {
  cursor: not-allowed;
}

.ot-number-input__field {
  flex: 1;
  border: none;
  background: transparent;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  text-align: center;
  outline: none;
  width: 80px;
  -moz-appearance: textfield;
}

.ot-number-input__field::-webkit-outer-spin-button,
.ot-number-input__field::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.ot-number-input__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--ot-gray-100);
  cursor: pointer;
  transition: all var(--ot-transition-fast);
  padding: 0 12px;
}

.ot-number-input__btn:hover:not(:disabled) {
  color: var(--ot-primary);
  background-color: var(--ot-gray-300);
}

.ot-number-input__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Sizes */
.ot-number-input--sm {
  min-height: 32px;
  font-size: var(--ot-font-sm);
}

.ot-number-input--md {
  min-height: 42px;
  font-size: var(--ot-font-sm);
}

.ot-number-input--lg {
  min-height: 48px;
  font-size: var(--ot-font-base);
}

/* Focus state */
.ot-number-input:focus-within:not(.ot-number-input--disabled):not(.ot-number-input--error) {
  box-shadow: 0 0 0 2px var(--ot-primary);
}
</style>
