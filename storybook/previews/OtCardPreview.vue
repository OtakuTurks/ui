<script setup>
import OtCard from '../../src/components/OtCard.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Variants</h3>
      <div class="preview__row" style="gap: 16px">
        <OtCard variant="elevated" style="width: 200px">
          <h4 style="color: var(--ot-gray-200); margin-bottom: 8px">Elevated</h4>
          <p style="color: var(--ot-gray-100); font-size: 14px">Card with shadow elevation</p>
        </OtCard>
        <OtCard variant="outlined" style="width: 200px">
          <h4 style="color: var(--ot-gray-200); margin-bottom: 8px">Outlined</h4>
          <p style="color: var(--ot-gray-100); font-size: 14px">Card with border</p>
        </OtCard>
        <OtCard variant="filled" style="width: 200px">
          <h4 style="color: var(--ot-gray-200); margin-bottom: 8px">Filled</h4>
          <p style="color: var(--ot-gray-100); font-size: 14px">Card with filled background</p>
        </OtCard>
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Hoverable</h3>
      <div class="preview__row">
        <OtCard variant="elevated" hoverable style="width: 200px">
          <p style="color: var(--ot-gray-200)">Hover over me!</p>
        </OtCard>
      </div>
    </section>
  </div>
</template>
