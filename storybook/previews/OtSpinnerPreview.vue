<script setup>
import OtSpinner from '../../src/components/OtSpinner.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Variants</h3>
      <div
        class="preview__row"
        style="background: var(--ot-gray-400); padding: 16px; border-radius: 8px"
      >
        <OtSpinner variant="primary" />
        <OtSpinner variant="success" />
        <OtSpinner variant="warning" />
        <OtSpinner variant="danger" />
        <OtSpinner variant="white" />
        <OtSpinner variant="secondary" />
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Sizes</h3>
      <div class="preview__row">
        <OtSpinner size="sm" />
        <OtSpinner size="md" />
        <OtSpinner size="lg" />
        <OtSpinner size="xl" />
      </div>
    </section>
  </div>
</template>
