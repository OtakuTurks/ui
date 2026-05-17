<script setup>
const props = defineProps({
  modelValue: { type: [String, Number, Boolean], default: '' },
  value: { type: [String, Number, Boolean], required: true },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

const handleChange = () => {
  if (!props.disabled) {
    emit('update:modelValue', props.value)
  }
}
</script>

<template>
  <label class="ot-radio" :class="{ 'ot-radio--disabled': disabled }">
    <div class="ot-radio__input-wrapper">
      <input
        type="radio"
        class="ot-radio__input"
        :value="value"
        :checked="modelValue === value"
        :disabled="disabled"
        @change="handleChange"
      />
      <div
        class="ot-radio__custom"
        :class="{ 'ot-radio__custom--checked': modelValue === value }"
      ></div>
    </div>
    <span v-if="label || $slots.default" class="ot-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style scoped>
.ot-radio {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: var(--ot-spacing-sm, 8px);
}

.ot-radio--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ot-radio__input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.ot-radio__input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  margin: 0;
  z-index: 1;
}

.ot-radio--disabled .ot-radio__input {
  cursor: not-allowed;
}

.ot-radio__custom {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid var(--ot-gray-300, #4b5563);
  transition: all 0.2s ease;
  position: relative;
  background-color: var(--ot-gray-400, #374151);
}

.ot-radio__custom::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--ot-primary, #3b82f6);
  transition: transform 0.2s ease;
}

.ot-radio__input:focus-visible + .ot-radio__custom {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
}

.ot-radio__custom--checked {
  border-color: var(--ot-primary, #3b82f6);
}

.ot-radio__custom--checked::after {
  transform: translate(-50%, -50%) scale(1);
}

.ot-radio__label {
  font-size: var(--ot-font-sm, 14px);
  color: var(--ot-gray-100, #f3f4f6);
  user-select: none;
}
</style>
