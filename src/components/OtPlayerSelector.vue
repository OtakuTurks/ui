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
  if (ping < 100) return 'var(--ot-success)'
  if (ping < 300) return 'var(--ot-warning)'
  return 'var(--ot-danger)'
}
</script>

<template>
  <div class="ot-player-selector">
    <div class="ot-player-selector__header">
      <span class="ot-player-selector__title">Stream Source</span>
    </div>

    <div class="ot-player-selector__list">
      <button
        v-for="provider in providers"
        :key="provider.id"
        class="ot-provider-item"
        :class="{ 'ot-provider-item--active': provider.id === activeId }"
        @click="$emit('select', provider)"
      >
        <div class="ot-provider-item__main">
          <span
            class="ot-provider-item__ping-dot"
            :style="{ backgroundColor: getPingColor(provider.ping) }"
          ></span>
          <span class="ot-provider-item__name">{{ provider.name }}</span>
          <span v-if="provider.type" class="ot-provider-item__type">{{ provider.type }}</span>
        </div>

        <div class="ot-provider-item__meta">
          <span v-if="provider.quality" class="ot-provider-item__quality">{{
            provider.quality
          }}</span>
          <span class="ot-provider-item__ping-text">{{ provider.ping }}ms</span>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.ot-player-selector {
  width: 100%;
  font-family: var(--ot-font-family);
}

.ot-player-selector__header {
  margin-bottom: var(--ot-spacing-sm);
}

.ot-player-selector__title {
  font-size: var(--ot-font-sm);
  font-weight: 600;
  color: var(--ot-gray-100);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ot-player-selector__list {
  display: flex;
  flex-direction: column;
  gap: var(--ot-spacing-xs);
}

.ot-provider-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--ot-spacing-sm) var(--ot-spacing-md);
  background-color: var(--ot-bg-secondary);
  border: 1px solid var(--ot-gray-300);
  border-radius: var(--ot-radius-base);
  color: var(--ot-gray-200);
  cursor: pointer;
  text-align: left;
  transition: all var(--ot-transition-fast);
  width: 100%;
}

.ot-provider-item:hover {
  background-color: var(--ot-bg-tertiary);
  border-color: var(--ot-gray-200);
  color: var(--ot-white);
}

.ot-provider-item--active {
  border-color: var(--ot-primary);
  background-color: rgba(55, 125, 255, 0.05);
  color: var(--ot-white);
}

.ot-provider-item__main {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-sm);
}

.ot-provider-item__ping-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.ot-provider-item__name {
  font-size: var(--ot-font-sm);
  font-weight: 500;
}

.ot-provider-item__type {
  font-size: 11px;
  color: var(--ot-gray-200);
  background-color: var(--ot-bg-primary);
  padding: 2px 6px;
  border-radius: var(--ot-radius-sm);
}

.ot-provider-item__meta {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-md);
}

.ot-provider-item__quality {
  font-size: 11px;
  font-weight: 600;
  color: var(--ot-white);
  background-color: var(--ot-gray-300);
  padding: 2px 6px;
  border-radius: var(--ot-radius-sm);
}

.ot-provider-item--active .ot-provider-item__quality {
  background-color: var(--ot-primary);
}

.ot-provider-item__ping-text {
  font-size: 11px;
  color: var(--ot-gray-200);
  min-width: 40px;
  text-align: right;
}
</style>
