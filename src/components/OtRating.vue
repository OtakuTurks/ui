<script setup>
const props = defineProps({
  modelValue: { type: Number, default: 0 },
  max: { type: Number, default: 5 },
  readonly: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])
const setRating = (val) => {
  if (!props.readonly) emit('update:modelValue', val)
}
</script>
<template>
  <div class="ot-rating" :class="{ 'ot-rating--readonly': readonly }">
    <button
      v-for="i in max"
      :key="i"
      type="button"
      class="ot-rating__star"
      :class="{ 'ot-rating__star--active': i <= modelValue }"
      @click="setRating(i)"
      :disabled="readonly"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
    </button>
  </div>
</template>
<style scoped>
.ot-rating {
  display: inline-flex;
  gap: 4px;
}
.ot-rating__star {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--ot-gray-300, #4b5563);
  transition:
    color 0.2s,
    transform 0.1s;
}
.ot-rating:not(.ot-rating--readonly) .ot-rating__star:hover {
  transform: scale(1.1);
}
.ot-rating__star--active {
  color: var(--ot-warning, #f59e0b);
}
.ot-rating--readonly .ot-rating__star {
  cursor: default;
}
</style>
