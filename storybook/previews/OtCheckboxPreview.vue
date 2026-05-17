<script setup>
import { ref } from 'vue'
import OtCheckbox from '../../src/components/OtCheckbox.vue'

const checkboxModel = ref(false)
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Basic</h3>
      <div class="preview__col">
        <OtCheckbox v-model="checkboxModel" label="Accept terms and conditions" />
        <OtCheckbox :model-value="true" label="Checked" />
        <OtCheckbox disabled label="Disabled" />
        <OtCheckbox :model-value="true" disabled label="Disabled checked" />
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Indeterminate</h3>
      <div class="preview__col">
        <OtCheckbox indeterminate label="Indeterminate state" />
      </div>
    </section>
  </div>
</template>
