<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Object],
    default: ''
  },
  options: {
    type: Array,
    default: () => []
    // [{ label: String, value: Any, group?: String }]
  },
  placeholder: {
    type: String,
    default: 'Search...'
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
  },
  loading: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: true
  },
  filterable: {
    type: Boolean,
    default: true
  },
  groupBy: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'search'])

const inputRef = ref(null)
const isOpen = ref(false)
const query = ref('')
const highlightedIndex = ref(-1)
const autocompleteRef = ref(null)

const filteredOptions = computed(() => {
  if (!props.filterable || !query.value) return props.options
  const lowerQuery = query.value.toLowerCase()
  return props.options.filter((option) => {
    const label = typeof option === 'object' ? option.label : option
    return label.toLowerCase().includes(lowerQuery)
  })
})

const groupedOptions = computed(() => {
  if (!props.groupBy) return { '': filteredOptions.value }
  const groups = {}
  filteredOptions.value.forEach((option) => {
    const group = typeof option === 'object' ? option[props.groupBy] || '' : ''
    if (!groups[group]) groups[group] = []
    groups[group].push(option)
  })
  return groups
})

const displayValue = computed(() => {
  if (!props.modelValue) return query.value
  if (typeof props.modelValue === 'object') return props.modelValue.label || ''
  const option = props.options.find((opt) =>
    typeof opt === 'object' ? opt.value === props.modelValue : opt === props.modelValue
  )
  return typeof option === 'object' ? option?.label || '' : option || ''
})

const handleFocus = () => {
  if (!props.disabled) {
    isOpen.value = true
  }
}

const handleBlur = () => {
  // Delay to allow click on options
  setTimeout(() => {
    isOpen.value = false
    highlightedIndex.value = -1
  }, 150)
}

const handleInput = (event) => {
  query.value = event.target.value
  emit('search', query.value)
  isOpen.value = true
  highlightedIndex.value = -1
}

const selectOption = (option) => {
  const value = typeof option === 'object' ? option.value : option
  query.value = ''
  emit('update:modelValue', value)
  emit('change', value)
  isOpen.value = false
  highlightedIndex.value = -1
}

const clear = () => {
  query.value = ''
  emit('update:modelValue', null)
  emit('change', null)
  inputRef.value?.focus()
}

const handleKeydown = (event) => {
  if (!isOpen.value) {
    if (event.key === 'ArrowDown' || event.key === 'Enter') {
      event.preventDefault()
      isOpen.value = true
    }
    return
  }

  const flatOptions = filteredOptions.value

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      if (highlightedIndex.value < flatOptions.length - 1) {
        highlightedIndex.value++
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (highlightedIndex.value > 0) {
        highlightedIndex.value--
      }
      break
    case 'Enter':
      event.preventDefault()
      if (highlightedIndex.value >= 0) {
        selectOption(flatOptions[highlightedIndex.value])
      }
      break
    case 'Escape':
      event.preventDefault()
      isOpen.value = false
      highlightedIndex.value = -1
      break
  }
}

const handleClickOutside = (event) => {
  if (autocompleteRef.value && !autocompleteRef.value.contains(event.target)) {
    isOpen.value = false
    highlightedIndex.value = -1
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

watch(
  () => props.modelValue,
  () => {
    if (!props.modelValue) {
      query.value = ''
    }
  }
)
</script>

<template>
  <div
    ref="autocompleteRef"
    class="ot-autocomplete"
    :class="[
      `ot-autocomplete--${size}`,
      {
        'ot-autocomplete--disabled': disabled,
        'ot-autocomplete--error': error,
        'ot-autocomplete--full-width': fullWidth,
        'ot-autocomplete--open': isOpen
      }
    ]"
    @keydown="handleKeydown"
  >
    <div class="ot-autocomplete__input-wrapper">
      <svg
        class="ot-autocomplete__search-icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        />
      </svg>
      <input
        ref="inputRef"
        type="text"
        class="ot-autocomplete__input"
        :value="isOpen ? query : displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
      />
      <div v-if="loading && isOpen" class="ot-autocomplete__loading">
        <svg class="ot-autocomplete__spinner" width="20" height="20" viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-dasharray="31.4"
            stroke-dashoffset="10"
          />
        </svg>
      </div>
      <button
        v-if="clearable && modelValue && !disabled"
        type="button"
        class="ot-autocomplete__clear"
        @click="clear"
        tabindex="-1"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          />
        </svg>
      </button>
    </div>

    <Transition name="ot-autocomplete">
      <div v-if="isOpen && filteredOptions.length" class="ot-autocomplete__dropdown">
        <template v-for="(options, group) in groupedOptions" :key="group">
          <div v-if="group" class="ot-autocomplete__group">{{ group }}</div>
          <div
            v-for="(option, index) in options"
            :key="index"
            class="ot-autocomplete__option"
            :class="{
              'ot-autocomplete__option--highlighted':
                filteredOptions.indexOf(option) === highlightedIndex,
              'ot-autocomplete__option--selected':
                typeof option === 'object' ? option.value === modelValue : option === modelValue
            }"
            @click="selectOption(option)"
            @mouseenter="highlightedIndex = filteredOptions.indexOf(option)"
          >
            {{ typeof option === 'object' ? option.label : option }}
          </div>
        </template>
      </div>
      <div v-else-if="isOpen && query && !filteredOptions.length" class="ot-autocomplete__dropdown">
        <div class="ot-autocomplete__empty">No results found</div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.ot-autocomplete {
  display: inline-block;
  position: relative;
}

.ot-autocomplete--full-width {
  width: 100%;
}

.ot-autocomplete--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ot-autocomplete__input-wrapper {
  display: flex;
  align-items: center;
  background-color: var(--ot-gray-400);
  border-radius: var(--ot-radius-base);
  transition: box-shadow var(--ot-transition-base);
  position: relative;
}

.ot-autocomplete--open .ot-autocomplete__input-wrapper {
  box-shadow: 0 0 0 2px var(--ot-primary);
}

.ot-autocomplete--error .ot-autocomplete__input-wrapper {
  box-shadow: 0 0 0 2px var(--ot-danger);
}

.ot-autocomplete__search-icon {
  position: absolute;
  left: 12px;
  color: var(--ot-gray-100);
  pointer-events: none;
}

.ot-autocomplete__input {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--ot-gray-200);
  font-family: inherit;
  font-size: inherit;
  outline: none;
  padding-left: 40px;
  padding-right: 36px;
}

.ot-autocomplete__input::placeholder {
  color: var(--ot-gray-100);
}

.ot-autocomplete__loading {
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  color: var(--ot-gray-100);
}

.ot-autocomplete__spinner {
  animation: ot-autocomplete-spin 1s linear infinite;
}

@keyframes ot-autocomplete-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.ot-autocomplete__clear {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: var(--ot-gray-100);
  cursor: pointer;
  padding: 0;
  display: flex;
  transition: color var(--ot-transition-fast);
}

.ot-autocomplete__clear:hover {
  color: var(--ot-gray-200);
}

/* Sizes */
.ot-autocomplete--sm .ot-autocomplete__input-wrapper {
  min-height: 32px;
  padding: 6px 12px;
  font-size: var(--ot-font-sm);
}

.ot-autocomplete--md .ot-autocomplete__input-wrapper {
  min-height: 42px;
  padding: 8px 16px;
  font-size: var(--ot-font-sm);
}

.ot-autocomplete--lg .ot-autocomplete__input-wrapper {
  min-height: 48px;
  padding: 10px 20px;
  font-size: var(--ot-font-base);
}

/* Dropdown */
.ot-autocomplete__dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background-color: var(--ot-gray-400);
  border-radius: var(--ot-radius-base);
  box-shadow: var(--ot-shadow-lg);
  overflow: hidden;
  z-index: var(--ot-z-dropdown);
  max-height: 300px;
  overflow-y: auto;
}

.ot-autocomplete__group {
  padding: 8px 12px;
  font-size: var(--ot-font-xs);
  font-weight: 600;
  color: var(--ot-gray-100);
  background-color: var(--ot-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ot-autocomplete__option {
  padding: 10px 16px;
  cursor: pointer;
  font-size: var(--ot-font-sm);
  transition: background-color var(--ot-transition-fast);
}

.ot-autocomplete__option:hover,
.ot-autocomplete__option--highlighted {
  background-color: var(--ot-gray-300);
}

.ot-autocomplete__option--selected {
  color: var(--ot-primary);
  font-weight: 600;
}

.ot-autocomplete__empty {
  padding: 16px;
  text-align: center;
  color: var(--ot-gray-100);
  font-size: var(--ot-font-sm);
}

/* Transition */
.ot-autocomplete-enter-active,
.ot-autocomplete-leave-active {
  transition: all var(--ot-transition-fast);
}

.ot-autocomplete-enter-from,
.ot-autocomplete-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
