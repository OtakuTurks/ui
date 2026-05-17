<script setup>
defineProps({
  sessions: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['revoke'])
</script>

<template>
  <div class="ot-session-manager">
    <div class="ot-session-manager__header">
      <h3 class="ot-session-manager__title">Active Sessions</h3>
      <p class="ot-session-manager__subtitle">Manage the devices logged into your account.</p>
    </div>

    <div v-if="sessions.length === 0" class="ot-session-manager__empty">
      No active sessions found.
    </div>

    <div v-else class="ot-session-manager__list">
      <div
        v-for="(session, index) in sessions"
        :key="index"
        class="ot-session-item"
        :class="{ 'ot-session-item--current': session.isCurrent }"
      >
        <!-- Device Icon helper -->
        <div class="ot-session-item__icon-wrapper">
          <svg
            v-if="session.device === 'desktop'"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
          <svg
            v-else
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
          </svg>
        </div>

        <!-- Session details -->
        <div class="ot-session-item__details">
          <div class="ot-session-item__title-row">
            <span class="ot-session-item__device-name">
              {{ session.browser || 'Unknown Browser' }} on {{ session.os || 'Unknown OS' }}
            </span>
            <span v-if="session.isCurrent" class="ot-session-item__badge">Current Device</span>
          </div>

          <div class="ot-session-item__meta">
            <span>{{ session.ip || '0.0.0.0' }}</span>
            <span v-if="session.location">&middot; {{ session.location }}</span>
            <span v-if="session.lastActive">&middot; {{ session.lastActive }}</span>
          </div>
        </div>

        <!-- Action Revoke -->
        <button
          v-if="!session.isCurrent"
          class="ot-session-item__revoke-btn"
          :disabled="loading"
          @click="$emit('revoke', session)"
        >
          Revoke
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ot-session-manager {
  width: 100%;
  font-family: var(--ot-font-family);
  background-color: var(--ot-bg-secondary, #1e2029);
  border: 1px solid var(--ot-gray-300, #2a2c34);
  border-radius: var(--ot-radius-xl, 12px);
  padding: var(--ot-spacing-lg, 24px);
}

.ot-session-manager__header {
  margin-bottom: var(--ot-spacing-lg, 24px);
}

.ot-session-manager__title {
  font-size: var(--ot-font-lg, 1.25rem);
  font-weight: 700;
  color: var(--ot-white, #ffffff);
  margin-bottom: var(--ot-spacing-xs, 4px);
}

.ot-session-manager__subtitle {
  font-size: var(--ot-font-sm, 14px);
  color: var(--ot-gray-100, #aab0b7);
}

.ot-session-manager__empty {
  text-align: center;
  color: var(--ot-gray-200, #858a8f);
  padding: var(--ot-spacing-lg) 0;
}

.ot-session-manager__list {
  display: flex;
  flex-direction: column;
  gap: var(--ot-spacing-md, 16px);
}

.ot-session-item {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-md, 16px);
  padding: var(--ot-spacing-md, 16px);
  background-color: var(--ot-bg-primary, #12141d);
  border: 1px solid var(--ot-gray-300, #2a2c34);
  border-radius: var(--ot-radius-base, 8.7px);
  transition: all var(--ot-transition-base, 250ms) ease;
}

.ot-session-item:hover {
  border-color: rgba(255, 255, 255, 0.1);
  background-color: var(--ot-bg-tertiary, #2a2c34);
}

.ot-session-item--current {
  border-color: var(--ot-primary, #377dff);
  background-color: rgba(55, 125, 255, 0.03);
}

.ot-session-item__icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background-color: var(--ot-bg-secondary, #1e2029);
  color: var(--ot-gray-100, #aab0b7);
  border-radius: var(--ot-radius-base, 8.7px);
  border: 1px solid var(--ot-gray-300, #2a2c34);
}

.ot-session-item--current .ot-session-item__icon-wrapper {
  color: var(--ot-primary, #377dff);
  border-color: rgba(55, 125, 255, 0.2);
}

.ot-session-item__details {
  flex: 1;
  min-width: 0;
}

.ot-session-item__title-row {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-sm, 8px);
  margin-bottom: 4px;
}

.ot-session-item__device-name {
  font-size: var(--ot-font-sm, 14px);
  font-weight: 600;
  color: var(--ot-white, #ffffff);
}

.ot-session-item__badge {
  font-size: 10px;
  font-weight: 700;
  color: var(--ot-primary, #377dff);
  background-color: rgba(55, 125, 255, 0.1);
  padding: 2px 6px;
  border-radius: var(--ot-radius-sm, 4px);
  text-transform: uppercase;
}

.ot-session-item__meta {
  font-size: var(--ot-font-xs, 12px);
  color: var(--ot-gray-200, #858a8f);
}

.ot-session-item__revoke-btn {
  background: transparent;
  border: 1px solid var(--ot-danger, #ff715b);
  color: var(--ot-danger, #ff715b);
  font-family: var(--ot-font-family);
  font-size: var(--ot-font-xs, 12px);
  font-weight: 600;
  padding: 6px 12px;
  border-radius: var(--ot-radius-base, 8.7px);
  cursor: pointer;
  transition: all var(--ot-transition-fast, 150ms) ease;
}

.ot-session-item__revoke-btn:hover:not(:disabled) {
  background-color: var(--ot-danger, #ff715b);
  color: var(--ot-white, #ffffff);
  box-shadow: 0 0 10px rgba(255, 113, 91, 0.2);
}

.ot-session-item__revoke-btn:active:not(:disabled) {
  transform: scale(0.95);
}

.ot-session-item__revoke-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
