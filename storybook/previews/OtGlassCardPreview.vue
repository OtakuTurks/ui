<script setup>
import OtGlassCard from '../../src/components/OtGlassCard.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Glassmorphism Visuals</h3>
      <div class="preview__row" style="gap: 32px">
        <OtGlassCard style="width: 320px" glow-color="#377dff">
          <h4 style="margin-bottom: 8px">Zoro Roronoa</h4>
          <p style="font-size: 14px; opacity: 0.8; margin-bottom: 16px">
            The legendary swordsman who fights with three swords.
          </p>
          <div style="display: flex; justify-content: space-between; align-items: center">
            <span style="font-size: 12px; font-weight: bold; color: var(--ot-success)"
              >Lvl. 99</span
            >
            <span style="font-size: 12px; opacity: 0.6">Power: 9200</span>
          </div>
        </OtGlassCard>

        <OtGlassCard style="width: 320px" glow-color="#ff715b">
          <h4 style="margin-bottom: 8px">Monkey D. Luffy</h4>
          <p style="font-size: 14px; opacity: 0.8; margin-bottom: 16px">
            The pirate captain who aims to find the One Piece.
          </p>
          <div style="display: flex; justify-content: space-between; align-items: center">
            <span style="font-size: 12px; font-weight: bold; color: var(--ot-danger)"
              >Lvl. 100</span
            >
            <span style="font-size: 12px; opacity: 0.6">Power: 9999</span>
          </div>
        </OtGlassCard>
      </div>
    </section>
  </div>
</template>
