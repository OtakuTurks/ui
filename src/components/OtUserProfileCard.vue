<script setup>
import { computed } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    default: () => ({})
  }
})

const xpPercent = computed(() => {
  if (!props.user || !props.user.xp || !props.user.maxXp) return 0
  return Math.min(100, Math.max(0, (props.user.xp / props.user.maxXp) * 100))
})

const getRankGlowColor = (tier) => {
  switch (tier?.toLowerCase()) {
    case 'legend':
      return '0 0 15px rgba(230, 57, 70, 0.6)'
    case 'gold':
      return '0 0 15px rgba(255, 183, 3, 0.6)'
    case 'silver':
      return '0 0 15px rgba(135, 206, 235, 0.6)'
    default:
      return '0 0 10px rgba(55, 125, 255, 0.4)'
  }
}

const getRankBorderColor = (tier) => {
  switch (tier?.toLowerCase()) {
    case 'legend':
      return '#e63946'
    case 'gold':
      return '#ffb703'
    case 'silver':
      return '#87ceeb'
    default:
      return '#377dff'
  }
}
</script>

<template>
  <div class="ot-user-profile-card">
    <!-- Banner Cover -->
    <div
      class="ot-profile-banner"
      :style="{
        backgroundImage: `url(${user.banner || 'https://thumbs2.imgbox.com/3c/69/qfWnI7bU_t.jpg'})`
      }"
    >
      <div class="ot-profile-banner__overlay"></div>
    </div>

    <!-- Main details -->
    <div class="ot-profile-content">
      <!-- Avatar Section -->
      <div class="ot-avatar-section">
        <div
          class="ot-avatar-ring"
          :style="{
            boxShadow: getRankGlowColor(user.tier),
            borderColor: getRankBorderColor(user.tier)
          }"
        >
          <img
            :src="user.avatar || 'https://i.pravatar.cc/150?img=12'"
            :alt="user.username"
            class="ot-profile-avatar"
          />
        </div>

        <div class="ot-profile-title">
          <div class="ot-profile-name-row">
            <h2 class="ot-profile-username">{{ user.username || 'Mysterious Otaku' }}</h2>
            <span
              v-if="user.tier"
              class="ot-profile-tier"
              :style="{
                color: getRankBorderColor(user.tier),
                backgroundColor: `${getRankBorderColor(user.tier)}15`
              }"
            >
              {{ user.tier }}
            </span>
          </div>
          <span class="ot-profile-status">{{ user.status || 'Active Member' }}</span>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="ot-profile-stats">
        <div class="ot-stat-item">
          <span class="ot-stat-value">{{ user.episodesWatched || 0 }}</span>
          <span class="ot-stat-label">Episodes Watched</span>
        </div>
        <div class="ot-stat-item">
          <span class="ot-stat-value">{{ user.mangaRead || 0 }}</span>
          <span class="ot-stat-label">Manga Read</span>
        </div>
        <div class="ot-stat-item">
          <span class="ot-stat-value">{{ user.commentsCount || 0 }}</span>
          <span class="ot-stat-label">Comments</span>
        </div>
      </div>

      <!-- XP Progression System -->
      <div class="ot-profile-xp">
        <div class="ot-xp-header">
          <span class="ot-xp-level">Level {{ user.level || 1 }}</span>
          <span class="ot-xp-fraction">{{ user.xp || 0 }} / {{ user.maxXp || 100 }} XP</span>
        </div>

        <div class="ot-xp-bar-bg">
          <div
            class="ot-xp-bar-fill"
            :style="{
              width: `${xpPercent}%`,
              boxShadow: `0 0 10px ${getRankBorderColor(user.tier)}`
            }"
          ></div>
        </div>
      </div>

      <!-- Achievements Row -->
      <div v-if="user.achievements && user.achievements.length" class="ot-profile-achievements">
        <div class="ot-achievements-title">Achievements Unlocked</div>
        <div class="ot-achievements-list">
          <div
            v-for="(badge, index) in user.achievements"
            :key="index"
            class="ot-achievement-badge"
            :title="badge.description"
          >
            <span class="ot-achievement-icon">{{ badge.icon || '🏆' }}</span>
            <span class="ot-achievement-name">{{ badge.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ot-user-profile-card {
  width: 100%;
  font-family: var(--ot-font-family);
  background-color: var(--ot-bg-secondary, #1e2029);
  border: 1px solid var(--ot-gray-300, #2a2c34);
  border-radius: var(--ot-radius-xl, 12px);
  overflow: hidden;
}

.ot-profile-banner {
  height: 160px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.ot-profile-banner__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(30, 32, 41, 0.2), rgba(30, 32, 41, 0.95));
}

.ot-profile-content {
  padding: 0 var(--ot-spacing-lg, 24px) var(--ot-spacing-lg, 24px) var(--ot-spacing-lg, 24px);
  position: relative;
  margin-top: -50px;
}

.ot-avatar-section {
  display: flex;
  align-items: flex-end;
  gap: var(--ot-spacing-md, 16px);
  margin-bottom: var(--ot-spacing-lg, 24px);
}

.ot-avatar-ring {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid var(--ot-primary, #377dff);
  padding: 3px;
  background-color: var(--ot-bg-secondary, #1e2029);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
}

.ot-profile-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.ot-profile-title {
  margin-bottom: 8px;
}

.ot-profile-name-row {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-sm, 8px);
}

.ot-profile-username {
  font-size: 20px;
  font-weight: 800;
  color: var(--ot-white, #ffffff);
  margin: 0;
}

.ot-profile-tier {
  font-size: 10px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ot-profile-status {
  font-size: var(--ot-font-sm, 14px);
  color: var(--ot-gray-100, #aab0b7);
}

.ot-profile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--ot-spacing-sm, 12px);
  background-color: var(--ot-bg-primary, #12141d);
  padding: var(--ot-spacing-md, 16px);
  border-radius: var(--ot-radius-base, 8.7px);
  border: 1px solid var(--ot-gray-300, #2a2c34);
  margin-bottom: var(--ot-spacing-lg, 24px);
}

.ot-stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.ot-stat-value {
  font-size: var(--ot-font-lg, 1.25rem);
  font-weight: 800;
  color: var(--ot-white, #ffffff);
}

.ot-stat-label {
  font-size: 11px;
  color: var(--ot-gray-200, #858a8f);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
}

.ot-profile-xp {
  margin-bottom: var(--ot-spacing-lg, 24px);
}

.ot-xp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--ot-font-sm, 14px);
  font-weight: 700;
  margin-bottom: 6px;
}

.ot-xp-level {
  color: var(--ot-white, #ffffff);
}

.ot-xp-fraction {
  color: var(--ot-gray-100, #aab0b7);
}

.ot-xp-bar-bg {
  height: 8px;
  background-color: var(--ot-bg-primary, #12141d);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--ot-gray-300, #2a2c34);
}

.ot-xp-bar-fill {
  height: 100%;
  background-color: var(--ot-primary, #377dff);
  border-radius: 4px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.ot-profile-achievements {
  border-top: 1px solid var(--ot-gray-300, #2a2c34);
  padding-top: var(--ot-spacing-md, 16px);
}

.ot-achievements-title {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--ot-gray-200, #858a8f);
  letter-spacing: 0.5px;
  margin-bottom: var(--ot-spacing-sm, 10px);
}

.ot-achievements-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ot-spacing-sm, 8px);
}

.ot-achievement-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: var(--ot-bg-primary, #12141d);
  border: 1px solid var(--ot-gray-300, #2a2c34);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: var(--ot-font-xs, 12px);
  color: var(--ot-white, #ffffff);
  cursor: help;
  transition: all var(--ot-transition-fast, 150ms) ease;
}

.ot-achievement-badge:hover {
  background-color: var(--ot-bg-tertiary, #2a2c34);
  border-color: rgba(255, 255, 255, 0.15);
}
</style>
