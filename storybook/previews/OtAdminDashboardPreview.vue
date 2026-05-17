<script setup>
import { ref } from 'vue'
import OtAdminDashboard from '../../src/components/OtAdminDashboard.vue'
import OtFooter from '../../src/components/OtFooter.vue'

const menuItems = ref([
  {
    id: 'dashboard',
    label: 'Dashboard Overview',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>'
  },
  {
    id: 'users',
    label: 'User Management',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>'
  },
  {
    id: 'content',
    label: 'Content (Series)',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>'
  }
])

const activeItem = ref('dashboard')
</script>

<template>
  <div class="preview" style="padding: 0">
    <!-- Render outside container for full-width layout effect -->
    <div
      style="
        width: 100%;
        border: 1px solid var(--ot-gray-300);
        border-radius: 8px;
        overflow: hidden;
        height: 600px;
        position: relative;
      "
    >
      <OtAdminDashboard :menu-items="menuItems" v-model:activeItem="activeItem">
        <template #header>
          <div style="display: flex; gap: 16px; align-items: center">
            <span style="font-size: 14px; color: var(--ot-gray-200)">Admin Logged In</span>
          </div>
        </template>

        <div style="display: flex; flex-direction: column; gap: 24px; min-height: 400px">
          <h2 style="margin: 0; color: var(--ot-white)">
            {{ menuItems.find((m) => m.id === activeItem)?.label }}
          </h2>
          <div
            style="
              padding: 24px;
              background: var(--ot-bg-secondary);
              border-radius: 6px;
              border: 1px solid var(--ot-gray-300);
            "
          >
            Content for {{ activeItem }} goes here. Very flat and clean Vimox-like design.
          </div>
        </div>

        <!-- Including Footer at the bottom of the layout -->
        <div
          style="
            margin-top: 40px;
            border-top: 1px solid var(--ot-gray-300);
            margin-left: -24px;
            margin-right: -24px;
            margin-bottom: -24px;
          "
        >
          <OtFooter
            copyright="© 2026 Admin Panel."
            :links="[
              { label: 'Help Center', href: '#' },
              { label: 'Terms', href: '#' }
            ]"
          />
        </div>
      </OtAdminDashboard>
    </div>
  </div>
</template>
