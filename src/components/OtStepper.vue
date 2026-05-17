<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 1
  },
  steps: {
    type: Array,
    default: () => []
    // [{ title: String, description?: String, icon?: Component }]
  },
  linear: {
    type: Boolean,
    default: false
  },
  vertical: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const currentStep = ref(props.modelValue)

const isActive = (index) => index === currentStep.value - 1
const isCompleted = (index) => index < currentStep.value - 1
const isClickable = (index) => !props.linear || index < currentStep.value

const goToStep = (index) => {
  if (!isClickable(index)) return
  currentStep.value = index + 1
  emit('update:modelValue', currentStep.value)
  emit('change', currentStep.value)
}

const next = () => {
  if (currentStep.value < props.steps.length) {
    currentStep.value++
    emit('update:modelValue', currentStep.value)
    emit('change', currentStep.value)
  }
}

const prev = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    emit('update:modelValue', currentStep.value)
    emit('change', currentStep.value)
  }
}

watch(
  () => props.modelValue,
  (val) => {
    currentStep.value = val
  }
)

defineExpose({ next, prev, goToStep })
</script>

<template>
  <div class="ot-stepper" :class="{ 'ot-stepper--vertical': vertical }">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="ot-stepper__step"
      :class="{
        'ot-stepper__step--active': isActive(index),
        'ot-stepper__step--completed': isCompleted(index),
        'ot-stepper__step--clickable': isClickable(index)
      }"
    >
      <div class="ot-stepper__header" @click="goToStep(index)">
        <div class="ot-stepper__icon">
          <slot name="icon" :step="step" :index="index">
            <component v-if="step.icon" :is="step.icon" />
            <svg
              v-else-if="isCompleted(index)"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            <span v-else>{{ index + 1 }}</span>
          </slot>
        </div>
        <div class="ot-stepper__info">
          <div class="ot-stepper__title">{{ step.title }}</div>
          <div v-if="step.description" class="ot-stepper__description">
            {{ step.description }}
          </div>
        </div>
      </div>
      <div v-if="index < steps.length - 1" class="ot-stepper__connector" />
    </div>
  </div>
</template>

<style scoped>
.ot-stepper {
  display: flex;
  width: 100%;
}

.ot-stepper--vertical {
  flex-direction: column;
}

.ot-stepper__step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.ot-stepper--vertical .ot-stepper__step {
  align-items: flex-start;
  flex: none;
  padding-bottom: var(--ot-spacing-lg);
}

.ot-stepper--vertical .ot-stepper__step:last-child {
  padding-bottom: 0;
}

.ot-stepper__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--ot-spacing-sm);
  cursor: default;
}

.ot-stepper--vertical .ot-stepper__header {
  flex-direction: row;
  align-items: flex-start;
  gap: var(--ot-spacing-md);
}

.ot-stepper__step--clickable .ot-stepper__header {
  cursor: pointer;
}

.ot-stepper__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--ot-radius-full);
  background-color: var(--ot-gray-400);
  color: var(--ot-gray-100);
  font-weight: 600;
  font-size: var(--ot-font-base);
  transition: all var(--ot-transition-fast);
  border: 2px solid var(--ot-gray-300);
}

.ot-stepper__step--active .ot-stepper__icon {
  background-color: var(--ot-primary);
  border-color: var(--ot-primary);
  color: var(--ot-white);
}

.ot-stepper__step--completed .ot-stepper__icon {
  background-color: var(--ot-primary);
  border-color: var(--ot-primary);
  color: var(--ot-white);
}

.ot-stepper__info {
  text-align: center;
}

.ot-stepper--vertical .ot-stepper__info {
  text-align: left;
}

.ot-stepper__title {
  font-weight: 600;
  font-size: var(--ot-font-sm);
  color: var(--ot-gray-100);
}

.ot-stepper__step--active .ot-stepper__title {
  color: var(--ot-primary);
}

.ot-stepper__step--completed .ot-stepper__title {
  color: var(--ot-gray-200);
}

.ot-stepper__description {
  font-size: var(--ot-font-xs);
  color: var(--ot-gray-100);
  margin-top: 2px;
}

.ot-stepper__connector {
  position: absolute;
  top: 20px;
  left: calc(50% + 24px);
  right: calc(-50% + 24px);
  height: 2px;
  background-color: var(--ot-gray-300);
}

.ot-stepper--vertical .ot-stepper__connector {
  position: absolute;
  top: 44px;
  left: 20px;
  right: auto;
  width: 2px;
  height: calc(100% - 48px);
  background-color: var(--ot-gray-300);
}

.ot-stepper__step--completed .ot-stepper__connector {
  background-color: var(--ot-primary);
}
</style>
