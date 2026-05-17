<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  visibilityHeight: {
    type: Number,
    default: 300
  },
  size: {
    type: Number,
    default: 48
  }
})

const visible = ref(false)
const progress = ref(0)

const calculateScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const docHeight = document.documentElement.scrollHeight - window.innerHeight

  visible.value = scrollTop > props.visibilityHeight

  if (docHeight > 0) {
    progress.value = (scrollTop / docHeight) * 100
  } else {
    progress.value = 0
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Compute stroke properties
const radius = 20
const circumference = 2 * Math.PI * radius

onMounted(() => {
  window.addEventListener('scroll', calculateScroll)
  calculateScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', calculateScroll)
})
</script>

<template>
  <Transition name="ot-back-to-top-fade">
    <button
      v-show="visible"
      class="ot-back-to-top"
      :style="{ width: `${size}px`, height: `${size}px` }"
      aria-label="Back to top"
      @click="scrollToTop"
    >
      <!-- Circular Progress Ring SVG -->
      <svg class="ot-back-to-top__ring" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          :r="radius"
          class="ot-back-to-top__track"
          stroke="rgba(255, 255, 255, 0.08)"
          stroke-width="3.5"
          fill="none"
        />
        <circle
          cx="24"
          cy="24"
          :r="radius"
          class="ot-back-to-top__progress"
          stroke="var(--ot-primary)"
          stroke-width="3.5"
          fill="none"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="circumference - (progress / 100) * circumference"
          transform="rotate(-90 24 24)"
        />
      </svg>

      <!-- Up Arrow Icon -->
      <div class="ot-back-to-top__arrow">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </div>
    </button>
  </Transition>
</template>

<style scoped>
.ot-back-to-top {
  position: fixed;
  bottom: 32px;
  right: 32px;
  border-radius: var(--ot-radius-full, 999px);
  background-color: var(--ot-bg-secondary, #1e2029);
  border: 1px solid var(--ot-gray-300, #2a2c34);
  box-shadow:
    var(--ot-shadow-lg),
    0 0 12px rgba(55, 125, 255, 0.15);
  cursor: pointer;
  z-index: var(--ot-z-fixed, 300);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  outline: none;
  transition: all var(--ot-transition-base, 250ms) cubic-bezier(0.4, 0, 0.2, 1);
}

.ot-back-to-top:hover {
  transform: translateY(-4px) scale(1.05);
  background-color: var(--ot-bg-tertiary, #2a2c34);
  box-shadow:
    var(--ot-shadow-lg),
    0 0 16px rgba(55, 125, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.15);
}

.ot-back-to-top:active {
  transform: scale(0.95);
}

.ot-back-to-top__ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.ot-back-to-top__progress {
  transition: stroke-dashoffset 0.1s linear;
}

.ot-back-to-top__arrow {
  color: var(--ot-white, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Hover transitions */
.ot-back-to-top:hover .ot-back-to-top__arrow {
  animation: float-up 0.5s infinite alternate ease-in-out;
}

@keyframes float-up {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-2px);
  }
}

/* Fade transitions */
.ot-back-to-top-fade-enter-active,
.ot-back-to-top-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.ot-back-to-top-fade-enter-from,
.ot-back-to-top-fade-leave-to {
  opacity: 0;
  transform: scale(0.5) rotate(45deg);
}
</style>
