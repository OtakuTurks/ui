<script setup>
import { ref, computed, provide } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null
  },
  variant: {
    type: String,
    default: 'line',
    validator: (value) => ['line', 'pills'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const activeTab = ref(props.modelValue)

const tabs = ref([])

const registerTab = (tab) => {
  tabs.value.push(tab)
  if (activeTab.value === null && tabs.value.length === 1) {
    activeTab.value = tab.value
  }
}

const selectTab = (value) => {
  activeTab.value = value
  emit('update:modelValue', value)
  emit('change', value)
}

provide('ot-tabs', {
  activeTab,
  registerTab,
  selectTab
})

defineExpose({
  tabs,
  activeTab
})
</script>

<template>
  <div class="ot-tabs">
    <div class="ot-tabs__header" :class="`ot-tabs__header--${variant}`">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        class="ot-tabs__tab"
        :class="{
          'ot-tabs__tab--active': activeTab === tab.value,
          'ot-tabs__tab--disabled': tab.disabled
        }"
        :disabled="tab.disabled"
        @click="selectTab(tab.value)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="ot-tabs__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ot-tabs {
  width: 100%;
}

.ot-tabs__header {
  display: flex;
  gap: var(--ot-spacing-xs);
  border-bottom: 1px solid var(--ot-gray-300);
  margin-bottom: var(--ot-spacing-md);
}

.ot-tabs__header--pills {
  border-bottom: none;
  gap: var(--ot-spacing-sm);
  background-color: var(--ot-gray-400);
  padding: var(--ot-spacing-xs);
  border-radius: var(--ot-radius-base);
}

.ot-tabs__tab {
  padding: var(--ot-spacing-sm) var(--ot-spacing-md);
  background: none;
  border: none;
  color: var(--ot-gray-100);
  font-size: var(--ot-font-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--ot-transition-fast);
  position: relative;
  white-space: nowrap;
}

.ot-tabs__tab:hover:not(.ot-tabs__tab--disabled) {
  color: var(--ot-gray-200);
}

.ot-tabs__tab--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Line variant */
.ot-tabs__header--line .ot-tabs__tab--active {
  color: var(--ot-primary);
}

.ot-tabs__header--line .ot-tabs__tab--active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--ot-primary);
}

/* Pills variant */
.ot-tabs__header--pills .ot-tabs__tab {
  border-radius: var(--ot-radius-sm);
}

.ot-tabs__header--pills .ot-tabs__tab--active {
  background-color: var(--ot-primary);
  color: var(--ot-white);
}

.ot-tabs__content {
  padding: var(--ot-spacing-sm) 0;
}
</style>
