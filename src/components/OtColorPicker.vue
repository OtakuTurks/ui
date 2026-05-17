<script setup>
defineProps({
  modelValue: { type: String, default: '#000000' },
  disabled: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <div class="ot-color-picker" :class="{ 'ot-color-picker--disabled': disabled }">
    <input
      type="color"
      class="ot-color-picker__input"
      :value="modelValue"
      :disabled="disabled"
      @input="emit('update:modelValue', $event.target.value)"
    />
    <span class="ot-color-picker__hex">{{ modelValue }}</span>
  </div>
</template>
<style scoped>
.ot-color-picker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
  background-color: var(--ot-gray-400, #374151);
  border: 1px solid var(--ot-gray-300, #4b5563);
  border-radius: var(--ot-radius-base, 8px);
}
.ot-color-picker--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.ot-color-picker__input {
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: none;
}
.ot-color-picker__input::-webkit-color-swatch-wrapper {
  padding: 0;
}
.ot-color-picker__input::-webkit-color-swatch {
  border: 1px solid var(--ot-gray-300, #4b5563);
  border-radius: 4px;
}
.ot-color-picker__hex {
  font-family: monospace;
  font-size: 14px;
  color: var(--ot-white, #fff);
  text-transform: uppercase;
  padding-right: 8px;
}
</style>
