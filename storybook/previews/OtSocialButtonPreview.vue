<script setup>
import OtSocialButton from '../../src/components/OtSocialButton.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">All Providers</h3>
      <div class="preview__col" style="max-width: 360px; margin: 0 auto; gap: 8px">
        <OtSocialButton provider="google" />
        <OtSocialButton provider="discord" />
        <OtSocialButton provider="github" />
        <OtSocialButton provider="twitter" />
        <OtSocialButton provider="apple" />
        <OtSocialButton provider="facebook" />
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">States</h3>
      <div class="preview__col" style="max-width: 360px; margin: 0 auto; gap: 8px">
        <OtSocialButton provider="google" loading />
        <OtSocialButton provider="discord" disabled />
      </div>
    </section>
  </div>
</template>
