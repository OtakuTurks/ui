<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  size: {
    type: [String, Number],
    default: 'md',
    validator: (value) => {
      if (typeof value === 'number') return true
      return ['sm', 'md', 'lg', 'xl'].includes(value)
    }
  },
  color: {
    type: String,
    default: 'primary'
  }
})

const emit = defineEmits(['click'])

const sizeMap = {
  sm: 24,
  md: 40,
  lg: 56,
  xl: 80
}

const avatarSize = computed(() => {
  if (typeof props.size === 'number') return props.size
  return sizeMap[props.size] || sizeMap.md
})

const initials = computed(() => {
  if (!props.name) return ''
  const names = props.name.trim().split(' ')
  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase()
  }
  return props.name.substring(0, 2).toUpperCase()
})

const fontSize = computed(() => {
  const size = avatarSize.value
  if (size <= 24) return 'var(--ot-font-xs)'
  if (size <= 40) return 'var(--ot-font-sm)'
  if (size <= 56) return 'var(--ot-font-base)'
  return 'var(--ot-font-lg)'
})

const style = computed(() => ({
  width: `${avatarSize.value}px`,
  height: `${avatarSize.value}px`,
  fontSize: fontSize.value,
  backgroundColor: props.src ? 'transparent' : `var(--ot-${props.color})`
}))
</script>

<template>
  <div
    class="ot-avatar"
    :style="style"
    @click="$emit('click')"
  >
    <img
      v-if="src"
      :src="src"
      :alt="name"
      class="ot-avatar__image"
      @error="$event.target.style.display = 'none'"
    />
    <span v-else class="ot-avatar__initials">{{ initials }}</span>
  </div>
</template>

<style scoped>
.ot-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--ot-radius-full);
  overflow: hidden;
  flex-shrink: 0;
  font-weight: 600;
  color: var(--ot-white);
  position: relative;
}

.ot-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.ot-avatar__initials {
  user-select: none;
}
</style>
