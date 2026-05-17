<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(props.modelValue)

const toggle = () => {
  isOpen.value = !isOpen.value
  emit('update:modelValue', isOpen.value)
  emit('change', isOpen.value)
}

watch(
  () => props.modelValue,
  (val) => {
    isOpen.value = val
  }
)
</script>

<template>
  <div class="ot-collapse" :class="{ 'ot-collapse--open': isOpen }">
    <button type="button" class="ot-collapse__header" @click="toggle">
      <span class="ot-collapse__title">{{ title }}</span>
      <span v-if="icon" class="ot-collapse__icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </span>
    </button>
    <Transition name="ot-collapse">
      <div v-show="isOpen" class="ot-collapse__content">
        <div class="ot-collapse__body">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.ot-collapse {
  background-color: var(--ot-gray-400);
  border-radius: var(--ot-radius-base);
  overflow: hidden;
}

.ot-collapse__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--ot-spacing-md) var(--ot-spacing-lg);
  background: transparent;
  border: none;
  color: var(--ot-gray-200);
  font-family: inherit;
  font-size: var(--ot-font-base);
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: background-color var(--ot-transition-fast);
}

.ot-collapse__header:hover {
  background-color: var(--ot-gray-300);
}

.ot-collapse__title {
  flex: 1;
}

.ot-collapse__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ot-gray-100);
  transition: transform var(--ot-transition-fast);
}

.ot-collapse--open .ot-collapse__icon {
  transform: rotate(180deg);
}

.ot-collapse__content {
  overflow: hidden;
}

.ot-collapse__body {
  padding: 0 var(--ot-spacing-lg) var(--ot-spacing-lg);
  color: var(--ot-gray-200);
  font-size: var(--ot-font-sm);
}

/* Transition */
.ot-collapse-enter-active,
.ot-collapse-leave-active {
  transition: all var(--ot-transition-base);
}

.ot-collapse-enter-from,
.ot-collapse-leave-to {
  opacity: 0;
  max-height: 0;
}

.ot-collapse-enter-to,
.ot-collapse-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>
