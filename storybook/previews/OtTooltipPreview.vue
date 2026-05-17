<script setup>
import OtTooltip from '../../src/components/OtTooltip.vue'
import OtButton from '../../src/components/OtButton.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Positions</h3>
      <div class="preview__row" style="gap: 40px">
        <OtTooltip content="Top tooltip" position="top">
          <OtButton>Top</OtButton>
        </OtTooltip>
        <OtTooltip content="Bottom tooltip" position="bottom">
          <OtButton>Bottom</OtButton>
        </OtTooltip>
        <OtTooltip content="Left tooltip" position="left">
          <OtButton>Left</OtButton>
        </OtTooltip>
        <OtTooltip content="Right tooltip" position="right">
          <OtButton>Right</OtButton>
        </OtTooltip>
      </div>
    </section>
  </div>
</template>
