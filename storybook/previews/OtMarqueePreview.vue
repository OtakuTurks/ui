<script setup>
import OtMarquee from '../../src/components/OtMarquee.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Horizontal Infinite Loop Slider</h3>
      <div class="preview__col" style="gap: 24px">
        <div>
          <p style="margin-bottom: 8px; color: var(--ot-gray-100)">
            Default (Left, Speed 20s, Pause on Hover)
          </p>
          <OtMarquee :speed="15">
            <span
              style="font-size: 18px; font-weight: bold; color: var(--ot-primary); padding: 0 20px"
              >🔥 One Piece</span
            >
            <span
              style="font-size: 18px; font-weight: bold; color: var(--ot-success); padding: 0 20px"
              >⚡ Naruto</span
            >
            <span
              style="font-size: 18px; font-weight: bold; color: var(--ot-danger); padding: 0 20px"
              >👑 Attack on Titan</span
            >
            <span
              style="font-size: 18px; font-weight: bold; color: var(--ot-warning); padding: 0 20px"
              >⚔️ Bleach</span
            >
            <span
              style="font-size: 18px; font-weight: bold; color: var(--ot-primary); padding: 0 20px"
              >🌌 Demon Slayer</span
            >
          </OtMarquee>
        </div>

        <div>
          <p style="margin-bottom: 8px; color: var(--ot-gray-100)">
            Reverse Direction (Right, Speed 10s)
          </p>
          <OtMarquee direction="right" :speed="10">
            <span
              style="font-size: 18px; font-weight: bold; color: var(--ot-danger); padding: 0 20px"
              >🔥 Jujutsu Kaisen</span
            >
            <span
              style="font-size: 18px; font-weight: bold; color: var(--ot-warning); padding: 0 20px"
              >⚡ Hunter x Hunter</span
            >
            <span
              style="font-size: 18px; font-weight: bold; color: var(--ot-success); padding: 0 20px"
              >👑 Death Note</span
            >
            <span
              style="font-size: 18px; font-weight: bold; color: var(--ot-primary); padding: 0 20px"
              >⚔️ Chainsaw Man</span
            >
          </OtMarquee>
        </div>
      </div>
    </section>
  </div>
</template>
