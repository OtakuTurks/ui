<script setup>
import OtResult from '../../src/components/OtResult.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Result States</h3>
      <div class="preview__row" style="justify-content: space-around; gap: 32px">
        <OtResult
          status="success"
          title="Payment Successful"
          sub-title="Your Premium Otaku subscription has been activated."
        />
        <OtResult
          status="warning"
          title="Auth Token Expiring"
          sub-title="Please re-verify your email address."
        />
        <OtResult
          status="error"
          title="Submission Failed"
          sub-title="Please check your form inputs and try again."
        />
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Errors & Glitches</h3>
      <div class="preview__row" style="justify-content: space-around; gap: 32px">
        <OtResult
          status="404"
          title="Not Found"
          sub-title="The page you are looking for has vanished into thin air."
        />
        <OtResult
          status="500"
          title="Server Melt Down"
          sub-title="Internal server error. Our gnomes are on it."
        />
      </div>
    </section>
  </div>
</template>
