<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: true
  },
  menuItems: {
    type: Array,
    default: () => []
  },
  activeItem: {
    type: String,
    default: ''
  }
})

defineEmits(['update:activeItem', 'close'])
</script>

<template>
  <aside class="ot-sidebar" :class="{ 'ot-sidebar--closed': !isOpen }">
    <div class="ot-sidebar__header">
      <slot name="header">
        <span class="ot-sidebar__brand">Dashboard</span>
      </slot>
      <button class="ot-sidebar__close-btn" @click="$emit('close')">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          />
        </svg>
      </button>
    </div>

    <div class="ot-sidebar__content">
      <nav class="ot-sidebar__nav">
        <button
          v-for="item in menuItems"
          :key="item.id"
          class="ot-sidebar__nav-item"
          :class="{ 'ot-sidebar__nav-item--active': activeItem === item.id }"
          @click="$emit('update:activeItem', item.id)"
        >
          <span v-if="item.icon" class="ot-sidebar__icon" v-html="item.icon"></span>
          <span class="ot-sidebar__label">{{ item.label }}</span>
        </button>
      </nav>
    </div>

    <div class="ot-sidebar__footer">
      <slot name="footer"></slot>
    </div>
  </aside>
</template>

<style scoped>
.ot-sidebar {
  width: 250px;
  height: 100vh;
  background-color: var(--ot-bg-secondary);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  transition: transform var(--ot-transition-base);
  z-index: 100;
}

.ot-sidebar--closed {
  transform: translateX(-100%);
}

.ot-sidebar__header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--ot-spacing-md);
  background-color: var(--ot-bg-primary);
}

.ot-sidebar__brand {
  font-weight: 600;
  color: var(--ot-white);
  font-size: var(--ot-font-base);
}

.ot-sidebar__close-btn {
  background: none;
  border: none;
  color: var(--ot-gray-200);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}

.ot-sidebar__close-btn:hover {
  color: var(--ot-white);
}

.ot-sidebar__content {
  flex: 1;
  overflow-y: auto;
  padding: var(--ot-spacing-md) 0;
}

.ot-sidebar__nav {
  display: flex;
  flex-direction: column;
}

.ot-sidebar__nav-item {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-sm);
  width: 100%;
  padding: 12px var(--ot-spacing-md);
  background: none;
  border: none;
  color: var(--ot-gray-100);
  font-family: inherit;
  font-size: var(--ot-font-sm);
  cursor: pointer;
  text-align: left;
  transition:
    background-color var(--ot-transition-fast),
    color var(--ot-transition-fast);
}

.ot-sidebar__nav-item:hover {
  background-color: var(--ot-gray-300);
  color: var(--ot-white);
}

.ot-sidebar__nav-item--active {
  background-color: var(--ot-gray-300);
  color: var(--ot-primary);
  font-weight: 500;
}

.ot-sidebar__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.ot-sidebar__footer {
  padding: var(--ot-spacing-md);
  background-color: var(--ot-bg-primary);
}

@media (min-width: 960px) {
  .ot-sidebar {
    position: sticky;
    top: 0;
  }
  .ot-sidebar__close-btn {
    display: none;
  }
}
</style>
