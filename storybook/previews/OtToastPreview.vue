<script setup>
import OtButton from '../../src/components/OtButton.vue'
import { useToast } from '../../src/composables/useToast'

const toast = useToast()
const triggerToast = (variant = 'info') => {
  const title = variant.charAt(0).toUpperCase() + variant.slice(1)
  const message = `This is a ${variant} toast message that stacks!`
  if (variant === 'success') toast.success(message, { title })
  else if (variant === 'warning') toast.warning(message, { title })
  else if (variant === 'danger') toast.error(message, { title })
  else toast.info(message, { title })
}
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Variants (Stacked)</h3>
      <div class="preview__row">
        <OtButton variant="primary" @click="triggerToast('info')">Info Toast</OtButton>
        <OtButton variant="success" @click="triggerToast('success')">Success Toast</OtButton>
        <OtButton variant="warning" @click="triggerToast('warning')">Warning Toast</OtButton>
        <OtButton variant="danger" @click="triggerToast('danger')">Danger Toast</OtButton>
      </div>
    </section>
  </div>
</template>
