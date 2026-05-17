<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  message: { type: String, required: true },
  title: { type: String, default: '' },
  variant: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'success', 'warning', 'danger'].includes(value)
  },
  duration: { type: Number, default: 3000 },
  visible: { type: Boolean, default: false }
})

const emit = defineEmits(['update:visible', 'close'])

let timer = null

const startTimer = () => {
  if (props.duration > 0 && props.visible) {
    timer = setTimeout(() => {
      emit('update:visible', false)
      emit('close')
    }, props.duration)
  }
}

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      startTimer()
    } else {
      clearTimer()
    }
  }
)

onMounted(() => {
  if (props.visible) startTimer()
})

onUnmounted(() => {
  clearTimer()
})

const handleClose = () => {
  clearTimer()
  emit('update:visible', false)
  emit('close')
}
</script>

<template>
  <Transition name="ot-toast">
    <div v-if="visible" class="ot-toast" :class="`ot-toast--${variant}`" role="alert">
      <div class="ot-toast__content">
        <strong v-if="title" class="ot-toast__title">{{ title }}</strong>
        <p class="ot-toast__message">{{ message }}</p>
      </div>
      <button class="ot-toast__close" @click="handleClose" aria-label="Close toast">&times;</button>
    </div>
  </Transition>
</template>

<style scoped>
.ot-toast {
  position: fixed;
  bottom: var(--ot-spacing-lg, 24px);
  right: var(--ot-spacing-lg, 24px);
  min-width: 300px;
  background-color: var(--ot-gray-400, #333);
  color: var(--ot-white, #fff);
  border-radius: var(--ot-radius-base, 8px);
  padding: var(--ot-spacing-md, 16px);
  box-shadow: var(--ot-shadow-lg, 0 10px 15px rgba(0, 0, 0, 0.2));
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  z-index: 9999;
  border-left: 4px solid transparent;
}

.ot-toast--info {
  border-left-color: var(--ot-primary, #3b82f6);
}
.ot-toast--success {
  border-left-color: var(--ot-success, #10b981);
}
.ot-toast--warning {
  border-left-color: var(--ot-warning, #f59e0b);
}
.ot-toast--danger {
  border-left-color: var(--ot-danger, #ef4444);
}

.ot-toast__content {
  flex: 1;
}

.ot-toast__title {
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
}

.ot-toast__message {
  margin: 0;
  font-size: var(--ot-font-sm, 14px);
}

.ot-toast__close {
  background: transparent;
  border: none;
  color: inherit;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  opacity: 0.7;
  padding: 0 0 0 12px;
}

.ot-toast__close:hover {
  opacity: 1;
}

.ot-toast-enter-active,
.ot-toast-leave-active {
  transition: all 0.3s ease;
}

.ot-toast-enter-from,
.ot-toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
