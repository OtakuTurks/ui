<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => ['', ''],
    validator: (value) => Array.isArray(value) && value.length === 2
  },
  placeholder: {
    type: Array,
    default: () => ['Start date', 'End date']
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

const startDate = computed(() => props.modelValue[0] || '')
const endDate = computed(() => props.modelValue[1] || '')

const handleStartChange = (value) => {
  emit('update:modelValue', [value, props.modelValue[1]])
  emit('change', [value, props.modelValue[1]])
}

const handleEndChange = (value) => {
  emit('update:modelValue', [props.modelValue[0], value])
  emit('change', [props.modelValue[0], value])
}
</script>

<template>
  <div
    class="ot-date-range"
    :class="[
      `ot-date-range--${size}`,
      {
        'ot-date-range--disabled': disabled,
        'ot-date-range--error': error,
        'ot-date-range--full-width': fullWidth
      }
    ]"
  >
    <div class="ot-date-range__input ot-date-range__input--start">
      <input
        type="date"
        class="ot-date-range__native"
        :value="startDate"
        :placeholder="placeholder[0]"
        :disabled="disabled"
        :min="min"
        :max="endDate || max"
        @input="handleStartChange($event.target.value)"
      />
      <svg
        class="ot-date-range__icon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"
        />
      </svg>
    </div>
    <span class="ot-date-range__separator">-</span>
    <div class="ot-date-range__input ot-date-range__input--end">
      <input
        type="date"
        class="ot-date-range__native"
        :value="endDate"
        :placeholder="placeholder[1]"
        :disabled="disabled"
        :min="startDate || min"
        :max="max"
        @input="handleEndChange($event.target.value)"
      />
      <svg
        class="ot-date-range__icon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.ot-date-range {
  display: inline-flex;
  align-items: center;
  background-color: var(--ot-gray-400);
  color: var(--ot-gray-200);
  border-radius: var(--ot-radius-base);
  transition: box-shadow var(--ot-transition-base);
}

.ot-date-range--full-width {
  width: 100%;
}

.ot-date-range--error {
  box-shadow: 0 0 0 2px var(--ot-danger);
}

.ot-date-range--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ot-date-range--disabled * {
  cursor: not-allowed;
}

.ot-date-range__input {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
}

.ot-date-range__native {
  width: 100%;
  appearance: none;
  background: transparent;
  border: none;
  color: var(--ot-gray-200);
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  outline: none;
  padding-right: 32px;
}

.ot-date-range__native::-webkit-calendar-picker-indicator {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.ot-date-range__icon {
  position: absolute;
  right: 8px;
  pointer-events: none;
  color: var(--ot-gray-100);
}

.ot-date-range__separator {
  padding: 0 var(--ot-spacing-xs);
  color: var(--ot-gray-100);
  font-weight: 500;
}

/* Sizes */
.ot-date-range--sm {
  min-height: 32px;
  padding: 6px 8px;
  font-size: var(--ot-font-sm);
}

.ot-date-range--md {
  min-height: 42px;
  padding: 8px 12px;
  font-size: var(--ot-font-sm);
}

.ot-date-range--lg {
  min-height: 48px;
  padding: 10px 16px;
  font-size: var(--ot-font-base);
}

/* Focus state */
.ot-date-range:focus-within:not(.ot-date-range--disabled):not(.ot-date-range--error) {
  box-shadow: 0 0 0 2px var(--ot-primary);
}
</style>
