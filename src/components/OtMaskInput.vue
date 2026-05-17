<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  mask: {
    type: String,
    default: ''
    // Format: '###-##-####', '+## ### ### ## ##', etc.
  },
  placeholder: {
    type: String,
    default: ''
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
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'focus', 'blur'])

const inputRef = ref(null)
const isFocused = ref(false)

const maskChars = {
  '#': /[0-9]/,
  A: /[A-Za-z]/,
  N: /[0-9A-Za-z]/,
  '*': /./
}

const parseMask = (mask, value) => {
  let result = ''
  let valueIndex = 0

  for (let i = 0; i < mask.length && valueIndex < value.length; i++) {
    const maskChar = mask[i]
    const charPattern = maskChars[maskChar]

    if (charPattern) {
      if (charPattern.test(value[valueIndex])) {
        result += value[valueIndex]
        valueIndex++
      } else {
        valueIndex++
        i--
      }
    } else {
      result += maskChar
    }
  }

  return result
}

const formatValue = (value) => {
  const cleanValue = value.replace(/[^\w]/g, '')
  return parseMask(props.mask, cleanValue)
}

const displayValue = computed(() => {
  if (props.modelValue) {
    return formatValue(props.modelValue)
  }
  return ''
})

const handleInput = (event) => {
  const rawValue = event.target.value
  const cleanValue = rawValue.replace(/[^\w]/g, '')
  const formatted = formatValue(cleanValue)

  emit('update:modelValue', cleanValue)
  emit('change', { raw: cleanValue, formatted })
}

const handleFocus = () => {
  isFocused.value = true
  emit('focus')
}

const handleBlur = () => {
  isFocused.value = false
  emit('blur')
}
</script>

<template>
  <div
    class="ot-mask-input"
    :class="[
      `ot-mask-input--${size}`,
      {
        'ot-mask-input--error': error,
        'ot-mask-input--disabled': disabled,
        'ot-mask-input--focused': isFocused,
        'ot-mask-input--full-width': fullWidth
      }
    ]"
  >
    <input
      ref="inputRef"
      class="ot-mask-input__field"
      type="text"
      :value="displayValue"
      :placeholder="placeholder || mask"
      :disabled="disabled"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>

<style scoped>
.ot-mask-input {
  display: inline-flex;
  align-items: center;
  background-color: var(--ot-gray-400);
  color: var(--ot-gray-200);
  border-radius: var(--ot-radius-base);
  transition: box-shadow var(--ot-transition-base);
  position: relative;
}

.ot-mask-input--full-width {
  width: 100%;
}

.ot-mask-input--focused {
  box-shadow: 0 0 0 2px var(--ot-primary);
}

.ot-mask-input--error {
  box-shadow: 0 0 0 2px var(--ot-danger);
}

.ot-mask-input--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ot-mask-input--disabled * {
  cursor: not-allowed;
}

.ot-mask-input__field {
  border: none;
  background-color: transparent;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  flex: 1;
  outline: none;
  width: 100%;
}

.ot-mask-input__field::placeholder {
  color: var(--ot-gray-100);
}

/* Sizes */
.ot-mask-input--sm {
  min-height: 32px;
  padding: 6px 12px;
  font-size: var(--ot-font-sm);
}

.ot-mask-input--md {
  min-height: 42px;
  padding: 8px 16px;
  font-size: var(--ot-font-sm);
}

.ot-mask-input--lg {
  min-height: 48px;
  padding: 10px 20px;
  font-size: var(--ot-font-base);
}
</style>
