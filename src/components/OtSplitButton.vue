<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger', 'warning', 'success'].includes(value)
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
  options: {
    type: Array,
    default: () => []
    // [{ label: String, value: Any, icon?: Component }]
  }
})

const emit = defineEmits(['click', 'select'])

const isOpen = ref(false)
const splitButtonRef = ref(null)

const toggle = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

const close = () => {
  isOpen.value = false
}

const handleMainClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}

const handleSelect = (option) => {
  emit('select', option)
  close()
}

const handleClickOutside = (event) => {
  if (splitButtonRef.value && !splitButtonRef.value.contains(event.target)) {
    close()
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
    ref="splitButtonRef"
    class="ot-split-button"
    :class="[
      `ot-split-button--${variant}`,
      `ot-split-button--${size}`,
      { 'ot-split-button--disabled': disabled }
    ]"
  >
    <button
      type="button"
      class="ot-split-button__main"
      :disabled="disabled"
      @click="handleMainClick"
    >
      <slot />
    </button>
    <button type="button" class="ot-split-button__toggle" :disabled="disabled" @click="toggle">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 10l5 5 5-5z" />
      </svg>
    </button>
    <Transition name="ot-split-button">
      <ul v-if="isOpen && options.length" class="ot-split-button__menu">
        <li
          v-for="(option, index) in options"
          :key="index"
          class="ot-split-button__option"
          @click="handleSelect(option)"
        >
          <component v-if="option.icon" :is="option.icon" class="ot-split-button__option-icon" />
          {{ option.label }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.ot-split-button {
  display: inline-flex;
  position: relative;
  border-radius: var(--ot-radius-base);
}

.ot-split-button--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ot-split-button__main,
.ot-split-button__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--ot-font-family);
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all var(--ot-transition-fast);
}

.ot-split-button__main {
  gap: var(--ot-spacing-sm);
}

.ot-split-button__toggle {
  border-left: 1px solid rgba(255, 255, 255, 0.2);
}

.ot-split-button__toggle:active:not(:disabled) {
  transform: scale(0.95);
}

/* Variants */
.ot-split-button--primary .ot-split-button__main,
.ot-split-button--primary .ot-split-button__toggle {
  background-color: var(--ot-primary);
  color: var(--ot-white);
}

.ot-split-button--primary .ot-split-button__main:hover:not(:disabled),
.ot-split-button--primary .ot-split-button__toggle:hover:not(:disabled) {
  background-color: var(--ot-primary-hover);
}

.ot-split-button--secondary .ot-split-button__main,
.ot-split-button--secondary .ot-split-button__toggle {
  background-color: var(--ot-gray-400);
  color: var(--ot-gray-200);
}

.ot-split-button--secondary .ot-split-button__main:hover:not(:disabled),
.ot-split-button--secondary .ot-split-button__toggle:hover:not(:disabled) {
  background-color: var(--ot-gray-300);
}

.ot-split-button--danger .ot-split-button__main,
.ot-split-button--danger .ot-split-button__toggle {
  background-color: var(--ot-danger);
  color: var(--ot-white);
}

.ot-split-button--danger .ot-split-button__main:hover:not(:disabled),
.ot-split-button--danger .ot-split-button__toggle:hover:not(:disabled) {
  background-color: var(--ot-danger-hover);
}

.ot-split-button--warning .ot-split-button__main,
.ot-split-button--warning .ot-split-button__toggle {
  background-color: var(--ot-warning);
  color: var(--ot-gray-500);
}

.ot-split-button--warning .ot-split-button__main:hover:not(:disabled),
.ot-split-button--warning .ot-split-button__toggle:hover:not(:disabled) {
  background-color: var(--ot-warning-hover);
}

.ot-split-button--success .ot-split-button__main,
.ot-split-button--success .ot-split-button__toggle {
  background-color: var(--ot-success);
  color: var(--ot-white);
}

.ot-split-button--success .ot-split-button__main:hover:not(:disabled),
.ot-split-button--success .ot-split-button__toggle:hover:not(:disabled) {
  background-color: var(--ot-success-hover);
}

/* Sizes */
.ot-split-button--sm .ot-split-button__main {
  padding: 6px 12px;
  font-size: var(--ot-font-sm);
}

.ot-split-button--sm .ot-split-button__toggle {
  padding: 6px 8px;
  font-size: var(--ot-font-sm);
}

.ot-split-button--md .ot-split-button__main {
  padding: 10px 16px;
  font-size: var(--ot-font-sm);
}

.ot-split-button--md .ot-split-button__toggle {
  padding: 10px 12px;
  font-size: var(--ot-font-sm);
}

.ot-split-button--lg .ot-split-button__main {
  padding: 12px 24px;
  font-size: var(--ot-font-base);
}

.ot-split-button--lg .ot-split-button__toggle {
  padding: 12px 16px;
  font-size: var(--ot-font-base);
}

/* Menu */
.ot-split-button__menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 100%;
  background-color: var(--ot-gray-400);
  border-radius: var(--ot-radius-base);
  box-shadow: var(--ot-shadow-lg);
  z-index: var(--ot-z-dropdown);
  list-style: none;
  margin: 0;
  padding: var(--ot-spacing-xs) 0;
  overflow: hidden;
}

.ot-split-button__option {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-sm);
  padding: 10px 16px;
  font-size: var(--ot-font-sm);
  color: var(--ot-gray-200);
  cursor: pointer;
  transition: background-color var(--ot-transition-fast);
}

.ot-split-button__option:hover {
  background-color: var(--ot-gray-300);
}

.ot-split-button__option-icon {
  width: 16px;
  height: 16px;
}

/* Transition */
.ot-split-button-enter-active,
.ot-split-button-leave-active {
  transition: all var(--ot-transition-fast);
}

.ot-split-button-enter-from,
.ot-split-button-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
