<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Boolean, Array],
    default: false
  },
  value: {
    type: [String, Number, Boolean],
    default: null
  },
  label: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  indeterminate: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value)
  }
  return props.modelValue
})

const toggle = () => {
  if (props.disabled) return
  
  if (Array.isArray(props.modelValue)) {
    const newValue = [...props.modelValue]
    if (isChecked.value) {
      const index = newValue.indexOf(props.value)
      newValue.splice(index, 1)
    } else {
      newValue.push(props.value)
    }
    emit('update:modelValue', newValue)
  } else {
    emit('update:modelValue', !props.modelValue)
  }
}
</script>

<template>
  <label
    class="ot-checkbox"
    :class="{
      'ot-checkbox--disabled': disabled,
      'ot-checkbox--checked': isChecked,
      'ot-checkbox--indeterminate': indeterminate
    }"
  >
    <input
      type="checkbox"
      class="ot-checkbox__input"
      :checked="isChecked"
      :disabled="disabled"
      :indeterminate="indeterminate"
      @change="toggle"
    />
    <span class="ot-checkbox__box">
      <svg v-if="indeterminate" class="ot-checkbox__icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 13H5v-2h14v2z" />
      </svg>
      <svg v-else-if="isChecked" class="ot-checkbox__icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
      </svg>
    </span>
    <span v-if="label" class="ot-checkbox__label">{{ label }}</span>
  </label>
</template>

<style scoped>
.ot-checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--ot-spacing-sm);
  cursor: pointer;
  user-select: none;
}

.ot-checkbox--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ot-checkbox__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.ot-checkbox__box {
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

.ot-checkbox--checked .ot-checkbox__box {
  background-color: var(--ot-primary);
  border-color: var(--ot-primary);
}

.ot-checkbox--indeterminate .ot-checkbox__box {
  background-color: var(--ot-primary);
  border-color: var(--ot-primary);
}

.ot-checkbox:not(.ot-checkbox--disabled):hover .ot-checkbox__box {
  border-color: var(--ot-primary);
}

.ot-checkbox__icon {
  width: 14px;
  height: 14px;
  color: var(--ot-white);
}

.ot-checkbox__label {
  color: var(--ot-gray-200);
  font-size: var(--ot-font-sm);
}
</style>
