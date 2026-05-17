<script setup>
import { ref } from 'vue'
import OtButton from '../../src/components/OtButton.vue'
import OtModal from '../../src/components/OtModal.vue'

const modalOpen = ref(false)
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Modal</h3>
      <div class="preview__row">
        <OtButton @click="modalOpen = true">Open Modal</OtButton>
      </div>
    </section>

    <OtModal :is-open="modalOpen" @close="modalOpen = false">
      <h2 style="margin-bottom: 16px; color: var(--ot-gray-200)">Modal Title</h2>
      <p style="color: var(--ot-gray-200)">
        This is a modal content. You can put any content here.
      </p>
      <div style="margin-top: 24px; display: flex; gap: 8px">
        <OtButton variant="secondary" @click="modalOpen = false">Cancel</OtButton>
        <OtButton @click="modalOpen = false">Confirm</OtButton>
      </div>
    </OtModal>
  </div>
</template>
