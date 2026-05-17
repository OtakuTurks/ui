<script setup>
import { computed } from 'vue'

const props = defineProps({
  glowColor: {
    type: String,
    default: 'var(--ot-primary)'
  },
  blur: {
    type: String,
    default: '12px'
  },
  intensity: {
    type: Number,
    default: 0.06
  },
  hoverable: {
    type: Boolean,
    default: true
  },
  padding: {
    type: String,
    default: 'md',
    validator: (val) => ['none', 'sm', 'md', 'lg'].includes(val)
  }
})

const paddingMap = {
  none: '0',
  sm: 'var(--ot-spacing-sm)',
  md: 'var(--ot-spacing-md)',
  lg: 'var(--ot-spacing-lg)'
}

const glassStyles = computed(() => {
  return {
    backdropFilter: `blur(${props.blur})`,
    backgroundColor: `rgba(255, 255, 255, ${props.intensity})`,
    '--local-glow-color': props.glowColor
  }
})
</script>

<template>
  <div
    class="ot-glass-card"
    :class="{ 'ot-glass-card--hoverable': hoverable }"
    :style="[glassStyles, { padding: paddingMap[padding] }]"
  >
    <!-- Light reflection shine reflection -->
    <div class="ot-glass-card__shine"></div>

    <div class="ot-glass-card__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ot-glass-card {
  position: relative;
  border-radius: var(--ot-radius-xl, 16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: all var(--ot-transition-slow, 350ms) cubic-bezier(0.25, 0.8, 0.25, 1);
  color: var(--ot-white, #ffffff);
  z-index: 1;
}

.ot-glass-card__shine {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.12) 0%,
    rgba(255, 255, 255, 0.02) 40%,
    rgba(255, 255, 255, 0) 100%
  );
  pointer-events: none;
  z-index: -1;
  transition: opacity var(--ot-transition-base) ease;
}

.ot-glass-card__content {
  position: relative;
  z-index: 2;
}

/* Hoverable state effects */
.ot-glass-card--hoverable {
  cursor: pointer;
}

.ot-glass-card--hoverable:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow:
    0 12px 40px 0 rgba(0, 0, 0, 0.4),
    0 0 16px 0 rgba(var(--local-glow-color, 55, 125, 255), 0.12);
}

/* Neon glow line borders */
.ot-glass-card--hoverable::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px; /* border thickness */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    var(--local-glow-color) 50%,
    rgba(255, 255, 255, 0.05) 100%
  );
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
  opacity: 0.1;
  pointer-events: none;
  z-index: 3;
  transition: opacity var(--ot-transition-slow) cubic-bezier(0.25, 0.8, 0.25, 1);
}

.ot-glass-card--hoverable:hover::after {
  opacity: 0.75;
}
</style>
