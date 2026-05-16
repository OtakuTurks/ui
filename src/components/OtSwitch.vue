<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue'])

const toggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}
</script>

<template>
  <label
    class="ot-switch"
    :class="[
      `ot-switch--${size}`,
      {
        'ot-switch--disabled': disabled,
        'ot-switch--checked': modelValue
      }
    ]"
  >
    <input
      type="checkbox"
      class="ot-switch__input"
      :checked="modelValue"
      :disabled="disabled"
      @change="toggle"
    />
    <span class="ot-switch__track">
      <span class="ot-switch__thumb"></span>
    </span>
    <span v-if="label" class="ot-switch__label">{{ label }}</span>
  </label>
</template>

<style scoped>
.ot-switch {
  display: inline-flex;
  align-items: center;
  gap: var(--ot-spacing-sm);
  cursor: pointer;
  user-select: none;
}

.ot-switch--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ot-switch__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.ot-switch__track {
  position: relative;
  background-color: var(--ot-gray-300);
  border-radius: var(--ot-radius-full);
  transition: background-color var(--ot-transition-base);
}

/* Sizes */
.ot-switch--sm .ot-switch__track {
  width: 28px;
  height: 16px;
}

.ot-switch--md .ot-switch__track {
  width: 36px;
  height: 20px;
}

.ot-switch--lg .ot-switch__track {
  width: 44px;
  height: 24px;
}

.ot-switch--checked .ot-switch__track {
  background-color: var(--ot-primary);
}

.ot-switch:not(.ot-switch--disabled):hover .ot-switch__track {
  background-color: var(--ot-gray-400);
}

.ot-switch--checked:not(.ot-switch--disabled):hover .ot-switch__track {
  background-color: var(--ot-primary-hover);
}

.ot-switch__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  background-color: var(--ot-white);
  border-radius: var(--ot-radius-full);
  transition: transform var(--ot-transition-base);
  box-shadow: var(--ot-shadow-sm);
}

/* Thumb sizes */
.ot-switch--sm .ot-switch__thumb {
  width: 12px;
  height: 12px;
}

.ot-switch--md .ot-switch__thumb {
  width: 16px;
  height: 16px;
}

.ot-switch--lg .ot-switch__thumb {
  width: 20px;
  height: 20px;
}

.ot-switch--checked .ot-switch__thumb {
  transform: translateX(100%);
  transform: translateX(calc(100% - 4px));
}

.ot-switch__label {
  color: var(--ot-gray-200);
  font-size: var(--ot-font-sm);
}
</style>
