<script setup>
defineProps({
  variant: {
    type: String,
    default: 'elevated',
    validator: (value) => ['elevated', 'outlined', 'filled'].includes(value)
  },
  padding: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg'].includes(value)
  },
  hoverable: {
    type: Boolean,
    default: false
  }
})

const paddingMap = {
  none: '0',
  sm: 'var(--ot-spacing-sm)',
  md: 'var(--ot-spacing-md)',
  lg: 'var(--ot-spacing-lg)'
}
</script>

<template>
  <div
    class="ot-card"
    :class="[`ot-card--${variant}`, { 'ot-card--hoverable': hoverable }]"
    :style="{ padding: paddingMap[padding] }"
  >
    <slot />
  </div>
</template>

<style scoped>
.ot-card {
  background-color: var(--ot-gray-400);
  border-radius: var(--ot-radius-lg);
  overflow: hidden;
  transition: all var(--ot-transition-base);
}

/* Variants */
.ot-card--elevated {
  box-shadow: var(--ot-shadow-base);
}

.ot-card--outlined {
  border: 1px solid var(--ot-gray-300);
}

.ot-card--filled {
  background-color: var(--ot-gray-500);
}

/* Hoverable */
.ot-card--hoverable {
  cursor: pointer;
}

.ot-card--hoverable:hover {
  transform: translateY(-2px);
  box-shadow: var(--ot-shadow-lg);
}

.ot-card--outlined.ot-card--hoverable:hover {
  border-color: var(--ot-primary);
}
</style>
