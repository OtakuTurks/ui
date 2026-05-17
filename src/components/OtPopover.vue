<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  position: {
    type: String,
    default: 'bottom',
    validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value)
  },
  trigger: {
    type: String,
    default: 'click',
    validator: (value) => ['click', 'hover'].includes(value)
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: 'auto'
  }
})

const emit = defineEmits(['open', 'close'])

const visible = ref(false)
const triggerRef = ref(null)
const popoverRef = ref(null)

const popoverStyle = computed(() => {
  const style = {}
  if (typeof props.width === 'number') {
    style.width = `${props.width}px`
  } else {
    style.width = props.width
  }
  return style
})

const toggle = () => {
  visible.value = !visible.value
  visible.value ? emit('open') : emit('close')
}

const show = () => {
  if (props.trigger === 'hover') {
    visible.value = true
    emit('open')
  }
}

const hide = () => {
  if (props.trigger === 'hover') {
    visible.value = false
    emit('close')
  }
}

const handleClickOutside = (event) => {
  if (
    visible.value &&
    triggerRef.value &&
    popoverRef.value &&
    !triggerRef.value.contains(event.target) &&
    !popoverRef.value.contains(event.target)
  ) {
    visible.value = false
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div
    ref="triggerRef"
    class="ot-popover-trigger"
    @click="trigger === 'click' && toggle()"
    @mouseenter="show"
    @mouseleave="hide"
  >
    <slot name="trigger" />
    <Teleport to="body">
      <Transition name="ot-popover">
        <div
          v-if="visible"
          ref="popoverRef"
          class="ot-popover"
          :class="`ot-popover--${position}`"
          :style="popoverStyle"
        >
          <div v-if="title" class="ot-popover__title">{{ title }}</div>
          <div class="ot-popover__content">
            <slot>{{ content }}</slot>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.ot-popover-trigger {
  display: inline-block;
  position: relative;
}

.ot-popover {
  position: fixed;
  background-color: var(--ot-gray-400);
  border-radius: var(--ot-radius-base);
  box-shadow: var(--ot-shadow-lg);
  z-index: var(--ot-z-popover);
  max-width: 320px;
}

.ot-popover__title {
  padding: var(--ot-spacing-sm) var(--ot-spacing-md);
  font-weight: 600;
  font-size: var(--ot-font-sm);
  color: var(--ot-gray-200);
  border-bottom: 1px solid var(--ot-gray-300);
}

.ot-popover__content {
  padding: var(--ot-spacing-md);
  font-size: var(--ot-font-sm);
  color: var(--ot-gray-200);
}

/* Transitions */
.ot-popover-enter-active,
.ot-popover-leave-active {
  transition: all var(--ot-transition-fast);
}

.ot-popover-enter-from,
.ot-popover-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
