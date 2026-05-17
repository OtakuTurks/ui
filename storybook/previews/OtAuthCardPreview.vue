<script setup>
import OtAuthCard from '../../src/components/OtAuthCard.vue'
import OtSocialButton from '../../src/components/OtSocialButton.vue'
import OtInput from '../../src/components/OtInput.vue'
import OtButton from '../../src/components/OtButton.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Login Form</h3>
      <div class="preview__row" style="justify-content: center">
        <OtAuthCard title="Welcome Back" sub-title="Sign in to your OtakuTurks account">
          <template #social>
            <OtSocialButton provider="google" />
            <OtSocialButton provider="discord" />
            <OtSocialButton provider="github" />
          </template>

          <OtInput type="email" placeholder="Email address" full-width />
          <OtInput type="password" placeholder="Password" full-width />
          <OtButton variant="primary" full-width>Sign In</OtButton>

          <template #footer> Don't have an account? <a href="#">Sign Up</a> </template>
        </OtAuthCard>
      </div>
    </section>
  </div>
</template>
