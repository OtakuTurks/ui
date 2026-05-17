<script setup>
import OtCopyButton from '../../src/components/OtCopyButton.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Variants</h3>
      <div class="preview__row">
        <OtCopyButton
          text="npm install @otakuturks/ui"
          label="Copy Command"
          copied-label="Copied!"
        />
        <OtCopyButton text="Secondary Value" variant="secondary" />
        <OtCopyButton text="Primary Action" variant="primary" label="Click to Copy" />
        <OtCopyButton text="Success Variant" variant="success" label="Secure Link" />
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Sizes</h3>
      <div class="preview__row">
        <OtCopyButton text="Small Code" size="sm" label="Small" />
        <OtCopyButton text="Medium Code" size="md" label="Medium" />
        <OtCopyButton text="Large Code" size="lg" label="Large" />
      </div>
    </section>
  </div>
</template>
