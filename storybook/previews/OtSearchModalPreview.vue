<script setup>
import { ref } from 'vue'
import OtButton from '../../src/components/OtButton.vue'

const searchModalOpen = ref(false)
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Search Modal</h3>
      <div class="preview__row">
        <OtButton @click="searchModalOpen = true">Open Search (Ctrl+K)</OtButton>
      </div>
    </section>
  </div>
</template>
