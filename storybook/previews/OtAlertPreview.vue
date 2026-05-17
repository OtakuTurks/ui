<script setup>
import OtAlert from '../../src/components/OtAlert.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Variants</h3>
      <div class="preview__col" style="max-width: 600px; gap: 16px">
        <OtAlert variant="info" title="Information">
          This is an informational alert message.
        </OtAlert>
        <OtAlert variant="success" title="Success!">
          Your changes have been saved successfully.
        </OtAlert>
        <OtAlert variant="warning" title="Warning">
          Please review your input before continuing.
        </OtAlert>
        <OtAlert variant="danger" title="Error"> Something went wrong. Please try again. </OtAlert>
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Dismissible</h3>
      <div class="preview__col" style="max-width: 600px">
        <OtAlert variant="info" dismissible> This alert can be dismissed. </OtAlert>
      </div>
    </section>
  </div>
</template>
