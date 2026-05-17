<script setup>
import { ref } from 'vue'
import OtCopyButton from './OtCopyButton.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'otakuturks ~ bash'
  },
  height: {
    type: String,
    default: '280px'
  },
  showCopy: {
    type: Boolean,
    default: true
  },
  copyText: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="ot-terminal" :style="{ height }">
    <!-- Terminal Header Bar -->
    <div class="ot-terminal__header">
      <div class="ot-terminal__actions">
        <span class="ot-terminal__dot ot-terminal__dot--close"></span>
        <span class="ot-terminal__dot ot-terminal__dot--minimize"></span>
        <span class="ot-terminal__dot ot-terminal__dot--maximize"></span>
      </div>
      <div class="ot-terminal__title">{{ title }}</div>
      <div class="ot-terminal__copy" v-if="showCopy && copyText">
        <OtCopyButton :text="copyText" variant="secondary" size="sm" />
      </div>
      <div class="ot-terminal__copy-spacer" v-else></div>
    </div>

    <!-- Terminal Content Viewport -->
    <div class="ot-terminal__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ot-terminal {
  display: flex;
  flex-direction: column;
  background-color: var(--ot-bg-primary, #12141d);
  border: 1px solid var(--ot-gray-300, #2a2c34);
  border-radius: var(--ot-radius-lg, 12px);
  overflow: hidden;
  box-shadow:
    var(--ot-shadow-lg),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  font-family: 'Fira Code', 'Courier New', Courier, monospace;
  text-align: left;
}

.ot-terminal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--ot-bg-secondary, #1e2029);
  padding: var(--ot-spacing-sm) var(--ot-spacing-md);
  border-bottom: 1px solid var(--ot-gray-300, #2a2c34);
  user-select: none;
}

.ot-terminal__actions {
  display: flex;
  gap: 8px;
  width: 80px;
}

.ot-terminal__dot {
  width: 12px;
  height: 12px;
  border-radius: var(--ot-radius-full, 999px);
}

.ot-terminal__dot--close {
  background-color: var(--ot-danger, #ff715b);
}
.ot-terminal__dot--minimize {
  background-color: var(--ot-warning, #ffbe3d);
}
.ot-terminal__dot--maximize {
  background-color: var(--ot-success, #2dca8c);
}

.ot-terminal__title {
  color: var(--ot-gray-100, #aab0b7);
  font-size: var(--ot-font-xs, 12px);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ot-terminal__copy {
  display: flex;
  justify-content: flex-end;
  width: 80px;
}

.ot-terminal__copy-spacer {
  width: 80px;
}

.ot-terminal__body {
  flex: 1;
  padding: var(--ot-spacing-md);
  overflow-y: auto;
  color: #a6accd;
  font-size: 14px;
  line-height: 1.6;
}

/* Custom styles inside terminal slot */
.ot-terminal__body :deep(p) {
  margin-bottom: 8px;
}

.ot-terminal__body :deep(.prompt) {
  color: var(--ot-primary, #377dff);
  font-weight: 700;
  margin-right: 8px;
}

.ot-terminal__body :deep(.command) {
  color: var(--ot-white, #ffffff);
  font-weight: 500;
}

.ot-terminal__body :deep(.error) {
  color: var(--ot-danger, #ff715b);
}

.ot-terminal__body :deep(.success) {
  color: var(--ot-success, #2dca8c);
}

.ot-terminal__body :deep(.comment) {
  color: var(--ot-gray-200, #858a8f);
  font-style: italic;
}
</style>
