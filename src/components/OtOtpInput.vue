<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  length: {
    type: Number,
    default: 6
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'number',
    validator: (val) => ['number', 'text'].includes(val)
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'complete'])

const inputs = ref([])
const activeIndex = ref(-1)

// Initialize values array
const values = ref(Array(props.length).fill(''))

// Sync initial value from modelValue
watch(
  () => props.modelValue,
  (newVal) => {
    const newValStr = String(newVal || '')
    for (let i = 0; i < props.length; i++) {
      values.value[i] = newValStr[i] || ''
    }
  },
  { immediate: true }
)

const emitValue = () => {
  const code = values.value.join('')
  emit('update:modelValue', code)
  if (code.length === props.length) {
    emit('complete', code)
  }
}

const handleInput = (index, event) => {
  const val = event.target.value
  if (!val) return

  // Store last character only (handles double typing)
  const char = val.slice(-1)

  if (props.type === 'number' && isNaN(char)) {
    values.value[index] = ''
    event.target.value = ''
    return
  }

  values.value[index] = char
  emitValue()

  // Focus next box
  if (index < props.length - 1) {
    nextTick(() => {
      inputs.value[index + 1]?.focus()
    })
  }
}

const handleKeyDown = (index, event) => {
  const key = event.key

  if (key === 'Backspace') {
    if (values.value[index] === '') {
      // If current is empty, delete previous and focus it
      if (index > 0) {
        values.value[index - 1] = ''
        emitValue()
        inputs.value[index - 1]?.focus()
      }
    } else {
      // Delete current
      values.value[index] = ''
      emitValue()
    }
    event.preventDefault()
  } else if (key === 'ArrowLeft') {
    if (index > 0) {
      inputs.value[index - 1]?.focus()
      event.preventDefault()
    }
  } else if (key === 'ArrowRight') {
    if (index < props.length - 1) {
      inputs.value[index + 1]?.focus()
      event.preventDefault()
    }
  }
}

const handlePaste = (event) => {
  event.preventDefault()
  if (props.disabled) return

  const pasteData = event.clipboardData.getData('text').trim()
  const filteredData = props.type === 'number' ? pasteData.replace(/\D/g, '') : pasteData

  const slicedData = filteredData.slice(0, props.length)

  for (let i = 0; i < props.length; i++) {
    values.value[i] = slicedData[i] || ''
  }

  emitValue()

  // Focus appropriate box after paste
  const nextFocusIndex = Math.min(slicedData.length, props.length - 1)
  inputs.value[nextFocusIndex]?.focus()
}

const handleFocus = (index) => {
  activeIndex.value = index
}

const handleBlur = () => {
  activeIndex.value = -1
}
</script>

<template>
  <div class="ot-otp" :class="{ 'ot-otp--disabled': disabled }">
    <input
      v-for="(val, index) in length"
      :key="index"
      ref="inputs"
      type="text"
      inputmode="numeric"
      pattern="[0-9]*"
      class="ot-otp__input"
      :class="{
        'ot-otp__input--active': activeIndex === index,
        'ot-otp__input--filled': values[index] !== ''
      }"
      :value="values[index]"
      :placeholder="placeholder"
      :disabled="disabled"
      maxlength="1"
      @input="handleInput(index, $event)"
      @keydown="handleKeyDown(index, $event)"
      @paste="handlePaste"
      @focus="handleFocus(index)"
      @blur="handleBlur"
    />
  </div>
</template>

<style scoped>
.ot-otp {
  display: flex;
  gap: var(--ot-spacing-sm, 8px);
  justify-content: center;
  align-items: center;
}

.ot-otp--disabled {
  opacity: 0.5;
}

.ot-otp__input {
  width: 46px;
  height: 52px;
  border-radius: var(--ot-radius-base, 8.7px);
  border: 2px solid var(--ot-gray-300, #2a2c34);
  background-color: var(--ot-bg-secondary, #1e2029);
  color: var(--ot-white, #ffffff);
  font-family: var(--ot-font-family);
  font-size: var(--ot-font-lg, 1.25rem);
  font-weight: 700;
  text-align: center;
  outline: none;
  transition: all var(--ot-transition-fast, 150ms) cubic-bezier(0.4, 0, 0.2, 1);
}

.ot-otp__input:focus,
.ot-otp__input--active {
  border-color: var(--ot-primary, #377dff);
  box-shadow: 0 0 0 3px rgba(55, 125, 255, 0.2);
  transform: translateY(-2px);
  background-color: var(--ot-bg-tertiary, #2a2c34);
}

.ot-otp__input--filled {
  border-color: var(--ot-gray-100, #aab0b7);
}

.ot-otp__input:disabled {
  cursor: not-allowed;
  background-color: var(--ot-bg-primary, #12141d);
  border-color: var(--ot-gray-300, #2a2c34);
}
</style>
