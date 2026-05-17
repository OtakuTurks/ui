<script setup>
import OtStatistic from '../../src/components/OtStatistic.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Statistics</h3>
      <div class="preview__row">
        <OtStatistic title="Active Users" value="124,592" />
        <OtStatistic title="Revenue" value="84,200" prefix="$" />
        <OtStatistic title="Growth" value="12.5" suffix="%" />
      </div>
    </section>
  </div>
</template>
