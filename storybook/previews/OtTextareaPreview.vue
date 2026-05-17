<script setup>
import { ref } from 'vue'
import OtTextarea from '../../src/components/OtTextarea.vue'

const textareaModel = ref('')
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Basic Textarea</h3>
      <div class="preview__col" style="max-width: 400px">
        <OtTextarea
          v-model="textareaModel"
          placeholder="Write your message here..."
          :maxLength="200"
        />
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">States</h3>
      <div class="preview__col" style="max-width: 400px; gap: 16px">
        <OtTextarea placeholder="Error state" error />
        <OtTextarea placeholder="Disabled state" disabled />
      </div>
    </section>
  </div>
</template>
