<script setup>
import OtGrid from '../../src/components/OtGrid.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Fixed Columns</h3>
      <OtGrid :cols="3" :gap="16">
        <div class="grid-item">1</div>
        <div class="grid-item">2</div>
        <div class="grid-item">3</div>
        <div class="grid-item">4</div>
        <div class="grid-item">5</div>
        <div class="grid-item">6</div>
      </OtGrid>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Responsive Grid</h3>
      <OtGrid :cols="{ xs: 1, sm: 2, md: 3, lg: 4 }" :gap="16">
        <div class="grid-item">1</div>
        <div class="grid-item">2</div>
        <div class="grid-item">3</div>
        <div class="grid-item">4</div>
      </OtGrid>
    </section>
  </div>
</template>
