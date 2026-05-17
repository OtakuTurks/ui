<script setup>
import { inject, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  value: {
    type: [String, Number],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const tabsContext = inject('ot-tabs')

onMounted(() => {
  tabsContext.registerTab({
    value: props.value,
    label: props.label,
    disabled: props.disabled
  })
})
</script>

<template>
  <div v-if="tabsContext.activeTab.value === value" class="ot-tab">
    <slot />
  </div>
</template>

<style scoped>
.ot-tab {
  animation: ot-tab-fade 250ms ease-out;
}

@keyframes ot-tab-fade {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
