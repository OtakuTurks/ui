<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  steps: {
    type: Array,
    default: () => []
    // [{ title: String, description?: String, icon?: Component }]
  },
  modelValue: {
    type: Number,
    default: 0
  },
  linear: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'next', 'prev', 'finish', 'cancel'])

const currentStep = ref(props.modelValue)

const isFirstStep = computed(() => currentStep.value === 0)
const isLastStep = computed(() => currentStep.value === props.steps.length - 1)

const canGoNext = computed(() => !props.linear || currentStep.value < props.steps.length - 1)
const canGoPrev = computed(() => currentStep.value > 0)

const goToStep = (index) => {
  if (props.linear && index > currentStep.value) return
  if (index < 0 || index >= props.steps.length) return

  currentStep.value = index
  emit('update:modelValue', index)
  emit('change', index)
}

const next = () => {
  if (isLastStep.value) {
    emit('finish')
    return
  }

  if (canGoNext.value) {
    currentStep.value++
    emit('update:modelValue', currentStep.value)
    emit('change', currentStep.value)
    emit('next', currentStep.value)
  }
}

const prev = () => {
  if (canGoPrev.value) {
    currentStep.value--
    emit('update:modelValue', currentStep.value)
    emit('change', currentStep.value)
    emit('prev', currentStep.value)
  }
}

const cancel = () => {
  emit('cancel')
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
  <div class="ot-wizard">
    <div class="ot-wizard__header">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="ot-wizard__step"
        :class="{
          'ot-wizard__step--active': index === currentStep,
          'ot-wizard__step--completed': index < currentStep,
          'ot-wizard__step--clickable': !linear || index <= currentStep
        }"
        @click="goToStep(index)"
      >
        <div class="ot-wizard__step-icon">
          <component v-if="step.icon" :is="step.icon" />
          <svg
            v-else-if="index < currentStep"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          <span v-else>{{ index + 1 }}</span>
        </div>
        <div class="ot-wizard__step-content">
          <div class="ot-wizard__step-title">{{ step.title }}</div>
          <div v-if="step.description" class="ot-wizard__step-description">
            {{ step.description }}
          </div>
        </div>
        <div v-if="index < steps.length - 1" class="ot-wizard__connector" />
      </div>
    </div>

    <div class="ot-wizard__body">
      <slot :step="currentStep" :data="steps[currentStep]" />
    </div>

    <div class="ot-wizard__footer">
      <slot name="footer" :step="currentStep" :prev="prev" :next="next" :cancel="cancel">
        <button
          v-if="!isFirstStep"
          type="button"
          class="ot-wizard__btn ot-wizard__btn--secondary"
          @click="prev"
        >
          Previous
        </button>
        <button
          v-else
          type="button"
          class="ot-wizard__btn ot-wizard__btn--secondary"
          @click="cancel"
        >
          Cancel
        </button>
        <button type="button" class="ot-wizard__btn ot-wizard__btn--primary" @click="next">
          {{ isLastStep ? 'Finish' : 'Next' }}
        </button>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.ot-wizard {
  width: 100%;
}

.ot-wizard__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--ot-spacing-xl);
  padding: 0 var(--ot-spacing-lg);
}

.ot-wizard__step {
  display: flex;
  align-items: flex-start;
  position: relative;
  flex: 1;
  cursor: default;
}

.ot-wizard__step--clickable {
  cursor: pointer;
}

.ot-wizard__step-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--ot-radius-full);
  background-color: var(--ot-gray-400);
  color: var(--ot-gray-100);
  font-weight: 600;
  font-size: var(--ot-font-sm);
  border: 2px solid var(--ot-gray-300);
  transition: all var(--ot-transition-fast);
  flex-shrink: 0;
}

.ot-wizard__step--active .ot-wizard__step-icon {
  background-color: var(--ot-primary);
  border-color: var(--ot-primary);
  color: var(--ot-white);
}

.ot-wizard__step--completed .ot-wizard__step-icon {
  background-color: var(--ot-primary);
  border-color: var(--ot-primary);
  color: var(--ot-white);
}

.ot-wizard__step-content {
  margin-left: var(--ot-spacing-sm);
}

.ot-wizard__step-title {
  font-size: var(--ot-font-sm);
  font-weight: 600;
  color: var(--ot-gray-100);
}

.ot-wizard__step--active .ot-wizard__step-title {
  color: var(--ot-primary);
}

.ot-wizard__step--completed .ot-wizard__step-title {
  color: var(--ot-gray-200);
}

.ot-wizard__step-description {
  font-size: var(--ot-font-xs);
  color: var(--ot-gray-100);
  margin-top: 2px;
}

.ot-wizard__connector {
  position: absolute;
  top: 18px;
  left: calc(18px + var(--ot-spacing-md));
  right: calc(-50% + 18px);
  height: 2px;
  background-color: var(--ot-gray-300);
}

.ot-wizard__step--completed .ot-wizard__connector {
  background-color: var(--ot-primary);
}

.ot-wizard__body {
  padding: var(--ot-spacing-lg);
  background-color: var(--ot-gray-400);
  border-radius: var(--ot-radius-lg);
  min-height: 200px;
}

.ot-wizard__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--ot-spacing-sm);
  margin-top: var(--ot-spacing-lg);
}

.ot-wizard__btn {
  padding: 10px 24px;
  font-size: var(--ot-font-sm);
  font-weight: 600;
  border: none;
  border-radius: var(--ot-radius-base);
  cursor: pointer;
  transition: all var(--ot-transition-fast);
}

.ot-wizard__btn--primary {
  background-color: var(--ot-primary);
  color: var(--ot-white);
}

.ot-wizard__btn--primary:hover {
  background-color: var(--ot-primary-hover);
}

.ot-wizard__btn--secondary {
  background-color: var(--ot-gray-300);
  color: var(--ot-gray-200);
}

.ot-wizard__btn--secondary:hover {
  background-color: var(--ot-gray-400);
}
</style>
