<script setup>
defineProps({
  blur: {
    type: String,
    default: '12px'
  },
  opacity: {
    type: Number,
    default: 0.05
  },
  hoverable: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div
    class="ot-glass-card"
    :class="{ 'ot-glass-card--hoverable': hoverable }"
    :style="{
      '--glass-blur': blur,
      '--glass-bg': `rgba(255, 255, 255, ${opacity})`
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.ot-glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--ot-radius-lg);
  padding: var(--ot-spacing-md);
  font-family: var(--ot-font-family);
  transition:
    background-color var(--ot-transition-fast),
    border-color var(--ot-transition-fast);
}

.ot-glass-card--hoverable {
  cursor: pointer;
}

.ot-glass-card--hoverable:hover {
  background: rgba(255, 255, 255, calc(var(--opacity, 0.05) + 0.02));
  border-color: rgba(255, 255, 255, 0.2);
}
</style>
