<script setup>
defineProps({
  providers: {
    type: Array,
    default: () => []
  },
  activeId: {
    type: [String, Number],
    default: null
  }
})

defineEmits(['select'])

const getPingColor = (ping) => {
  if (ping < 100) return 'var(--ot-success, #2ec4b6)'
  if (ping < 300) return 'var(--ot-warning, #ffb703)'
  return 'var(--ot-danger, #ff715b)'
}
</script>

<template>
  <div class="ot-player-selector">
    <div class="ot-player-selector__header">
      <div class="ot-player-selector__title-wrapper">
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          class="ot-player-selector__title-icon"
        >
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        <span class="ot-player-selector__title">Select Video Source</span>
      </div>
      <span class="ot-player-selector__info">Auto-failover enabled</span>
    </div>

    <div class="ot-player-selector__grid">
      <button
        v-for="provider in providers"
        :key="provider.id"
        class="ot-provider-card"
        :class="{ 'ot-provider-card--active': provider.id === activeId }"
        @click="$emit('select', provider)"
      >
        <div class="ot-provider-card__main">
          <!-- Ping indicator -->
          <span
            class="ot-provider-card__ping-indicator"
            :style="{ backgroundColor: getPingColor(provider.ping) }"
          ></span>

          <div class="ot-provider-card__info">
            <span class="ot-provider-card__name">{{ provider.name }}</span>
            <span class="ot-provider-card__sub">{{ provider.type || 'Fansub' }}</span>
          </div>
        </div>

        <div class="ot-provider-card__meta">
          <!-- Quality Badge -->
          <span class="ot-provider-card__quality">{{ provider.quality || '1080p' }}</span>

          <!-- Ping Text -->
          <span class="ot-provider-card__ping-text">{{ provider.ping }}ms</span>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.ot-player-selector {
  width: 100%;
  font-family: var(--ot-font-family);
  background-color: var(--ot-bg-secondary, #1e2029);
  border: 1px solid var(--ot-gray-300, #2a2c34);
  border-radius: var(--ot-radius-xl, 12px);
  padding: var(--ot-spacing-md, 16px);
}

.ot-player-selector__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--ot-spacing-md, 16px);
}

.ot-player-selector__title-wrapper {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-xs, 6px);
  color: var(--ot-white, #ffffff);
}

.ot-player-selector__title-icon {
  color: var(--ot-primary, #377dff);
}

.ot-player-selector__title {
  font-size: var(--ot-font-sm, 14px);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ot-player-selector__info {
  font-size: 11px;
  color: var(--ot-gray-200, #858a8f);
  background-color: var(--ot-bg-primary, #12141d);
  padding: 2px 8px;
  border-radius: 10px;
  border: 1px solid var(--ot-gray-300, #2a2c34);
}

.ot-player-selector__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--ot-spacing-md, 16px);
}

.ot-provider-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--ot-spacing-md, 14px);
  background-color: var(--ot-bg-primary, #12141d);
  border: 1px solid var(--ot-gray-300, #2a2c34);
  border-radius: var(--ot-radius-base, 8.7px);
  color: var(--ot-white, #ffffff);
  cursor: pointer;
  text-align: left;
  font-family: var(--ot-font-family);
  transition: all var(--ot-transition-base, 250ms) ease;
}

.ot-provider-card:hover {
  border-color: rgba(255, 255, 255, 0.15);
  background-color: var(--ot-bg-tertiary, #2a2c34);
  transform: translateY(-2px);
}

.ot-provider-card--active {
  border-color: var(--ot-primary, #377dff);
  background-color: rgba(55, 125, 255, 0.04);
  box-shadow: 0 0 15px rgba(55, 125, 255, 0.1);
}

.ot-provider-card__main {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-sm, 10px);
  min-width: 0;
}

.ot-provider-card__ping-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 8px currentColor;
}

.ot-provider-card__info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.ot-provider-card__name {
  font-size: var(--ot-font-sm, 14px);
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ot-provider-card__sub {
  font-size: 11px;
  color: var(--ot-gray-200, #858a8f);
}

.ot-provider-card__meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.ot-provider-card__quality {
  font-size: 10px;
  font-weight: 700;
  color: var(--ot-primary, #377dff);
  background-color: rgba(55, 125, 255, 0.1);
  padding: 1px 5px;
  border-radius: 4px;
}

.ot-provider-card--active .ot-provider-card__quality {
  background-color: var(--ot-primary, #377dff);
  color: var(--ot-white, #ffffff);
}

.ot-provider-card__ping-text {
  font-size: 10px;
  color: var(--ot-gray-200, #858a8f);
}
</style>
