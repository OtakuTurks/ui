<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [0, 100],
    validator: (value) => Array.isArray(value) && value.length === 2
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  showValues: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const sliderRef = ref(null)
const activeThumb = ref(null)

const value1 = computed(() => props.modelValue[0])
const value2 = computed(() => props.modelValue[1])

const percent1 = computed(() => ((value1.value - props.min) / (props.max - props.min)) * 100)
const percent2 = computed(() => ((value2.value - props.min) / (props.max - props.min)) * 100)

const updateValue = (index, newValue) => {
  const clampedValue = Math.max(props.min, Math.min(props.max, newValue))
  const roundedValue = Math.round(clampedValue / props.step) * props.step

  const newValues = [...props.modelValue]
  newValues[index] = roundedValue

  // Ensure min is always less than max
  if (newValues[0] > newValues[1]) {
    if (index === 0) {
      newValues[1] = newValues[0]
    } else {
      newValues[0] = newValues[1]
    }
  }

  emit('update:modelValue', newValues)
  emit('change', newValues)
}

const handleInput1 = (event) => {
  updateValue(0, parseFloat(event.target.value))
}

const handleInput2 = (event) => {
  updateValue(1, parseFloat(event.target.value))
}
</script>

<template>
  <div
    class="ot-range-slider"
    :class="[`ot-range-slider--${size}`, { 'ot-range-slider--disabled': disabled }]"
  >
    <div v-if="showValues" class="ot-range-slider__values">
      <span class="ot-range-slider__value">{{ value1 }}</span>
      <span class="ot-range-slider__value">{{ value2 }}</span>
    </div>
    <div ref="sliderRef" class="ot-range-slider__track">
      <div
        class="ot-range-slider__fill"
        :style="{
          left: `${percent1}%`,
          width: `${percent2 - percent1}%`
        }"
      />
      <input
        type="range"
        class="ot-range-slider__thumb ot-range-slider__thumb--min"
        :value="value1"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        :style="{ left: `${percent1}%` }"
        @input="handleInput1"
      />
      <input
        type="range"
        class="ot-range-slider__thumb ot-range-slider__thumb--max"
        :value="value2"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        :style="{ left: `${percent2}%` }"
        @input="handleInput2"
      />
    </div>
  </div>
</template>

<style scoped>
.ot-range-slider {
  width: 100%;
  user-select: none;
}

.ot-range-slider--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ot-range-slider__values {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--ot-spacing-sm);
}

.ot-range-slider__value {
  font-size: var(--ot-font-sm);
  font-weight: 600;
  color: var(--ot-gray-200);
  background-color: var(--ot-gray-400);
  padding: 4px 12px;
  border-radius: var(--ot-radius-sm);
}

.ot-range-slider__track {
  position: relative;
  width: 100%;
  background-color: var(--ot-gray-300);
  border-radius: var(--ot-radius-full);
}

.ot-range-slider--sm .ot-range-slider__track {
  height: 4px;
}

.ot-range-slider--md .ot-range-slider__track {
  height: 6px;
}

.ot-range-slider--lg .ot-range-slider__track {
  height: 8px;
}

.ot-range-slider__fill {
  position: absolute;
  top: 0;
  height: 100%;
  background-color: var(--ot-primary);
  border-radius: var(--ot-radius-full);
  pointer-events: none;
}

.ot-range-slider__thumb {
  position: absolute;
  top: 50%;
  width: 20px;
  height: 20px;
  appearance: none;
  background: var(--ot-primary);
  border: 3px solid var(--ot-white);
  border-radius: 50%;
  cursor: pointer;
  transform: translate(-50%, -50%);
  z-index: 2;
  outline: none;
  transition: box-shadow var(--ot-transition-fast);
}

.ot-range-slider__thumb::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  background: var(--ot-primary);
  border: 3px solid var(--ot-white);
  border-radius: 50%;
  cursor: pointer;
}

.ot-range-slider__thumb::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: var(--ot-primary);
  border: 3px solid var(--ot-white);
  border-radius: 50%;
  cursor: pointer;
}

.ot-range-slider__thumb:hover {
  box-shadow: 0 0 0 4px rgba(55, 125, 255, 0.2);
}

.ot-range-slider__thumb:focus {
  box-shadow: 0 0 0 4px rgba(55, 125, 255, 0.3);
}

.ot-range-slider--disabled .ot-range-slider__thumb {
  cursor: not-allowed;
  background: var(--ot-gray-300);
}

.ot-range-slider--sm .ot-range-slider__thumb,
.ot-range-slider--sm .ot-range-slider__thumb::-webkit-slider-thumb,
.ot-range-slider--sm .ot-range-slider__thumb::-moz-range-thumb {
  width: 16px;
  height: 16px;
}

.ot-range-slider--lg .ot-range-slider__thumb,
.ot-range-slider--lg .ot-range-slider__thumb::-webkit-slider-thumb,
.ot-range-slider--lg .ot-range-slider__thumb::-moz-range-thumb {
  width: 24px;
  height: 24px;
}
</style>
