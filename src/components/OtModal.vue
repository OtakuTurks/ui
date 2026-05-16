<script setup>
import { watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl', 'full'].includes(value)
  },
  closeOnOverlay: {
    type: Boolean,
    default: true
  },
  closeOnEscape: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    close()
  }
}

const handleEscape = (event) => {
  if (props.closeOnEscape && event.key === 'Escape' && props.isOpen) {
    close()
  }
}

watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="ot-modal">
      <div v-if="isOpen" class="ot-modal-overlay" @click.self="handleOverlayClick">
        <div class="ot-modal" :class="`ot-modal--${size}`">
          <button class="ot-modal__close" @click="close" aria-label="Close modal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
          <div class="ot-modal__content">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ot-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--ot-z-modal-backdrop);
  padding: var(--ot-spacing-lg);
}

.ot-modal {
  background-color: var(--ot-gray-400);
  border-radius: var(--ot-radius-lg);
  box-shadow: var(--ot-shadow-lg);
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  position: relative;
  z-index: var(--ot-z-modal);
  animation: ot-modal-scale 350ms ease-out;
}

@keyframes ot-modal-scale {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Sizes */
.ot-modal--sm {
  width: 100%;
  max-width: 400px;
}

.ot-modal--md {
  width: 100%;
  max-width: 600px;
}

.ot-modal--lg {
  width: 100%;
  max-width: 800px;
}

.ot-modal--xl {
  width: 100%;
  max-width: 1000px;
}

.ot-modal--full {
  width: calc(100% - 48px);
  max-width: none;
  height: calc(100vh - 48px);
}

/* Close Button */
.ot-modal__close {
  position: absolute;
  top: var(--ot-spacing-md);
  right: var(--ot-spacing-md);
  background: transparent;
  border: none;
  color: var(--ot-gray-100);
  cursor: pointer;
  padding: var(--ot-spacing-xs);
  border-radius: var(--ot-radius-sm);
  transition: color var(--ot-transition-fast), background-color var(--ot-transition-fast);
  z-index: 1;
}

.ot-modal__close:hover {
  color: var(--ot-white);
  background-color: var(--ot-gray-300);
}

/* Content */
.ot-modal__content {
  padding: var(--ot-spacing-lg);
}

/* Transitions */
.ot-modal-enter-active,
.ot-modal-leave-active {
  transition: opacity var(--ot-transition-base);
}

.ot-modal-enter-from,
.ot-modal-leave-to {
  opacity: 0;
}

.ot-modal-enter-active .ot-modal,
.ot-modal-leave-active .ot-modal {
  transition: transform var(--ot-transition-base), opacity var(--ot-transition-base);
}

.ot-modal-enter-from .ot-modal,
.ot-modal-leave-to .ot-modal {
  transform: scale(0.95);
  opacity: 0;
}
</style>
