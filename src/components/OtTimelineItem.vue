<script setup>
defineProps({
  title: { type: String, required: true },
  time: { type: String, default: '' },
  active: { type: Boolean, default: false }
})
</script>
<template>
  <div class="ot-timeline-item">
    <div class="ot-timeline-item__tail"></div>
    <div class="ot-timeline-item__node" :class="{ 'ot-timeline-item__node--active': active }"></div>
    <div class="ot-timeline-item__content">
      <div class="ot-timeline-item__title">{{ title }}</div>
      <div v-if="time" class="ot-timeline-item__time">{{ time }}</div>
      <div class="ot-timeline-item__desc"><slot /></div>
    </div>
  </div>
</template>
<style scoped>
.ot-timeline-item {
  position: relative;
  padding-bottom: 24px;
}
.ot-timeline-item:last-child {
  padding-bottom: 0;
}
.ot-timeline-item:last-child .ot-timeline-item__tail {
  display: none;
}
.ot-timeline-item__tail {
  position: absolute;
  top: 12px;
  left: -1px;
  height: 100%;
  width: 2px;
  background-color: var(--ot-gray-300, #4b5563);
}
.ot-timeline-item__node {
  position: absolute;
  top: 4px;
  left: -5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--ot-gray-300, #4b5563);
  border: 2px solid var(--ot-bg-primary, #111827);
}
.ot-timeline-item__node--active {
  background-color: var(--ot-primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}
.ot-timeline-item__content {
  margin-left: 20px;
}
.ot-timeline-item__title {
  font-weight: 500;
  color: var(--ot-white, #ffffff);
  margin-bottom: 4px;
}
.ot-timeline-item__time {
  font-size: 12px;
  color: var(--ot-gray-200, #9ca3af);
  margin-bottom: 8px;
}
.ot-timeline-item__desc {
  font-size: 14px;
  color: var(--ot-gray-100, #d1d5db);
}
</style>
