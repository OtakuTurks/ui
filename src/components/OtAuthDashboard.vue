<script setup>
defineProps({
  user: {
    type: Object,
    default: () => ({ name: '', email: '', avatar: '' })
  },
  navigation: {
    type: Array,
    default: () => []
  },
  activeTab: {
    type: String,
    default: ''
  }
})

defineEmits(['update:activeTab'])
</script>

<template>
  <div class="ot-auth-dashboard">
    <!-- Clean flat sidebar nav -->
    <aside class="ot-auth-dashboard__aside">
      <div class="ot-auth-dashboard__user">
        <img
          v-if="user.avatar"
          :src="user.avatar"
          :alt="user.name"
          class="ot-auth-dashboard__avatar"
        />
        <div class="ot-auth-dashboard__user-info">
          <div class="ot-auth-dashboard__name">{{ user.name }}</div>
          <div class="ot-auth-dashboard__email">{{ user.email }}</div>
        </div>
      </div>

      <nav class="ot-auth-dashboard__nav">
        <button
          v-for="item in navigation"
          :key="item.id"
          class="ot-auth-dashboard__nav-btn"
          :class="{ 'ot-auth-dashboard__nav-btn--active': activeTab === item.id }"
          @click="$emit('update:activeTab', item.id)"
        >
          <span v-if="item.icon" class="ot-auth-dashboard__nav-icon" v-html="item.icon"></span>
          {{ item.label }}
        </button>
      </nav>
    </aside>

    <!-- Content area -->
    <main class="ot-auth-dashboard__main">
      <div class="ot-auth-dashboard__header">
        <h2 class="ot-auth-dashboard__title">
          {{ navigation.find((n) => n.id === activeTab)?.label || 'Overview' }}
        </h2>
      </div>
      <div class="ot-auth-dashboard__content">
        <slot :name="activeTab"></slot>
      </div>
    </main>
  </div>
</template>

<style scoped>
.ot-auth-dashboard {
  display: flex;
  flex-direction: column;
  background-color: var(--ot-bg-primary);
  font-family: var(--ot-font-family);
  min-height: 500px;
  border-radius: var(--ot-radius-base);
}

@media (min-width: 768px) {
  .ot-auth-dashboard {
    flex-direction: row;
  }
}

.ot-auth-dashboard__aside {
  width: 100%;
  background-color: var(--ot-bg-secondary);
  padding: var(--ot-spacing-lg);
  border-right: 1px solid var(--ot-gray-300);
}

@media (min-width: 768px) {
  .ot-auth-dashboard__aside {
    width: 260px;
    border-radius: var(--ot-radius-base) 0 0 var(--ot-radius-base);
  }
}

.ot-auth-dashboard__user {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-sm);
  margin-bottom: var(--ot-spacing-xl);
}

.ot-auth-dashboard__avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--ot-radius-base);
  object-fit: cover;
  background-color: var(--ot-gray-400);
}

.ot-auth-dashboard__user-info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.ot-auth-dashboard__name {
  font-size: var(--ot-font-base);
  font-weight: 600;
  color: var(--ot-white);
}

.ot-auth-dashboard__email {
  font-size: 11px;
  color: var(--ot-gray-200);
}

.ot-auth-dashboard__nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ot-auth-dashboard__nav-btn {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-sm);
  width: 100%;
  padding: 10px 12px;
  background: transparent;
  border: none;
  border-radius: var(--ot-radius-sm);
  color: var(--ot-gray-100);
  font-family: inherit;
  font-size: var(--ot-font-sm);
  text-align: left;
  cursor: pointer;
  transition:
    background-color var(--ot-transition-fast),
    color var(--ot-transition-fast);
}

.ot-auth-dashboard__nav-btn:hover {
  background-color: var(--ot-gray-300);
  color: var(--ot-white);
}

.ot-auth-dashboard__nav-btn--active {
  background-color: var(--ot-gray-300);
  color: var(--ot-primary);
  font-weight: 500;
}

.ot-auth-dashboard__nav-icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ot-auth-dashboard__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--ot-gray-400);
}

@media (min-width: 768px) {
  .ot-auth-dashboard__main {
    border-radius: 0 var(--ot-radius-base) var(--ot-radius-base) 0;
  }
}

.ot-auth-dashboard__header {
  padding: var(--ot-spacing-lg) var(--ot-spacing-xl);
  border-bottom: 1px solid var(--ot-gray-300);
}

.ot-auth-dashboard__title {
  margin: 0;
  font-size: var(--ot-font-lg);
  font-weight: 600;
  color: var(--ot-white);
}

.ot-auth-dashboard__content {
  padding: var(--ot-spacing-xl);
  flex: 1;
}
</style>
