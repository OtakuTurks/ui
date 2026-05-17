<script setup>
import OtDivider from '../../src/components/OtDivider.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Horizontal</h3>
      <p>Content above</p>
      <OtDivider />
      <p>Content below</p>
      <br />
      <p>Dashed</p>
      <OtDivider dashed />
    </section>
    <section class="preview__section">
      <h3 class="preview__subtitle">Vertical</h3>
      <div style="display: flex; align-items: center; height: 50px">
        <span>Left</span>
        <OtDivider vertical />
        <span>Right</span>
        <OtDivider vertical dashed />
        <span>Far Right</span>
      </div>
    </section>
  </div>
</template>
