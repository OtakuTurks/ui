<script setup>
import { ref } from 'vue'
import OtRadio from '../../src/components/OtRadio.vue'

const radioModel = ref('opt1')
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Radio Group</h3>
      <div class="preview__row">
        <OtRadio v-model="radioModel" value="opt1" label="Option 1" />
        <OtRadio v-model="radioModel" value="opt2" label="Option 2" />
        <OtRadio v-model="radioModel" value="opt3" label="Disabled Option" disabled />
      </div>
      <p style="margin-top: 16px; color: var(--ot-gray-200)">Selected: {{ radioModel }}</p>
    </section>
  </div>
</template>
