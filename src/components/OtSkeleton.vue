<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'circular', 'rectangular', 'rounded'].includes(value)
  },
  width: {
    type: [String, Number],
    default: '100%'
  },
  height: {
    type: [String, Number],
    default: null
  },
  animation: {
    type: String,
    default: 'pulse',
    validator: (value) => ['pulse', 'wave', 'none'].includes(value)
  }
})

const style = computed(() => {
  const width = typeof props.width === 'number' ? `${props.width}px` : props.width
  const height = props.height ? (typeof props.height === 'number' ? `${props.height}px` : props.height) : null
  
  return {
    width,
    height: height || (props.variant === 'text' ? undefined : height)
  }
})
</script>

<template>
  <div
    class="ot-skeleton"
    :class="[
      `ot-skeleton--${variant}`,
      `ot-skeleton--${animation}`
    ]"
    :style="style"
  />
</template>

<style scoped>
.ot-skeleton {
  background-color: var(--ot-gray-300);
  display: block;
}

/* Variants */
.ot-skeleton--text {
  height: 1em;
  margin-top: 0;
  margin-bottom: 0;
  border-radius: var(--ot-radius-sm);
  transform: scale(1, 0.60);
  transform-origin: center;
}

.ot-skeleton--circular {
  border-radius: var(--ot-radius-full);
}

.ot-skeleton--rectangular {
  border-radius: 0;
}

.ot-skeleton--rounded {
  border-radius: var(--ot-radius-base);
}

/* Animations */
.ot-skeleton--pulse {
  animation: ot-skeleton-pulse 1.5s ease-in-out 0.5s infinite;
}

.ot-skeleton--wave {
  background: linear-gradient(
    90deg,
    var(--ot-gray-300) 25%,
    var(--ot-gray-400) 50%,
    var(--ot-gray-300) 75%
  );
  background-size: 200% 100%;
  animation: ot-skeleton-wave 1.5s ease-in-out infinite;
}

@keyframes ot-skeleton-pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}

@keyframes ot-skeleton-wave {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>