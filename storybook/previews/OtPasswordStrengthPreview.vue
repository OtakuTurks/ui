<script setup>
import { ref } from 'vue'
import OtInput from '../../src/components/OtInput.vue'
import OtPasswordStrength from '../../src/components/OtPasswordStrength.vue'

const authPasswordModel = ref('')
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Interactive Demo</h3>
      <div class="preview__col" style="max-width: 400px; margin: 0 auto">
        <OtInput
          v-model="authPasswordModel"
          type="password"
          placeholder="Type a password..."
          full-width
        />
        <OtPasswordStrength :password="authPasswordModel" />
      </div>
    </section>
  </div>
</template>
