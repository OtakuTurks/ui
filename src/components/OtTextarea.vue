<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  fullWidth: { type: Boolean, default: false },
  rows: { type: [Number, String], default: 3 },
  autoResize: { type: Boolean, default: true },
  maxLength: { type: Number, default: null }
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])
const textareaRef = ref(null)

const resize = () => {
  if (!props.autoResize || !textareaRef.value) return
  textareaRef.value.style.height = 'auto'
  textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`
}

watch(
  () => props.modelValue,
  () => {
    nextTick(resize)
  }
)

onMounted(() => {
  nextTick(resize)
})

const handleInput = (e) => {
  emit('update:modelValue', e.target.value)
}
</script>

<template>
  <div class="ot-textarea-wrapper" :class="{ 'ot-textarea--full-width': fullWidth }">
    <textarea
      ref="textareaRef"
      class="ot-textarea"
      :class="{ 'ot-textarea--error': error, 'ot-textarea--disabled': disabled }"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :maxlength="maxLength"
      @input="handleInput"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    ></textarea>
    <div v-if="maxLength" class="ot-textarea__counter">
      {{ String(modelValue).length }} / {{ maxLength }}
    </div>
  </div>
</template>

<style scoped>
.ot-textarea-wrapper {
  display: inline-flex;
  flex-direction: column;
  position: relative;
}

.ot-textarea--full-width {
  width: 100%;
  display: flex;
}

.ot-textarea {
  width: 100%;
  min-height: 80px;
  padding: var(--ot-spacing-sm, 12px) var(--ot-spacing-md, 16px);
  font-family: inherit;
  font-size: var(--ot-font-sm, 14px);
  color: var(--ot-white, #ffffff);
  background-color: var(--ot-gray-400, #374151);
  border: 1px solid var(--ot-gray-300, #4b5563);
  border-radius: var(--ot-radius-base, 8px);
  outline: none;
  transition: all 0.2s ease;
  resize: vertical;
}

.ot-textarea:focus {
  border-color: var(--ot-primary, #3b82f6);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
}

.ot-textarea--error {
  border-color: var(--ot-danger, #ef4444);
}

.ot-textarea--error:focus {
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.25);
}

.ot-textarea--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: var(--ot-bg-secondary, #1f2937);
}

.ot-textarea::placeholder {
  color: var(--ot-gray-200, #9ca3af);
}

.ot-textarea__counter {
  margin-top: 4px;
  font-size: 12px;
  color: var(--ot-gray-200, #9ca3af);
  align-self: flex-end;
}
</style>
