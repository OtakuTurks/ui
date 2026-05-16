<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 100
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'success', 'warning', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  showLabel: {
    type: Boolean,
    default: false
  },
  striped: {
    type: Boolean,
    default: false
  },
  animated: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="ot-progress">
    <div v-if="showLabel" class="ot-progress__label">{{ value }}%</div>
    <div class="ot-progress__track" :class="`ot-progress__track--${size}`">
      <div
        class="ot-progress__bar"
        :class="[
          `ot-progress__bar--${variant}`,
          {
            'ot-progress__bar--striped': striped,
            'ot-progress__bar--animated': animated
          }
        ]"
        :style="{ width: `${value}%` }"
      />
    </div>
  </div>
</template>

<style scoped>
.ot-progress {
  width: 100%;
}

.ot-progress__label {
  font-size: var(--ot-font-sm);
  color: var(--ot-gray-200);
  margin-bottom: var(--ot-spacing-xs);
  text-align: right;
}

.ot-progress__track {
  width: 100%;
  background-color: var(--ot-gray-300);
  border-radius: var(--ot-radius-full);
  overflow: hidden;
}

/* Sizes */
.ot-progress__track--sm {
  height: 4px;
}

.ot-progress__track--md {
  height: 8px;
}

.ot-progress__track--lg {
  height: 12px;
}

/* Bar */
.ot-progress__bar {
  height: 100%;
  border-radius: var(--ot-radius-full);
  transition: width var(--ot-transition-base);
}

/* Variants */
.ot-progress__bar--primary {
  background-color: var(--ot-primary);
}

.ot-progress__bar--success {
  background-color: var(--ot-success);
}

.ot-progress__bar--warning {
  background-color: var(--ot-warning);
}

.ot-progress__bar--danger {
  background-color: var(--ot-danger);
}

/* Striped */
.ot-progress__bar--striped {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}

/* Animated */
.ot-progress__bar--animated {
  animation: ot-progress-stripes 1s linear infinite;
}

@keyframes ot-progress-stripes {
  from {
    background-position: 1rem 0;
  }
  to {
    background-position: 0 0;
  }
}
</style>