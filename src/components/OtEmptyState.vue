<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  icon: { type: [String, Object], default: null }
})
</script>

<template>
  <div class="ot-empty-state">
    <div class="ot-empty-state__icon">
      <slot name="icon">
        <svg
          v-if="!icon"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path d="M20 12V8H6a2 2 0 01-2-2c0-1.1.9-2 2-2h12v4" />
          <path d="M4 6v12c0 1.1.9 2 2 2h14v-8H6a2 2 0 01-2-2z" />
        </svg>
        <component v-else-if="typeof icon === 'object'" :is="icon" />
      </slot>
    </div>
    <h3 class="ot-empty-state__title">{{ title }}</h3>
    <p v-if="description" class="ot-empty-state__description">{{ description }}</p>
    <div v-if="$slots.action" class="ot-empty-state__action">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<style scoped>
.ot-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--ot-spacing-xl, 48px) var(--ot-spacing-lg, 24px);
  text-align: center;
  background-color: var(--ot-bg-secondary, #1f2937);
  border: 1px dashed var(--ot-gray-300, #4b5563);
  border-radius: var(--ot-radius-base, 8px);
}

.ot-empty-state__icon {
  color: var(--ot-gray-200, #9ca3af);
  margin-bottom: var(--ot-spacing-md, 16px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ot-empty-state__title {
  margin: 0 0 var(--ot-spacing-xs, 8px) 0;
  font-size: var(--ot-font-lg, 18px);
  font-weight: 600;
  color: var(--ot-white, #ffffff);
}

.ot-empty-state__description {
  margin: 0;
  font-size: var(--ot-font-sm, 14px);
  color: var(--ot-gray-100, #d1d5db);
  max-width: 400px;
}

.ot-empty-state__action {
  margin-top: var(--ot-spacing-lg, 24px);
}
</style>
