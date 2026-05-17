<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    default: 'info',
    validator: (val) => ['success', 'error', 'info', 'warning', '404', '500'].includes(val)
  },
  title: {
    type: String,
    default: ''
  },
  subTitle: {
    type: String,
    default: ''
  }
})

const defaultTitles = {
  success: 'Success',
  error: 'Submission Failed',
  info: 'Information',
  warning: 'Warning Required',
  404: '404 Not Found',
  500: 'Internal Server Error'
}

const displayTitle = computed(() => props.title || defaultTitles[props.status])
</script>

<template>
  <div class="ot-result" :class="[`ot-result--${status}`]">
    <!-- Icon / Graphic Container -->
    <div class="ot-result__icon">
      <!-- Success Icon -->
      <svg v-if="status === 'success'" width="72" height="72" viewBox="0 0 72 72" fill="none">
        <circle
          cx="36"
          cy="36"
          r="32"
          class="circle-bg"
          stroke="rgba(45, 202, 140, 0.15)"
          stroke-width="4"
        />
        <circle
          cx="36"
          cy="36"
          r="32"
          class="circle-draw"
          stroke="var(--ot-success)"
          stroke-width="4"
          stroke-linecap="round"
        />
        <path
          d="M24 37L32 45L48 27"
          class="check-draw"
          stroke="var(--ot-success)"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <!-- Error Icon -->
      <svg v-else-if="status === 'error'" width="72" height="72" viewBox="0 0 72 72" fill="none">
        <circle
          cx="36"
          cy="36"
          r="32"
          class="circle-bg"
          stroke="rgba(255, 113, 91, 0.15)"
          stroke-width="4"
        />
        <circle
          cx="36"
          cy="36"
          r="32"
          class="circle-draw"
          stroke="var(--ot-danger)"
          stroke-width="4"
          stroke-linecap="round"
        />
        <path
          d="M26 26L46 46M46 26L26 46"
          class="cross-draw"
          stroke="var(--ot-danger)"
          stroke-width="5"
          stroke-linecap="round"
        />
      </svg>

      <!-- Warning Icon -->
      <svg v-else-if="status === 'warning'" width="72" height="72" viewBox="0 0 72 72" fill="none">
        <path
          d="M36 8L66 60H6L36 8Z"
          class="warning-bg"
          fill="rgba(255, 190, 61, 0.1)"
          stroke="var(--ot-warning)"
          stroke-width="4"
          stroke-linejoin="round"
        />
        <path
          d="M36 24V40"
          class="exclamation-draw"
          stroke="var(--ot-warning)"
          stroke-width="4"
          stroke-linecap="round"
        />
        <circle cx="36" cy="48" r="2" fill="var(--ot-warning)" />
      </svg>

      <!-- Info Icon -->
      <svg v-else-if="status === 'info'" width="72" height="72" viewBox="0 0 72 72" fill="none">
        <circle
          cx="36"
          cy="36"
          r="32"
          class="circle-bg"
          stroke="rgba(55, 125, 255, 0.15)"
          stroke-width="4"
        />
        <circle
          cx="36"
          cy="36"
          r="32"
          class="circle-draw"
          stroke="var(--ot-primary)"
          stroke-width="4"
        />
        <path d="M36 22V24" stroke="var(--ot-primary)" stroke-width="5" stroke-linecap="round" />
        <path d="M36 32V50" stroke="var(--ot-primary)" stroke-width="4" stroke-linecap="round" />
      </svg>

      <!-- 404 Visual -->
      <div v-else-if="status === '404'" class="glitch-text" data-text="404">404</div>

      <!-- 500 Visual -->
      <div v-else-if="status === '500'" class="server-error-visual">
        <svg width="84" height="72" viewBox="0 0 84 72" fill="none">
          <rect
            x="6"
            y="6"
            width="72"
            height="24"
            rx="4"
            class="server-rack"
            stroke="var(--ot-gray-100)"
            stroke-width="3"
          />
          <rect
            x="6"
            y="38"
            width="72"
            height="24"
            rx="4"
            class="server-rack server-rack--broken"
            stroke="var(--ot-danger)"
            stroke-width="3"
          />
          <circle cx="16" cy="18" r="3" fill="var(--ot-success)" />
          <circle cx="16" cy="50" r="3" class="indicator-blink" fill="var(--ot-danger)" />
          <path d="M42 46H56" stroke="var(--ot-danger)" stroke-width="3" stroke-linecap="round" />
        </svg>
      </div>
    </div>

    <!-- Title and Subtitle -->
    <h2 class="ot-result__title">{{ displayTitle }}</h2>
    <p v-if="subTitle || $slots.subTitle" class="ot-result__subtitle">
      <slot name="subTitle">{{ subTitle }}</slot>
    </p>

    <!-- Slot for extra details or code logs -->
    <div v-if="$slots.default" class="ot-result__content">
      <slot />
    </div>

    <!-- Actions Footer -->
    <div v-if="$slots.extra" class="ot-result__extra">
      <slot name="extra" />
    </div>
  </div>
</template>

<style scoped>
.ot-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--ot-spacing-xl) var(--ot-spacing-lg);
  font-family: var(--ot-font-family);
  animation: result-fade-up var(--ot-transition-slow) cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.ot-result__icon {
  margin-bottom: var(--ot-spacing-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
}

.ot-result__title {
  font-size: var(--ot-font-xl, 1.5rem);
  font-weight: 700;
  color: var(--ot-white, #ffffff);
  margin-bottom: var(--ot-spacing-sm);
}

.ot-result__subtitle {
  font-size: var(--ot-font-sm, 0.875rem);
  color: var(--ot-gray-100, #aab0b7);
  max-width: 480px;
  margin-bottom: var(--ot-spacing-lg);
  line-height: var(--ot-line-height);
}

.ot-result__content {
  background-color: var(--ot-bg-secondary, #1e2029);
  border: 1px solid var(--ot-gray-300, #2a2c34);
  border-radius: var(--ot-radius-base, 8.7px);
  padding: var(--ot-spacing-md);
  margin-bottom: var(--ot-spacing-lg);
  width: 100%;
  max-width: 520px;
  text-align: left;
}

.ot-result__extra {
  display: flex;
  gap: var(--ot-spacing-sm);
  align-items: center;
}

/* Animations */
@keyframes result-fade-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* SVG draw animations */
.circle-draw {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: draw-circle 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.check-draw {
  stroke-dasharray: 50;
  stroke-dashoffset: 50;
  animation: draw-check 0.4s 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.cross-draw {
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
  animation: draw-check 0.4s 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes draw-circle {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes draw-check {
  to {
    stroke-dashoffset: 0;
  }
}

/* 404 Glitch Style */
.glitch-text {
  font-size: 3.5rem;
  font-weight: 900;
  color: var(--ot-danger);
  position: relative;
  text-shadow:
    0.05em 0 0 rgba(255, 0, 0, 0.75),
    -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
    0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  animation: glitch 1.5s infinite;
}

@keyframes glitch {
  0% {
    text-shadow:
      0.05em 0 0 rgba(255, 0, 0, 0.75),
      -0.05em -0.025em 0 rgba(0, 255, 0, 0.75);
  }
  14% {
    text-shadow:
      0.05em 0 0 rgba(255, 0, 0, 0.75),
      -0.05em -0.025em 0 rgba(0, 255, 0, 0.75);
  }
  15% {
    text-shadow:
      -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
      0.025em 0.035em 0 rgba(0, 255, 0, 0.75);
  }
  49% {
    text-shadow:
      -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
      0.025em 0.035em 0 rgba(0, 255, 0, 0.75);
  }
  50% {
    text-shadow:
      0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
      -0.025em 0.05em 0 rgba(0, 255, 0, 0.75);
  }
  99% {
    text-shadow:
      0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
      -0.025em 0.05em 0 rgba(0, 255, 0, 0.75);
  }
  100% {
    text-shadow:
      -0.025em 0 0 rgba(255, 0, 0, 0.75),
      -0.025em -0.025em 0 rgba(0, 255, 0, 0.75);
  }
}

/* 500 Server Rack Style */
.server-rack {
  animation: pulse-rack 2s infinite ease-in-out;
}

.server-rack--broken {
  animation: shake-rack 0.5s infinite alternate;
}

.indicator-blink {
  animation: blink 0.6s infinite alternate;
}

@keyframes pulse-rack {
  0%,
  100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

@keyframes shake-rack {
  0% {
    transform: translateX(-1px);
  }
  100% {
    transform: translateX(1px);
  }
}

@keyframes blink {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
</style>
