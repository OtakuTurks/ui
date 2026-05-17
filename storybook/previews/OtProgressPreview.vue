<script setup>
import { ref } from 'vue'
import OtProgress from '../../src/components/OtProgress.vue'

const progressValue = ref(65)
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Variants</h3>
      <div class="preview__col" style="max-width: 400px; gap: 24px">
        <OtProgress :value="65" variant="primary" show-label />
        <OtProgress :value="80" variant="success" show-label />
        <OtProgress :value="45" variant="warning" show-label />
        <OtProgress :value="30" variant="danger" show-label />
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Sizes</h3>
      <div class="preview__col" style="max-width: 400px; gap: 24px">
        <OtProgress :value="70" size="sm" />
        <OtProgress :value="70" size="md" />
        <OtProgress :value="70" size="lg" />
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Striped & Animated</h3>
      <div class="preview__col" style="max-width: 400px; gap: 24px">
        <OtProgress :value="60" striped />
        <OtProgress :value="75" striped animated />
      </div>
    </section>
  </div>
</template>
