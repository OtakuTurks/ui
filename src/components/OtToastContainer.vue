<script setup>
import { useToast } from '../composables/useToast'
import OtToast from './OtToast.vue'

const { toasts, remove } = useToast()
</script>

<template>
  <div class="ot-toast-container">
    <TransitionGroup name="ot-toast-list">
      <OtToast
        v-for="toast in toasts"
        :key="toast.id"
        :title="toast.title"
        :message="toast.message"
        :variant="toast.variant"
        :duration="toast.duration"
        @close="remove(toast.id)"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.ot-toast-container {
  position: fixed;
  bottom: var(--ot-spacing-lg, 24px);
  right: var(--ot-spacing-lg, 24px);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: var(--ot-spacing-sm, 12px);
  pointer-events: none; /* Let clicks pass through container */
}

.ot-toast-container > * {
  pointer-events: auto; /* Re-enable clicks on toasts */
}

.ot-toast-list-enter-active,
.ot-toast-list-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.ot-toast-list-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

.ot-toast-list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.ot-toast-list-move {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
