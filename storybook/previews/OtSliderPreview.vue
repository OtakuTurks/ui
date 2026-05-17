<script setup>
import { ref } from 'vue'
import OtSlider from '../../src/components/OtSlider.vue'

const sliderModel = ref(50)
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Basic Slider</h3>
      <div class="preview__col" style="max-width: 400px">
        <OtSlider v-model="sliderModel" show-value />
        <p style="margin-top: 16px; color: var(--ot-gray-200)">Current Value: {{ sliderModel }}</p>
      </div>
    </section>
  </div>
</template>
