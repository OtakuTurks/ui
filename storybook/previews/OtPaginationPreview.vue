<script setup>
import { ref } from 'vue'
import OtPagination from '../../src/components/OtPagination.vue'

const currentPage = ref(1)
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Basic Pagination</h3>
      <div class="preview__row">
        <OtPagination v-model:currentPage="currentPage" :total-pages="10" />
      </div>
    </section>
  </div>
</template>
