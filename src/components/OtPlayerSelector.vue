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
</script>

<template>
  <div class="ot-player-selector">
    <button
      v-for="provider in providers"
      :key="provider.id"
      class="ot-player-selector__btn"
      :class="{ 'ot-player-selector__btn--active': provider.id === activeId }"
      @click="$emit('select', provider)"
    >
      {{ provider.name }}
    </button>
  </div>
</template>

<style scoped>
.ot-player-selector {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ot-spacing-sm);
  font-family: var(--ot-font-family);
}

.ot-player-selector__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  height: 40px;
  background-color: var(--ot-gray-300);
  color: var(--ot-white);
  border: none;
  border-radius: var(--ot-radius-base);
  font-size: var(--ot-font-sm);
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background-color var(--ot-transition-fast);
}

.ot-player-selector__btn:hover {
  background-color: var(--ot-gray-400);
}

.ot-player-selector__btn--active {
  background-color: var(--ot-primary);
  color: var(--ot-white);
}

.ot-player-selector__btn--active:hover {
  background-color: var(--ot-primary);
}
</style>
