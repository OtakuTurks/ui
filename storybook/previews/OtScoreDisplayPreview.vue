<script setup>
import OtScoreDisplay from '../../src/components/OtScoreDisplay.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Score Tiers</h3>
      <div class="preview__row" style="gap: 32px; justify-content: center">
        <OtScoreDisplay :score="9.2" />
        <OtScoreDisplay :score="7.8" />
        <OtScoreDisplay :score="5.5" />
        <OtScoreDisplay :score="3.2" />
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Custom Sizes</h3>
      <div class="preview__row" style="gap: 32px; justify-content: center; align-items: flex-end">
        <OtScoreDisplay :score="8.5" :size="60" :stroke-width="4" />
        <OtScoreDisplay :score="8.5" :size="100" :stroke-width="8" />
        <OtScoreDisplay :score="8.5" :size="120" :stroke-width="10" />
      </div>
    </section>
  </div>
</template>
