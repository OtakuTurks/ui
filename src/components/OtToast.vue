<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  message: { type: String, required: true },
  title: { type: String, default: '' },
  variant: {
    type: String,
    default: 'info'
  },
  duration: { type: Number, default: 3000 }
})

const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <div class="ot-toast" :class="`ot-toast--${variant}`" role="alert">
    <div class="ot-toast__inner">
      <div class="ot-toast__content">
        <strong v-if="title" class="ot-toast__title">{{ title }}</strong>
        <p class="ot-toast__message">{{ message }}</p>
      </div>
      <button class="ot-toast__close" @click="handleClose" aria-label="Close toast">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          />
        </svg>
      </button>
    </div>
    <div v-if="duration > 0" class="ot-toast__progress">
      <div class="ot-toast__progress-bar" :style="{ animationDuration: `${duration}ms` }"></div>
    </div>
  </div>
</template>

<style scoped>
.ot-toast {
  position: relative;
  min-width: 300px;
  max-width: 400px;
  background-color: var(--ot-gray-400, #374151);
  color: var(--ot-white, #fff);
  border-radius: var(--ot-radius-base, 8px);
  box-shadow: var(
    --ot-shadow-lg,
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05)
  );
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.ot-toast__inner {
  padding: var(--ot-spacing-md, 16px);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.ot-toast__content {
  flex: 1;
}

.ot-toast__title {
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
  font-size: var(--ot-font-sm, 14px);
}

.ot-toast__message {
  margin: 0;
  font-size: var(--ot-font-sm, 14px);
  color: var(--ot-gray-100, #9ca3af);
  line-height: 1.4;
}

.ot-toast__close {
  background: transparent;
  border: none;
  color: var(--ot-gray-200, #d1d5db);
  cursor: pointer;
  padding: 4px;
  margin: -4px -4px 0 12px;
  border-radius: var(--ot-radius-sm, 4px);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ot-toast__close:hover {
  background-color: var(--ot-gray-300, #4b5563);
  color: var(--ot-white, #fff);
}

.ot-toast__progress {
  height: 4px;
  background-color: var(--ot-gray-400, #374151);
  width: 100%;
}

.ot-toast__progress-bar {
  height: 100%;
  width: 100%;
  transform-origin: left;
  animation-name: ot-toast-progress;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

/* Variant Colors */
.ot-toast--info .ot-toast__title {
  color: var(--ot-primary, #3b82f6);
}
.ot-toast--info .ot-toast__progress-bar {
  background-color: var(--ot-primary, #3b82f6);
}

.ot-toast--success .ot-toast__title {
  color: var(--ot-success, #10b981);
}
.ot-toast--success .ot-toast__progress-bar {
  background-color: var(--ot-success, #10b981);
}

.ot-toast--warning .ot-toast__title {
  color: var(--ot-warning, #f59e0b);
}
.ot-toast--warning .ot-toast__progress-bar {
  background-color: var(--ot-warning, #f59e0b);
}

.ot-toast--danger .ot-toast__title {
  color: var(--ot-danger, #ef4444);
}
.ot-toast--danger .ot-toast__progress-bar {
  background-color: var(--ot-danger, #ef4444);
}

@keyframes ot-toast-progress {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}
</style>
