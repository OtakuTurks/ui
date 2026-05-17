<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  options: {
    type: Array,
    default: () => []
    // [{ label: String, value: Any, disabled?: Boolean }]
  },
  name: {
    type: String,
    default: ''
  },
  direction: {
    type: String,
    default: 'vertical',
    validator: (value) => ['horizontal', 'vertical'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const isChecked = (value) => {
  return props.modelValue.includes(value)
}

const toggle = (option) => {
  const value = typeof option === 'object' ? option.value : option
  const newValue = [...props.modelValue]

  if (isChecked(value)) {
    const index = newValue.indexOf(value)
    newValue.splice(index, 1)
  } else {
    newValue.push(value)
  }

  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<template>
  <div
    class="ot-checkbox-group"
    :class="[`ot-checkbox-group--${direction}`, { 'ot-checkbox-group--disabled': disabled }]"
    role="group"
  >
    <label
      v-for="(option, index) in options"
      :key="index"
      class="ot-checkbox-group__item"
      :class="{
        'ot-checkbox-group__item--checked': isChecked(
          typeof option === 'object' ? option.value : option
        ),
        'ot-checkbox-group__item--disabled':
          disabled || (typeof option === 'object' && option.disabled)
      }"
    >
      <input
        type="checkbox"
        class="ot-checkbox-group__input"
        :name="name"
        :value="typeof option === 'object' ? option.value : option"
        :checked="isChecked(typeof option === 'object' ? option.value : option)"
        :disabled="disabled || (typeof option === 'object' && option.disabled)"
        @change="toggle(option)"
      />
      <span class="ot-checkbox-group__checkbox">
        <svg
          v-if="isChecked(typeof option === 'object' ? option.value : option)"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      </span>
      <span class="ot-checkbox-group__label">
        {{ typeof option === 'object' ? option.label : option }}
      </span>
    </label>
  </div>
</template>

<style scoped>
.ot-checkbox-group {
  display: flex;
  gap: var(--ot-spacing-sm);
}

.ot-checkbox-group--vertical {
  flex-direction: column;
}

.ot-checkbox-group--horizontal {
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--ot-spacing-md);
}

.ot-checkbox-group--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ot-checkbox-group__item {
  display: inline-flex;
  align-items: center;
  gap: var(--ot-spacing-sm);
  cursor: pointer;
  user-select: none;
}

.ot-checkbox-group__item--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.ot-checkbox-group__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.ot-checkbox-group__checkbox {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: 2px solid var(--ot-gray-100);
  border-radius: var(--ot-radius-sm);
  background-color: transparent;
  transition: all var(--ot-transition-fast);
  flex-shrink: 0;
}

.ot-checkbox-group__item--checked .ot-checkbox-group__checkbox {
  background-color: var(--ot-primary);
  border-color: var(--ot-primary);
}

.ot-checkbox-group__item:not(.ot-checkbox-group__item--disabled):hover
  .ot-checkbox-group__checkbox {
  border-color: var(--ot-primary);
}

.ot-checkbox-group__checkbox svg {
  color: var(--ot-white);
}

.ot-checkbox-group__label {
  font-size: var(--ot-font-sm);
  color: var(--ot-gray-200);
}
</style>
