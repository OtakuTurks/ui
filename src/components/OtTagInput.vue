<script setup>
import { ref } from 'vue'
import OtTag from './OtTag.vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: 'Add tag...'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  maxTags: {
    type: Number,
    default: 10
  }
})

const emit = defineEmits(['update:modelValue', 'add', 'remove'])

const inputVal = ref('')
const isFocused = ref(false)
const inputEl = ref(null)

const addTag = () => {
  const tag = inputVal.value.trim()
  if (!tag) return

  if (props.modelValue.length >= props.maxTags) {
    inputVal.value = ''
    return
  }

  // Prevent duplicates
  if (!props.modelValue.includes(tag)) {
    const updated = [...props.modelValue, tag]
    emit('update:modelValue', updated)
    emit('add', tag)
  }
  inputVal.value = ''
}

const removeTag = (index) => {
  if (props.disabled) return
  const tag = props.modelValue[index]
  const updated = props.modelValue.filter((_, i) => i !== index)
  emit('update:modelValue', updated)
  emit('remove', tag)
}

const handleKeyDown = (event) => {
  const key = event.key

  if (key === 'Enter' || key === ',') {
    event.preventDefault()
    addTag()
  } else if (key === 'Backspace' && !inputVal.value && props.modelValue.length > 0) {
    removeTag(props.modelValue.length - 1)
  }
}

const focusInput = () => {
  if (!props.disabled) {
    inputEl.value?.focus()
  }
}
</script>

<template>
  <div
    class="ot-tag-input"
    :class="{
      'ot-tag-input--focused': isFocused,
      'ot-tag-input--disabled': disabled
    }"
    @click="focusInput"
  >
    <!-- Staged Tags List -->
    <div class="ot-tag-input__tags">
      <OtTag
        v-for="(tag, index) in modelValue"
        :key="index"
        size="sm"
        variant="primary"
        removable
        :disabled="disabled"
        @remove="removeTag(index)"
      >
        {{ tag }}
      </OtTag>

      <!-- Main HTML Input -->
      <input
        ref="inputEl"
        v-model="inputVal"
        type="text"
        class="ot-tag-input__field"
        :placeholder="modelValue.length === 0 ? placeholder : ''"
        :disabled="disabled || modelValue.length >= maxTags"
        @keydown="handleKeyDown"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
    </div>
  </div>
</template>

<style scoped>
.ot-tag-input {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 42px;
  background-color: var(--ot-bg-secondary, #1e2029);
  border: 2px solid var(--ot-gray-300, #2a2c34);
  border-radius: var(--ot-radius-base, 8.7px);
  padding: 6px var(--ot-spacing-sm);
  cursor: text;
  transition: all var(--ot-transition-fast, 150ms) ease;
}

.ot-tag-input--focused {
  border-color: var(--ot-primary, #377dff);
  box-shadow: 0 0 0 3px rgba(55, 125, 255, 0.2);
  background-color: var(--ot-bg-tertiary, #2a2c34);
}

.ot-tag-input--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--ot-bg-primary, #12141d);
}

.ot-tag-input__tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--ot-spacing-xs, 4px);
  width: 100%;
}

.ot-tag-input__field {
  flex: 1;
  min-width: 80px;
  border: none;
  background: transparent;
  color: var(--ot-white, #ffffff);
  font-family: var(--ot-font-family);
  font-size: var(--ot-font-sm, 14px);
  outline: none;
  padding: 4px 0;
}

.ot-tag-input__field:disabled {
  cursor: not-allowed;
}
</style>
