<script setup>
import { ref } from 'vue'
import OtOtpInput from '../../src/components/OtOtpInput.vue'

const otpModel = ref('')
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Interactive Demo</h3>
      <div class="preview__col">
        <OtOtpInput
          v-model="otpModel"
          @complete="(code) => console.log('OTP code complete:', code)"
        />
        <div style="font-size: 14px; color: var(--ot-gray-100)">
          Current Value:
          <strong style="color: var(--ot-primary)">{{ otpModel || 'empty' }}</strong>
        </div>
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Disabled State</h3>
      <div class="preview__col">
        <OtOtpInput model-value="123456" disabled />
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Custom Length (4 digits) & Text Mode</h3>
      <div class="preview__col">
        <OtOtpInput type="text" :length="4" placeholder="-" />
      </div>
    </section>
  </div>
</template>
