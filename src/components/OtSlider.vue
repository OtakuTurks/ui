<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  disabled: { type: Boolean, default: false },
  showValue: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'change'])

const percentage = computed(() => {
  return ((props.modelValue - props.min) / (props.max - props.min)) * 100
})

const handleInput = (e) => {
  const value = Number(e.target.value)
  emit('update:modelValue', value)
}

const handleChange = (e) => {
  emit('change', Number(e.target.value))
}
</script>

<template>
  <div class="ot-slider-wrapper" :class="{ 'ot-slider--disabled': disabled }">
    <div class="ot-slider__container">
      <div class="ot-slider__track"></div>
      <div class="ot-slider__fill" :style="{ width: `${percentage}%` }"></div>
      <input
        type="range"
        class="ot-slider__input"
        :value="modelValue"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        @input="handleInput"
        @change="handleChange"
      />
    </div>
    <span v-if="showValue" class="ot-slider__value">{{ modelValue }}</span>
  </div>
</template>

<style scoped>
.ot-slider-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.ot-slider--disabled {
  opacity: 0.5;
}

.ot-slider__container {
  position: relative;
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
}

.ot-slider__track {
  position: absolute;
  width: 100%;
  height: 6px;
  background-color: var(--ot-gray-300, #4b5563);
  border-radius: 3px;
}

.ot-slider__fill {
  position: absolute;
  height: 6px;
  background-color: var(--ot-primary, #3b82f6);
  border-radius: 3px;
  pointer-events: none;
}

.ot-slider__input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  margin: 0;
}

.ot-slider--disabled .ot-slider__input {
  cursor: not-allowed;
}

/* Pseudo-elements for cross-browser thumb styling */
.ot-slider__input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: var(--ot-white, #ffffff);
  border: 2px solid var(--ot-primary, #3b82f6);
  border-radius: 50%;
  cursor: pointer;
}

.ot-slider__value {
  font-size: var(--ot-font-sm, 14px);
  color: var(--ot-gray-100, #f3f4f6);
  min-width: 32px;
  text-align: right;
}
</style>
