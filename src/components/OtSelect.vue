<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    default: () => []
    // [{ label: String, value: Any, disabled?: Boolean }]
  },
  placeholder: {
    type: String,
    default: 'Select...'
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
  clearable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const handleChange = (event) => {
  const value = event.target.value
  emit('update:modelValue', value)
  emit('change', value)
}

const clear = () => {
  emit('update:modelValue', '')
  emit('change', '')
}
</script>

<template>
  <div
    class="ot-select"
    :class="[
      `ot-select--${size}`,
      {
        'ot-select--disabled': disabled,
        'ot-select--error': error,
        'ot-select--full-width': fullWidth,
        'ot-select--clearable': clearable && modelValue
      }
    ]"
  >
    <select
      class="ot-select__native"
      :value="modelValue"
      :disabled="disabled"
      @change="handleChange"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="typeof option === 'object' ? option.value : option"
        :disabled="typeof option === 'object' && option.disabled"
      >
        {{ typeof option === 'object' ? option.label : option }}
      </option>
    </select>
    <div class="ot-select__icon">
      <svg
        v-if="!(clearable && modelValue)"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M7 10l5 5 5-5z" />
      </svg>
      <button
        v-else
        type="button"
        class="ot-select__clear"
        @click.stop.prevent="clear"
        tabindex="-1"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.ot-select {
  display: inline-flex;
  align-items: center;
  position: relative;
  background-color: var(--ot-gray-400);
  color: var(--ot-gray-200);
  border-radius: var(--ot-radius-base);
  transition: box-shadow var(--ot-transition-base);
}

.ot-select--full-width {
  width: 100%;
}

.ot-select--error {
  box-shadow: 0 0 0 2px var(--ot-danger);
}

.ot-select--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ot-select--disabled * {
  cursor: not-allowed;
}

.ot-select__native {
  width: 100%;
  appearance: none;
  background: transparent;
  border: none;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  outline: none;
  padding-right: 36px;
}

.ot-select__native option {
  background-color: var(--ot-gray-400);
  color: var(--ot-gray-200);
}

.ot-select__icon {
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  color: var(--ot-gray-100);
}

.ot-select__clear {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--ot-gray-100);
  pointer-events: auto;
  transition: color var(--ot-transition-fast);
  display: flex;
}

.ot-select__clear:hover {
  color: var(--ot-gray-200);
}

/* Sizes */
.ot-select--sm {
  min-height: 32px;
  padding: 6px 12px;
  font-size: var(--ot-font-sm);
}

.ot-select--md {
  min-height: 42px;
  padding: 8px 16px;
  font-size: var(--ot-font-sm);
}

.ot-select--lg {
  min-height: 48px;
  padding: 10px 20px;
  font-size: var(--ot-font-base);
}

/* Focus state */
.ot-select:focus-within:not(.ot-select--disabled):not(.ot-select--error) {
  box-shadow: 0 0 0 2px var(--ot-primary);
}
</style>
