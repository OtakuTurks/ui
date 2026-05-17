<script setup>
import { computed } from 'vue'

const props = defineProps({
  score: {
    type: Number,
    required: true,
    validator: (val) => val >= 0 && val <= 10
  },
  maxScore: {
    type: Number,
    default: 10
  },
  size: {
    type: Number,
    default: 80
  },
  strokeWidth: {
    type: Number,
    default: 6
  },
  showLabel: {
    type: Boolean,
    default: true
  },
  label: {
    type: String,
    default: ''
  },
  animated: {
    type: Boolean,
    default: true
  }
})

const radius = computed(() => (props.size - props.strokeWidth) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const percent = computed(() => (props.score / props.maxScore) * 100)
const dashOffset = computed(() => circumference.value - (percent.value / 100) * circumference.value)

const scoreColor = computed(() => {
  if (props.score >= 8) return 'var(--ot-success)'
  if (props.score >= 6) return 'var(--ot-primary)'
  if (props.score >= 4) return 'var(--ot-warning)'
  return 'var(--ot-danger)'
})

const ratingLabel = computed(() => {
  if (props.label) return props.label
  if (props.score >= 9) return 'Masterpiece'
  if (props.score >= 8) return 'Great'
  if (props.score >= 7) return 'Good'
  if (props.score >= 6) return 'Fine'
  if (props.score >= 5) return 'Average'
  if (props.score >= 4) return 'Bad'
  return 'Appalling'
})
</script>

<template>
  <div class="ot-score-display" :style="{ width: `${size}px` }">
    <!-- Circular Ring SVG -->
    <svg
      class="ot-score-display__ring"
      :width="size"
      :height="size"
      :viewBox="`0 0 ${size} ${size}`"
    >
      <!-- Background Track -->
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        class="ot-score-display__track"
        :stroke-width="strokeWidth"
        fill="none"
      />
      <!-- Score Fill Arc -->
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        class="ot-score-display__fill"
        :class="{ 'ot-score-display__fill--animated': animated }"
        :stroke="scoreColor"
        :stroke-width="strokeWidth"
        fill="none"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        :transform="`rotate(-90 ${size / 2} ${size / 2})`"
      />
    </svg>

    <!-- Score Number -->
    <div class="ot-score-display__value" :style="{ color: scoreColor }">
      {{ score.toFixed(1) }}
    </div>

    <!-- Label -->
    <span v-if="showLabel" class="ot-score-display__label">
      {{ ratingLabel }}
    </span>
  </div>
</template>

<style scoped>
.ot-score-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--ot-spacing-xs);
  font-family: var(--ot-font-family);
  position: relative;
}

.ot-score-display__ring {
  display: block;
}

.ot-score-display__track {
  stroke: var(--ot-gray-300);
}

.ot-score-display__fill {
  transition: stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.ot-score-display__fill--animated {
  animation: score-draw 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.ot-score-display__value {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: calc(var(--ot-font-lg) * 1.1);
}

/* Dynamically adjust text position to center of ring */
.ot-score-display__value {
  height: v-bind('`${size}px`');
}

.ot-score-display__label {
  font-size: var(--ot-font-xs);
  font-weight: 600;
  color: var(--ot-gray-100);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@keyframes score-draw {
  from {
    stroke-dashoffset: v-bind('circumference + "px"');
  }
}
</style>
