<script setup>
import OtButton from '../../src/components/OtButton.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Variants</h3>
      <div class="preview__row">
        <OtButton variant="primary">Primary</OtButton>
        <OtButton variant="secondary">Secondary</OtButton>
        <OtButton variant="danger">Danger</OtButton>
        <OtButton variant="warning">Warning</OtButton>
        <OtButton variant="success">Success</OtButton>
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Sizes</h3>
      <div class="preview__row">
        <OtButton size="sm">Small</OtButton>
        <OtButton size="md">Medium</OtButton>
        <OtButton size="lg">Large</OtButton>
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">States</h3>
      <div class="preview__row">
        <OtButton>Normal</OtButton>
        <OtButton disabled>Disabled</OtButton>
        <OtButton full-width>Full Width</OtButton>
      </div>
    </section>
  </div>
</template>
