<script setup>
import OtFileInput from '../../src/components/OtFileInput.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">File Upload</h3>
      <OtFileInput multiple accept="image/*" />
    </section>
  </div>
</template>
