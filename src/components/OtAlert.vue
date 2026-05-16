<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'success', 'warning', 'danger'].includes(value)
  },
  title: {
    type: String,
    default: ''
  },
  dismissible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['dismiss'])

const iconPath = computed(() => {
  const icons = {
    info: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
    success: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    warning: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
    danger: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'
  }
  return icons[props.variant]
})
</script>

<template>
  <div
    class="ot-alert"
    :class="`ot-alert--${variant}`"
    role="alert"
  >
    <svg class="ot-alert__icon" viewBox="0 0 24 24" fill="currentColor">
      <path :d="iconPath" />
    </svg>
    <div class="ot-alert__content">
      <div v-if="title" class="ot-alert__title">{{ title }}</div>
      <div class="ot-alert__message">
        <slot />
      </div>
    </div>
    <button
      v-if="dismissible"
      class="ot-alert__close"
      @click="$emit('dismiss')"
      aria-label="Close"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.ot-alert {
  display: flex;
  align-items: flex-start;
  gap: var(--ot-spacing-md);
  padding: var(--ot-spacing-md) var(--ot-spacing-lg);
  border-radius: var(--ot-radius-base);
  border-left: 4px solid;
}

/* Variants */
.ot-alert--info {
  background-color: rgba(55, 125, 255, 0.1);
  border-color: var(--ot-primary);
  color: var(--ot-primary);
}

.ot-alert--success {
  background-color: rgba(45, 202, 140, 0.1);
  border-color: var(--ot-success);
  color: var(--ot-success);
}

.ot-alert--warning {
  background-color: rgba(255, 190, 61, 0.1);
  border-color: var(--ot-warning);
  color: var(--ot-warning);
}

.ot-alert--danger {
  background-color: rgba(255, 113, 91, 0.1);
  border-color: var(--ot-danger);
  color: var(--ot-danger);
}

.ot-alert__icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  margin-top: 2px;
}

.ot-alert__content {
  flex: 1;
}

.ot-alert__title {
  font-weight: 600;
  font-size: var(--ot-font-base);
  margin-bottom: var(--ot-spacing-xs);
}

.ot-alert__message {
  font-size: var(--ot-font-sm);
  opacity: 0.9;
}

.ot-alert__close {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  display: flex;
  opacity: 0.6;
  transition: opacity var(--ot-transition-fast);
}

.ot-alert__close:hover {
  opacity: 1;
}
</style>