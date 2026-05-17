<script setup>
defineProps({
  user: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <div class="ot-user-profile-card">
    <div class="ot-user-profile-card__header">
      <img
        v-if="user.avatar"
        :src="user.avatar"
        :alt="user.username"
        class="ot-user-profile-card__avatar"
      />
      <div v-else class="ot-user-profile-card__avatar-placeholder">
        {{ user.username ? user.username.charAt(0).toUpperCase() : 'U' }}
      </div>

      <div class="ot-user-profile-card__info">
        <h3 class="ot-user-profile-card__username">{{ user.username || 'User' }}</h3>
        <div class="ot-user-profile-card__meta">
          <span v-if="user.tier" class="ot-user-profile-card__tier">{{ user.tier }}</span>
          <span v-if="user.status" class="ot-user-profile-card__status">{{ user.status }}</span>
        </div>
      </div>
    </div>

    <div v-if="user.stats" class="ot-user-profile-card__stats">
      <div v-for="(value, label) in user.stats" :key="label" class="ot-user-profile-card__stat">
        <span class="ot-user-profile-card__stat-value">{{ value }}</span>
        <span class="ot-user-profile-card__stat-label">{{ label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ot-user-profile-card {
  background-color: var(--ot-gray-400);
  border: 1px solid var(--ot-gray-300);
  border-radius: var(--ot-radius-lg);
  padding: var(--ot-spacing-lg);
  font-family: var(--ot-font-family);
  display: flex;
  flex-direction: column;
  gap: var(--ot-spacing-lg);
}

.ot-user-profile-card__header {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-md);
}

.ot-user-profile-card__avatar,
.ot-user-profile-card__avatar-placeholder {
  width: 64px;
  height: 64px;
  border-radius: var(--ot-radius-full);
  flex-shrink: 0;
}

.ot-user-profile-card__avatar {
  object-fit: cover;
}

.ot-user-profile-card__avatar-placeholder {
  background-color: var(--ot-bg-tertiary);
  color: var(--ot-gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--ot-font-xl);
  font-weight: 600;
}

.ot-user-profile-card__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ot-user-profile-card__username {
  margin: 0;
  font-size: var(--ot-font-lg);
  font-weight: 600;
  color: var(--ot-white);
}

.ot-user-profile-card__meta {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-sm);
}

.ot-user-profile-card__tier {
  font-size: 11px;
  font-weight: 600;
  color: var(--ot-primary);
  background-color: rgba(55, 125, 255, 0.1);
  padding: 2px 8px;
  border-radius: var(--ot-radius-full);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ot-user-profile-card__status {
  font-size: var(--ot-font-sm);
  color: var(--ot-gray-200);
}

.ot-user-profile-card__stats {
  display: flex;
  gap: var(--ot-spacing-lg);
  padding-top: var(--ot-spacing-md);
  border-top: 1px solid var(--ot-gray-300);
}

.ot-user-profile-card__stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ot-user-profile-card__stat-value {
  font-size: var(--ot-font-base);
  font-weight: 600;
  color: var(--ot-white);
}

.ot-user-profile-card__stat-label {
  font-size: 11px;
  color: var(--ot-gray-200);
  text-transform: capitalize;
}
</style>
