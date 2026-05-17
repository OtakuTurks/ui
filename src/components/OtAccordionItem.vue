<script setup>
import { inject, computed } from 'vue'

const props = defineProps({
  name: {
    type: [String, Number],
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const accordion = inject('otAccordion')

if (!accordion) {
  throw new Error('OtAccordionItem must be used inside OtAccordion')
}

const isOpen = computed(() => accordion.activeItems.value.has(props.name))

const toggle = () => {
  accordion.toggleItem(props.name)
}
</script>

<template>
  <div class="ot-accordion-item" :class="{ 'ot-accordion-item--open': isOpen }">
    <button class="ot-accordion-item__header" @click="toggle" :aria-expanded="isOpen">
      <span class="ot-accordion-item__title">{{ title }}</span>
      <span class="ot-accordion-item__icon">
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </span>
    </button>
    <div class="ot-accordion-item__body" v-show="isOpen">
      <div class="ot-accordion-item__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ot-accordion-item {
  border: 1px solid var(--ot-gray-300, #4b5563);
  border-radius: var(--ot-radius-base, 8px);
  overflow: hidden;
  background-color: var(--ot-gray-400, #374151);
}

.ot-accordion-item__header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--ot-spacing-md, 16px);
  background: transparent;
  border: none;
  color: var(--ot-white, #fff);
  cursor: pointer;
  font-weight: 600;
  text-align: left;
  transition: background-color 0.2s ease;
}

.ot-accordion-item__header:hover {
  background-color: var(--ot-gray-300, #4b5563);
}

.ot-accordion-item__icon {
  transition: transform 0.3s ease;
}

.ot-accordion-item--open .ot-accordion-item__icon {
  transform: rotate(180deg);
}

.ot-accordion-item__body {
  border-top: 1px solid var(--ot-gray-300, #4b5563);
}

.ot-accordion-item__content {
  padding: var(--ot-spacing-md, 16px);
  color: var(--ot-gray-200, #d1d5db);
}
</style>
