<script setup>
import { ref } from 'vue'
import OtInput from '../../src/components/OtInput.vue'

const inputModel = ref('')
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Types</h3>
      <div class="preview__col">
        <OtInput v-model="inputModel" placeholder="Text input" />
        <OtInput type="password" placeholder="Password input" />
        <OtInput type="email" placeholder="Email input" />
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Sizes</h3>
      <div class="preview__col">
        <OtInput size="sm" placeholder="Small" />
        <OtInput size="md" placeholder="Medium" />
        <OtInput size="lg" placeholder="Large" />
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">States</h3>
      <div class="preview__col">
        <OtInput placeholder="Normal" />
        <OtInput placeholder="Error" error />
        <OtInput placeholder="Disabled" disabled />
        <OtInput placeholder="Full width" full-width />
      </div>
    </section>
  </div>
</template>
