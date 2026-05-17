<script setup>
import { inject, computed, ref } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

const form = inject('otForm', null)
const isFocused = ref(false)

const fieldError = computed(() => {
  if (props.error) return props.error
  if (form?.errors && props.name) {
    return form.errors.value[props.name] || ''
  }
  return ''
})

const hasError = computed(() => !!fieldError.value)
</script>

<template>
  <div
    class="ot-form-field"
    :class="{
      'ot-form-field--error': hasError,
      'ot-form-field--focused': isFocused,
      'ot-form-field--full-width': fullWidth
    }"
  >
    <label v-if="label" class="ot-form-field__label" :for="name">
      {{ label }}
      <span v-if="required" class="ot-form-field__required">*</span>
    </label>
    <div class="ot-form-field__control" @focusin="isFocused = true" @focusout="isFocused = false">
      <slot />
    </div>
    <div v-if="hasError" class="ot-form-field__error">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
        />
      </svg>
      {{ fieldError }}
    </div>
    <div v-else-if="hint" class="ot-form-field__hint">
      {{ hint }}
    </div>
  </div>
</template>

<style scoped>
.ot-form-field {
  display: flex;
  flex-direction: column;
  gap: var(--ot-spacing-xs);
}

.ot-form-field--full-width {
  width: 100%;
}

.ot-form-field__label {
  font-size: var(--ot-font-sm);
  font-weight: 500;
  color: var(--ot-gray-200);
  display: flex;
  align-items: center;
  gap: 2px;
}

.ot-form-field__required {
  color: var(--ot-danger);
}

.ot-form-field__control {
  display: flex;
  flex-direction: column;
  gap: var(--ot-spacing-xs);
}

.ot-form-field__error {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-xs);
  font-size: var(--ot-font-xs);
  color: var(--ot-danger);
}

.ot-form-field__hint {
  font-size: var(--ot-font-xs);
  color: var(--ot-gray-100);
}
</style>
