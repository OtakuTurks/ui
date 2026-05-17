<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  position: {
    type: String,
    default: 'top',
    validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value)
  },
  delay: {
    type: Number,
    default: 200
  }
})

const visible = ref(false)
const triggerRef = ref(null)
const timeout = ref(null)

const show = () => {
  timeout.value = setTimeout(() => {
    visible.value = true
  }, props.delay)
}

const hide = () => {
  clearTimeout(timeout.value)
  visible.value = false
}
</script>

<template>
  <div
    ref="triggerRef"
    class="ot-tooltip-wrapper"
    @mouseenter="show"
    @mouseleave="hide"
    @focus="show"
    @blur="hide"
  >
    <slot />
    <Transition name="ot-tooltip">
      <div v-if="visible" class="ot-tooltip" :class="`ot-tooltip--${position}`" role="tooltip">
        {{ content }}
        <div class="ot-tooltip__arrow"></div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.ot-tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.ot-tooltip {
  position: absolute;
  background-color: var(--ot-gray-500);
  color: var(--ot-white);
  padding: 6px 12px;
  border-radius: var(--ot-radius-base);
  font-size: var(--ot-font-xs);
  white-space: nowrap;
  z-index: var(--ot-z-tooltip);
  box-shadow: var(--ot-shadow-base);
}

/* Positions */
.ot-tooltip--top {
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
}

.ot-tooltip--bottom {
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
}

.ot-tooltip--left {
  right: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
}

.ot-tooltip--right {
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
}

/* Arrow */
.ot-tooltip__arrow {
  position: absolute;
  width: 0;
  height: 0;
  border: 6px solid transparent;
}

.ot-tooltip--top .ot-tooltip__arrow {
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  border-top-color: var(--ot-gray-500);
}

.ot-tooltip--bottom .ot-tooltip__arrow {
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  border-bottom-color: var(--ot-gray-500);
}

.ot-tooltip--left .ot-tooltip__arrow {
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
  border-left-color: var(--ot-gray-500);
}

.ot-tooltip--right .ot-tooltip__arrow {
  left: -12px;
  top: 50%;
  transform: translateY(-50%);
  border-right-color: var(--ot-gray-500);
}

/* Transitions */
.ot-tooltip-enter-active,
.ot-tooltip-leave-active {
  transition:
    opacity var(--ot-transition-fast),
    transform var(--ot-transition-fast);
}

.ot-tooltip-enter-from,
.ot-tooltip-leave-to {
  opacity: 0;
}

.ot-tooltip--top.ot-tooltip-enter-from,
.ot-tooltip--top.ot-tooltip-leave-to {
  transform: translateX(-50%) translateY(4px);
}

.ot-tooltip--bottom.ot-tooltip-enter-from,
.ot-tooltip--bottom.ot-tooltip-leave-to {
  transform: translateX(-50%) translateY(-4px);
}

.ot-tooltip--left.ot-tooltip-enter-from,
.ot-tooltip--left.ot-tooltip-leave-to {
  transform: translateY(-50%) translateX(4px);
}

.ot-tooltip--right.ot-tooltip-enter-from,
.ot-tooltip--right.ot-tooltip-leave-to {
  transform: translateY(-50%) translateX(-4px);
}
</style>
