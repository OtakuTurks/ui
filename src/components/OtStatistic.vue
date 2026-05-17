<script setup>
defineProps({
  title: { type: String, required: true },
  value: { type: [String, Number], required: true },
  suffix: { type: String, default: '' },
  prefix: { type: String, default: '' }
})
</script>
<template>
  <div class="ot-statistic">
    <div class="ot-statistic__title">{{ title }}</div>
    <div class="ot-statistic__content">
      <span v-if="prefix" class="ot-statistic__prefix">{{ prefix }}</span>
      <span class="ot-statistic__value">{{ value }}</span>
      <span v-if="suffix" class="ot-statistic__suffix">{{ suffix }}</span>
    </div>
  </div>
</template>
<style scoped>
.ot-statistic {
  display: inline-flex;
  flex-direction: column;
}
.ot-statistic__title {
  font-size: var(--ot-font-sm, 14px);
  color: var(--ot-gray-200, #9ca3af);
  margin-bottom: 4px;
}
.ot-statistic__content {
  display: flex;
  align-items: baseline;
  gap: 4px;
  color: var(--ot-white, #ffffff);
}
.ot-statistic__value {
  font-size: var(--ot-font-2xl, 24px);
  font-weight: 600;
}
.ot-statistic__prefix,
.ot-statistic__suffix {
  font-size: var(--ot-font-md, 16px);
  color: var(--ot-gray-100, #d1d5db);
}
</style>
