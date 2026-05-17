<script setup>
import { ref } from 'vue'
import OtSidebar from './OtSidebar.vue'

defineProps({
  menuItems: {
    type: Array,
    default: () => []
  },
  activeItem: {
    type: String,
    default: ''
  }
})

defineEmits(['update:activeItem'])

const isSidebarOpen = ref(true)
</script>

<template>
  <div class="ot-admin-dashboard">
    <!-- Sidebar -->
    <OtSidebar
      :is-open="isSidebarOpen"
      :menu-items="menuItems"
      :active-item="activeItem"
      @update:active-item="$emit('update:activeItem', $event)"
      @close="isSidebarOpen = false"
    >
      <template #header>
        <slot name="sidebar-header">
          <span class="ot-admin-dashboard__brand">Admin Panel</span>
        </slot>
      </template>
      <template #footer>
        <slot name="sidebar-footer"></slot>
      </template>
    </OtSidebar>

    <!-- Main Content -->
    <main class="ot-admin-dashboard__main">
      <header class="ot-admin-dashboard__header">
        <button class="ot-admin-dashboard__menu-btn" @click="isSidebarOpen = true">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>
        <div class="ot-admin-dashboard__header-content">
          <slot name="header"></slot>
        </div>
      </header>

      <div class="ot-admin-dashboard__content">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<style scoped>
.ot-admin-dashboard {
  display: flex;
  min-height: 100vh;
  background-color: var(--ot-bg-primary);
  font-family: var(--ot-font-family);
}

.ot-admin-dashboard__brand {
  font-size: var(--ot-font-lg);
  font-weight: 700;
  color: var(--ot-white);
}

.ot-admin-dashboard__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0; /* Prevents overflow */
}

.ot-admin-dashboard__header {
  height: 60px;
  background-color: var(--ot-bg-primary);
  border-bottom: 1px solid var(--ot-gray-300);
  display: flex;
  align-items: center;
  padding: 0 var(--ot-spacing-lg);
  position: sticky;
  top: 0;
  z-index: 10;
}

.ot-admin-dashboard__menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--ot-gray-100);
  cursor: pointer;
  margin-right: var(--ot-spacing-md);
  padding: 4px;
}

.ot-admin-dashboard__menu-btn:hover {
  color: var(--ot-white);
}

.ot-admin-dashboard__header-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.ot-admin-dashboard__content {
  padding: var(--ot-spacing-xl);
  flex: 1;
}

@media (max-width: 959px) {
  .ot-admin-dashboard__menu-btn {
    display: flex;
  }
}
</style>
