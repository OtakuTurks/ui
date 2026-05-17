<script setup>
import { ref } from 'vue'
import OtSwitch from '../../src/components/OtSwitch.vue'

const switchModel = ref(false)
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Basic</h3>
      <div class="preview__col">
        <OtSwitch v-model="switchModel" label="Toggle feature" />
        <OtSwitch :model-value="true" label="Enabled" />
        <OtSwitch disabled label="Disabled" />
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Sizes</h3>
      <div class="preview__col">
        <OtSwitch size="sm" label="Small" />
        <OtSwitch size="md" label="Medium" />
        <OtSwitch size="lg" label="Large" />
      </div>
    </section>
  </div>
</template>
