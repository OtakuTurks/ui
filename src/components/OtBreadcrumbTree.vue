<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
    // [{ label: String, icon?: String, disabled?: Boolean }]
  },
  separator: {
    type: String,
    default: '/'
  },
  maxItems: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['click'])

const handleClick = (item, index) => {
  if (!item.disabled) {
    emit('click', { item, index })
  }
}

const visibleItems = computed(() => {
  if (props.maxItems > 0 && props.items.length > props.maxItems) {
    const first = props.items[0]
    const last = props.items.slice(-1)
    return [first, { label: '...', collapsed: true }, ...last]
  }
  return props.items
})
</script>

<template>
  <nav class="ot-breadcrumb" aria-label="Breadcrumb">
    <ol class="ot-breadcrumb__list">
      <li
        v-for="(item, index) in visibleItems"
        :key="index"
        class="ot-breadcrumb__item"
        :class="{
          'ot-breadcrumb__item--disabled': item.disabled,
          'ot-breadcrumb__item--active': index === visibleItems.length - 1,
          'ot-breadcrumb__item--collapsed': item.collapsed
        }"
      >
        <span v-if="index > 0" class="ot-breadcrumb__separator">{{ separator }}</span>
        <span v-if="item.collapsed" class="ot-breadcrumb__collapsed">
          {{ item.label }}
        </span>
        <a v-else class="ot-breadcrumb__link" href="javascript:;" @click="handleClick(item, index)">
          <component v-if="item.icon" :is="item.icon" class="ot-breadcrumb__icon" />
          <span class="ot-breadcrumb__label">{{ item.label }}</span>
        </a>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.ot-breadcrumb {
  font-family: var(--ot-font-family);
}

.ot-breadcrumb__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: var(--ot-spacing-xs);
}

.ot-breadcrumb__item {
  display: flex;
  align-items: center;
}

.ot-breadcrumb__separator {
  color: var(--ot-gray-100);
  margin: 0 var(--ot-spacing-xs);
  user-select: none;
}

.ot-breadcrumb__link {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-xs);
  color: var(--ot-gray-100);
  text-decoration: none;
  font-size: var(--ot-font-sm);
  transition: color var(--ot-transition-fast);
  cursor: pointer;
}

.ot-breadcrumb__link:hover {
  color: var(--ot-primary);
}

.ot-breadcrumb__item--disabled .ot-breadcrumb__link {
  opacity: 0.5;
  cursor: not-allowed;
}

.ot-breadcrumb__item--active .ot-breadcrumb__link {
  color: var(--ot-gray-200);
  font-weight: 600;
  cursor: default;
}

.ot-breadcrumb__icon {
  width: 16px;
  height: 16px;
}

.ot-breadcrumb__label {
  white-space: nowrap;
}

.ot-breadcrumb__collapsed {
  color: var(--ot-gray-100);
  font-size: var(--ot-font-sm);
}
</style>
