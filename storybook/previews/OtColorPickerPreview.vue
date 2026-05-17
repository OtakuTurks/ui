<script setup>
import OtColorPicker from '../../src/components/OtColorPicker.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Color Selection</h3>
      <div class="preview__row">
        <OtColorPicker modelValue="#3b82f6" />
        <OtColorPicker modelValue="#10b981" disabled />
      </div>
    </section>
  </div>
</template>
