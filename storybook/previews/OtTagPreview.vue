<script setup>
import OtTag from '../../src/components/OtTag.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Variants</h3>
      <div class="preview__row">
        <OtTag variant="primary">Primary</OtTag>
        <OtTag variant="secondary">Secondary</OtTag>
        <OtTag variant="success">Success</OtTag>
        <OtTag variant="warning">Warning</OtTag>
        <OtTag variant="danger">Danger</OtTag>
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Sizes</h3>
      <div class="preview__row">
        <OtTag size="sm">Small</OtTag>
        <OtTag size="md">Medium</OtTag>
        <OtTag size="lg">Large</OtTag>
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Removable</h3>
      <div class="preview__row">
        <OtTag variant="primary" removable @remove="() => {}">Removable</OtTag>
        <OtTag variant="danger" removable @remove="() => {}">Delete</OtTag>
      </div>
    </section>
  </div>
</template>
