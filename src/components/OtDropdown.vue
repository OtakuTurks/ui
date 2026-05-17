<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Object],
    default: null
  },
  options: {
    type: Array,
    default: () => []
    // [{ label: String, value: Any, disabled?: Boolean }]
  },
  placeholder: {
    type: String,
    default: 'Select...'
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
  fullWidth: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)
const dropdownRef = ref(null)
const highlightedIndex = ref(-1)

const selectedLabel = computed(() => {
  if (!props.modelValue) return props.placeholder
  const option = props.options.find((opt) =>
    typeof opt === 'object' ? opt.value === props.modelValue : opt === props.modelValue
  )
  return typeof option === 'object' ? option?.label : option
})

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
    if (!isOpen.value) {
      highlightedIndex.value = -1
    }
  }
}

const selectOption = (option) => {
  const value = typeof option === 'object' ? option.value : option
  emit('update:modelValue', value)
  emit('change', value)
  isOpen.value = false
  highlightedIndex.value = -1
}

const handleKeydown = (event) => {
  if (!isOpen.value) {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
      event.preventDefault()
      isOpen.value = true
    }
    return
  }

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      if (highlightedIndex.value < props.options.length - 1) {
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
        selectOption(props.options[highlightedIndex.value])
      }
      break
    case 'Escape':
      event.preventDefault()
      isOpen.value = false
      break
  }
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div
    ref="dropdownRef"
    class="ot-dropdown"
    :class="[
      `ot-dropdown--${size}`,
      {
        'ot-dropdown--disabled': disabled,
        'ot-dropdown--open': isOpen,
        'ot-dropdown--full-width': fullWidth
      }
    ]"
    @keydown="handleKeydown"
  >
    <button type="button" class="ot-dropdown__trigger" :disabled="disabled" @click="toggleDropdown">
      <span class="ot-dropdown__label">{{ selectedLabel }}</span>
      <svg
        class="ot-dropdown__arrow"
        :class="{ 'ot-dropdown__arrow--up': isOpen }"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M7 10l5 5 5-5z" />
      </svg>
    </button>

    <transition name="ot-dropdown">
      <ul v-if="isOpen" class="ot-dropdown__menu">
        <li
          v-for="(option, index) in options"
          :key="index"
          class="ot-dropdown__option"
          :class="{
            'ot-dropdown__option--selected':
              typeof option === 'object' ? option.value === modelValue : option === modelValue,
            'ot-dropdown__option--highlighted': index === highlightedIndex,
            'ot-dropdown__option--disabled': typeof option === 'object' && option.disabled
          }"
          @click.stop="selectOption(option)"
          @mouseenter="highlightedIndex = index"
        >
          {{ typeof option === 'object' ? option.label : option }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>
.ot-dropdown {
  display: inline-block;
  position: relative;
  min-width: 150px;
}

.ot-dropdown--full-width {
  width: 100%;
}

.ot-dropdown--disabled {
  opacity: 0.4;
}

/* Trigger */
.ot-dropdown__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: var(--ot-gray-400);
  color: var(--ot-gray-200);
  font-family: var(--ot-font-family);
  font-weight: 600;
  border: none;
  border-radius: var(--ot-radius-base);
  cursor: pointer;
  transition: box-shadow var(--ot-transition-base);
}

.ot-dropdown__trigger:hover:not(:disabled) {
  background-color: var(--ot-gray-300);
}

.ot-dropdown--open .ot-dropdown__trigger {
  box-shadow: 0 0 0 2px var(--ot-primary);
}

/* Sizes */
.ot-dropdown--sm .ot-dropdown__trigger {
  padding: 6px 12px;
  font-size: var(--ot-font-sm);
  min-height: 32px;
}

.ot-dropdown--md .ot-dropdown__trigger {
  padding: 10px 16px;
  font-size: var(--ot-font-sm);
  min-height: 42px;
}

.ot-dropdown--lg .ot-dropdown__trigger {
  padding: 12px 20px;
  font-size: var(--ot-font-base);
  min-height: 48px;
}

/* Label & Arrow */
.ot-dropdown__label {
  flex: 1;
  text-align: left;
}

.ot-dropdown__arrow {
  margin-left: var(--ot-spacing-sm);
  transition: transform var(--ot-transition-fast);
  flex-shrink: 0;
}

.ot-dropdown__arrow--up {
  transform: rotate(180deg);
}

/* Menu */
.ot-dropdown__menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background-color: var(--ot-gray-400);
  border-radius: var(--ot-radius-base);
  box-shadow: var(--ot-shadow-lg);
  overflow: hidden;
  z-index: var(--ot-z-dropdown);
  list-style: none;
  max-height: 300px;
  overflow-y: auto;
}

/* Option */
.ot-dropdown__option {
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color var(--ot-transition-fast);
  font-size: var(--ot-font-sm);
}

.ot-dropdown__option:hover,
.ot-dropdown__option--highlighted {
  background-color: var(--ot-gray-300);
}

.ot-dropdown__option--selected {
  color: var(--ot-primary);
  font-weight: 600;
}

.ot-dropdown__option--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Transition */
.ot-dropdown-enter-active,
.ot-dropdown-leave-active {
  transition:
    opacity var(--ot-transition-fast),
    transform var(--ot-transition-fast);
}

.ot-dropdown-enter-from,
.ot-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
