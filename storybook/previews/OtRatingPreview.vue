<script setup>
import OtRating from '../../src/components/OtRating.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Interactive</h3>
      <OtRating :modelValue="3" />
    </section>
    <section class="preview__section">
      <h3 class="preview__subtitle">Readonly</h3>
      <OtRating :modelValue="4" readonly />
    </section>
  </div>
</template>
