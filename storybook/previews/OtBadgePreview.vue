<script setup>
import OtBadge from '../../src/components/OtBadge.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Variants</h3>
      <div class="preview__row">
        <OtBadge variant="primary">Primary</OtBadge>
        <OtBadge variant="secondary">Secondary</OtBadge>
        <OtBadge variant="success">Success</OtBadge>
        <OtBadge variant="warning">Warning</OtBadge>
        <OtBadge variant="danger">Danger</OtBadge>
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Sizes</h3>
      <div class="preview__row">
        <OtBadge size="sm">Small</OtBadge>
        <OtBadge size="md">Medium</OtBadge>
        <OtBadge size="lg">Large</OtBadge>
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Dot Badge</h3>
      <div class="preview__row">
        <OtBadge variant="primary" dot />
        <OtBadge variant="success" dot />
        <OtBadge variant="danger" dot />
      </div>
    </section>
  </div>
</template>
