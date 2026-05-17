<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
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

const select = (option) => {
  if (props.disabled) return
  const value = typeof option === 'object' ? option.value : option
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <div
    class="ot-radio-group"
    :class="[`ot-radio-group--${direction}`, { 'ot-radio-group--disabled': disabled }]"
    role="radiogroup"
  >
    <label
      v-for="(option, index) in options"
      :key="index"
      class="ot-radio-group__item"
      :class="{
        'ot-radio-group__item--checked':
          modelValue === (typeof option === 'object' ? option.value : option),
        'ot-radio-group__item--disabled':
          disabled || (typeof option === 'object' && option.disabled)
      }"
    >
      <input
        type="radio"
        class="ot-radio-group__input"
        :name="name"
        :value="typeof option === 'object' ? option.value : option"
        :checked="modelValue === (typeof option === 'object' ? option.value : option)"
        :disabled="disabled || (typeof option === 'object' && option.disabled)"
        @change="select(option)"
      />
      <span class="ot-radio-group__radio">
        <span class="ot-radio-group__dot"></span>
      </span>
      <span class="ot-radio-group__label">
        {{ typeof option === 'object' ? option.label : option }}
      </span>
    </label>
  </div>
</template>

<style scoped>
.ot-radio-group {
  display: flex;
  gap: var(--ot-spacing-sm);
}

.ot-radio-group--vertical {
  flex-direction: column;
}

.ot-radio-group--horizontal {
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--ot-spacing-md);
}

.ot-radio-group--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ot-radio-group__item {
  display: inline-flex;
  align-items: center;
  gap: var(--ot-spacing-sm);
  cursor: pointer;
  user-select: none;
}

.ot-radio-group__item--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.ot-radio-group__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.ot-radio-group__radio {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: 2px solid var(--ot-gray-100);
  border-radius: var(--ot-radius-full);
  background-color: transparent;
  transition: all var(--ot-transition-fast);
  flex-shrink: 0;
}

.ot-radio-group__item--checked .ot-radio-group__radio {
  border-color: var(--ot-primary);
}

.ot-radio-group__item:not(.ot-radio-group__item--disabled):hover .ot-radio-group__radio {
  border-color: var(--ot-primary);
}

.ot-radio-group__dot {
  width: 8px;
  height: 8px;
  border-radius: var(--ot-radius-full);
  background-color: var(--ot-primary);
  transform: scale(0);
  transition: transform var(--ot-transition-fast);
}

.ot-radio-group__item--checked .ot-radio-group__dot {
  transform: scale(1);
}

.ot-radio-group__label {
  font-size: var(--ot-font-sm);
  color: var(--ot-gray-200);
}
</style>
