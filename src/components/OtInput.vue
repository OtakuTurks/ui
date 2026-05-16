<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'password', 'email', 'number', 'search'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  placeholder: {
    type: String,
    default: ''
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
  adornment: {
    type: [String, Object],
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const isFocused = ref(false)
const showPassword = ref(false)

const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div
    class="ot-input"
    :class="[
      `ot-input--${size}`,
      {
        'ot-input--error': error,
        'ot-input--disabled': disabled,
        'ot-input--focused': isFocused,
        'ot-input--full-width': fullWidth
      }
    ]"
  >
    <input
      class="ot-input__field"
      :type="inputType"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="handleInput"
      @focus="isFocused = true; $emit('focus')"
      @blur="isFocused = false; $emit('blur')"
    />
    
    <span v-if="adornment" class="ot-input__adornment">
      <component v-if="typeof adornment === 'object'" :is="adornment" />
      <span v-else v-html="adornment"></span>
    </span>
    
    <button
      v-if="type === 'password'"
      type="button"
      class="ot-input__password-toggle"
      @click="togglePassword"
      tabindex="-1"
    >
      <svg v-if="!showPassword" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
      </svg>
      <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.ot-input {
  display: inline-flex;
  align-items: center;
  background-color: var(--ot-gray-400);
  color: var(--ot-gray-200);
  border-radius: var(--ot-radius-base);
  transition: box-shadow var(--ot-transition-base);
  position: relative;
}

.ot-input--full-width {
  width: 100%;
}

.ot-input--focused {
  box-shadow: 0 0 0 2px var(--ot-primary);
}

.ot-input--error {
  box-shadow: 0 0 0 2px var(--ot-danger);
}

.ot-input--disabled {
  opacity: 0.4;
}

.ot-input--disabled * {
  cursor: not-allowed;
}

/* Sizes */
.ot-input--sm {
  min-height: 32px;
  padding: 6px 12px;
  font-size: var(--ot-font-sm);
}

.ot-input--md {
  min-height: 42px;
  padding: 8px 16px;
  font-size: var(--ot-font-sm);
}

.ot-input--lg {
  min-height: 48px;
  padding: 10px 20px;
  font-size: var(--ot-font-base);
}

/* Field */
.ot-input__field {
  border: none;
  background-color: transparent;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  flex: 1;
  outline: none;
  width: 100%;
}

.ot-input__field::placeholder {
  color: var(--ot-gray-100);
}

.ot-input__field::-ms-reveal,
.ot-input__field::-ms-clear {
  display: none;
}

.ot-input__field::-webkit-outer-spin-button,
.ot-input__field::-webkit-inner-spin-button {
  appearance: none;
  margin: 0;
}

.ot-input__field:-webkit-autofill {
  -webkit-text-fill-color: var(--ot-gray-200);
  box-shadow: 0 0 0px 1000px var(--ot-gray-400) inset;
}

/* Adornment */
.ot-input__adornment {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--ot-gray-100);
  margin-left: var(--ot-spacing-sm);
}

/* Password Toggle */
.ot-input__password-toggle {
  background: none;
  border: none;
  color: var(--ot-gray-100);
  cursor: pointer;
  padding: 0;
  margin-left: var(--ot-spacing-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color var(--ot-transition-fast);
}

.ot-input__password-toggle:hover {
  color: var(--ot-gray-200);
}
</style>
