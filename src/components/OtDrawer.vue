<script setup>
import { onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  position: {
    type: String,
    default: 'right',
    validator: (v) => ['left', 'right', 'top', 'bottom'].includes(v)
  },
  size: {
    type: String,
    default: 'md'
  },
  closeOnOverlay: { type: Boolean, default: true },
  title: { type: String, default: '' }
})

const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay) handleClose()
}

const handleKeydown = (e) => {
  if (e.key === 'Escape' && props.isOpen) {
    handleClose()
  }
}

watch(
  () => props.isOpen,
  (val) => {
    if (val) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="ot-drawer-fade">
      <div v-if="isOpen" class="ot-drawer-overlay" @click="handleOverlayClick"></div>
    </Transition>

    <Transition :name="`ot-drawer-slide-${position}`">
      <div
        v-if="isOpen"
        class="ot-drawer"
        :class="[`ot-drawer--${position}`, `ot-drawer--${size}`]"
        role="dialog"
        aria-modal="true"
      >
        <div class="ot-drawer__header">
          <h2 v-if="title" class="ot-drawer__title">{{ title }}</h2>
          <slot v-else name="header"></slot>

          <button class="ot-drawer__close" @click="handleClose" aria-label="Close drawer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="ot-drawer__body">
          <slot></slot>
        </div>

        <div v-if="$slots.footer" class="ot-drawer__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ot-drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9990;
  backdrop-filter: blur(4px);
}

.ot-drawer {
  position: fixed;
  background-color: var(--ot-gray-400, #374151);
  z-index: 9991;
  display: flex;
  flex-direction: column;
  box-shadow: var(--ot-shadow-2xl, 0 25px 50px -12px rgba(0, 0, 0, 0.5));
}

/* Positions */
.ot-drawer--right {
  top: 0;
  right: 0;
  height: 100vh;
  border-left: 1px solid var(--ot-gray-300, #4b5563);
}
.ot-drawer--left {
  top: 0;
  left: 0;
  height: 100vh;
  border-right: 1px solid var(--ot-gray-300, #4b5563);
}
.ot-drawer--top {
  top: 0;
  left: 0;
  width: 100vw;
  border-bottom: 1px solid var(--ot-gray-300, #4b5563);
}
.ot-drawer--bottom {
  bottom: 0;
  left: 0;
  width: 100vw;
  border-top: 1px solid var(--ot-gray-300, #4b5563);
}

/* Sizes for Left/Right */
.ot-drawer--right.ot-drawer--sm,
.ot-drawer--left.ot-drawer--sm {
  width: 300px;
}
.ot-drawer--right.ot-drawer--md,
.ot-drawer--left.ot-drawer--md {
  width: 400px;
}
.ot-drawer--right.ot-drawer--lg,
.ot-drawer--left.ot-drawer--lg {
  width: 500px;
}
.ot-drawer--right.ot-drawer--xl,
.ot-drawer--left.ot-drawer--xl {
  width: 600px;
}
.ot-drawer--right.ot-drawer--full,
.ot-drawer--left.ot-drawer--full {
  width: 100vw;
}

/* Sizes for Top/Bottom */
.ot-drawer--top.ot-drawer--sm,
.ot-drawer--bottom.ot-drawer--sm {
  height: 200px;
}
.ot-drawer--top.ot-drawer--md,
.ot-drawer--bottom.ot-drawer--md {
  height: 300px;
}
.ot-drawer--top.ot-drawer--lg,
.ot-drawer--bottom.ot-drawer--lg {
  height: 400px;
}
.ot-drawer--top.ot-drawer--xl,
.ot-drawer--bottom.ot-drawer--xl {
  height: 500px;
}
.ot-drawer--top.ot-drawer--full,
.ot-drawer--bottom.ot-drawer--full {
  height: 100vh;
}

.ot-drawer__header {
  padding: var(--ot-spacing-lg, 24px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--ot-gray-300, #4b5563);
}

.ot-drawer__title {
  margin: 0;
  font-size: var(--ot-font-lg, 18px);
  font-weight: 600;
  color: var(--ot-white, #ffffff);
}

.ot-drawer__close {
  background: transparent;
  border: none;
  color: var(--ot-gray-200, #d1d5db);
  cursor: pointer;
  padding: 4px;
  border-radius: var(--ot-radius-sm, 4px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  margin-left: auto;
}

.ot-drawer__close:hover {
  background-color: var(--ot-gray-300, #4b5563);
  color: var(--ot-white, #ffffff);
}

.ot-drawer__body {
  flex: 1;
  padding: var(--ot-spacing-lg, 24px);
  overflow-y: auto;
}

.ot-drawer__footer {
  padding: var(--ot-spacing-lg, 24px);
  border-top: 1px solid var(--ot-gray-300, #4b5563);
}

/* Animations */
.ot-drawer-fade-enter-active,
.ot-drawer-fade-leave-active {
  transition: opacity 0.3s ease;
}
.ot-drawer-fade-enter-from,
.ot-drawer-fade-leave-to {
  opacity: 0;
}

.ot-drawer-slide-right-enter-active,
.ot-drawer-slide-right-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.ot-drawer-slide-right-enter-from,
.ot-drawer-slide-right-leave-to {
  transform: translateX(100%);
}

.ot-drawer-slide-left-enter-active,
.ot-drawer-slide-left-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.ot-drawer-slide-left-enter-from,
.ot-drawer-slide-left-leave-to {
  transform: translateX(-100%);
}

.ot-drawer-slide-top-enter-active,
.ot-drawer-slide-top-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.ot-drawer-slide-top-enter-from,
.ot-drawer-slide-top-leave-to {
  transform: translateY(-100%);
}

.ot-drawer-slide-bottom-enter-active,
.ot-drawer-slide-bottom-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.ot-drawer-slide-bottom-enter-from,
.ot-drawer-slide-bottom-leave-to {
  transform: translateY(100%);
}
</style>
