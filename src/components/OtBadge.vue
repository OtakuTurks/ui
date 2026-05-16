<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'warning', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  dot: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <span
    class="ot-badge"
    :class="[
      `ot-badge--${variant}`,
      `ot-badge--${size}`,
      { 'ot-badge--dot': dot }
    ]"
  >
    <span v-if="dot" class="ot-badge__dot"></span>
    <slot v-else />
  </span>
</template>

<style scoped>
.ot-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: var(--ot-radius-full);
  white-space: nowrap;
}

/* Variants */
.ot-badge--primary {
  background-color: var(--ot-primary);
  color: var(--ot-white);
}

.ot-badge--secondary {
  background-color: var(--ot-gray-300);
  color: var(--ot-gray-200);
}

.ot-badge--success {
  background-color: var(--ot-success);
  color: var(--ot-white);
}

.ot-badge--warning {
  background-color: var(--ot-warning);
  color: var(--ot-gray-500);
}

.ot-badge--danger {
  background-color: var(--ot-danger);
  color: var(--ot-white);
}

/* Sizes */
.ot-badge--sm {
  padding: 2px 8px;
  font-size: var(--ot-font-xs);
  min-height: 18px;
}

.ot-badge--md {
  padding: 4px 12px;
  font-size: var(--ot-font-xs);
  min-height: 22px;
}

.ot-badge--lg {
  padding: 6px 16px;
  font-size: var(--ot-font-sm);
  min-height: 28px;
}

/* Dot */
.ot-badge--dot {
  padding: 0;
  width: 8px;
  height: 8px;
}

.ot-badge__dot {
  width: 6px;
  height: 6px;
  border-radius: var(--ot-radius-full);
  background-color: inherit;
}
</style>
