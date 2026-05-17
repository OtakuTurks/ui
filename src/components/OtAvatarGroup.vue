<script setup>
import { computed } from 'vue'
import OtAvatar from './OtAvatar.vue'

const props = defineProps({
  avatars: {
    type: Array,
    default: () => []
  },
  max: {
    type: Number,
    default: 4
  },
  size: {
    type: [String, Number],
    default: 'md'
  },
  spacing: {
    type: String,
    default: 'md',
    validator: (val) => ['sm', 'md', 'lg'].includes(val)
  }
})

const visibleAvatars = computed(() => {
  if (!props.avatars) return []
  return props.avatars.slice(0, props.max)
})

const excessCount = computed(() => {
  if (!props.avatars) return 0
  return Math.max(0, props.avatars.length - props.max)
})
</script>

<template>
  <div class="ot-avatar-group" :class="[`ot-avatar-group--spacing-${spacing}`]">
    <!-- Statically passed list -->
    <template v-if="avatars && avatars.length > 0">
      <div
        v-for="(avatar, index) in visibleAvatars"
        :key="index"
        class="ot-avatar-group__item"
        :style="{ zIndex: avatars.length - index }"
      >
        <OtAvatar
          :src="avatar.src"
          :name="avatar.name"
          :size="size"
          :color="avatar.color || 'primary'"
        />
      </div>

      <!-- Excess Counter -->
      <div
        v-if="excessCount > 0"
        class="ot-avatar-group__item ot-avatar-group__excess"
        :style="{ zIndex: 0 }"
      >
        <OtAvatar :name="`+${excessCount}`" :size="size" color="secondary" />
      </div>
    </template>

    <!-- Slot-based markup -->
    <slot v-else />
  </div>
</template>

<style scoped>
.ot-avatar-group {
  display: inline-flex;
  align-items: center;
}

.ot-avatar-group__item {
  position: relative;
  border-radius: var(--ot-radius-full, 999px);
  box-shadow: 0 0 0 3px var(--ot-bg-primary, #12141d);
  transition: all var(--ot-transition-base, 250ms) ease;
}

.ot-avatar-group__item:hover {
  transform: translateY(-4px) scale(1.05);
  z-index: 99 !important; /* Bring to front on hover */
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.4),
    0 0 0 3px var(--ot-primary);
}

.ot-avatar-group__excess :deep(.ot-avatar) {
  background-color: var(--ot-bg-tertiary, #2a2c34);
  color: var(--ot-gray-100, #aab0b7);
  font-weight: 700;
}

/* Spacings */
.ot-avatar-group--spacing-sm .ot-avatar-group__item + .ot-avatar-group__item {
  margin-left: -8px;
}

.ot-avatar-group--spacing-md .ot-avatar-group__item + .ot-avatar-group__item {
  margin-left: -14px;
}

.ot-avatar-group--spacing-lg .ot-avatar-group__item + .ot-avatar-group__item {
  margin-left: -20px;
}
</style>
