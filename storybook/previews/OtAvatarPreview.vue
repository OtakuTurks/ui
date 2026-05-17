<script setup>
import OtAvatar from '../../src/components/OtAvatar.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">With Image</h3>
      <div class="preview__row">
        <OtAvatar src="https://i.pravatar.cc/150?img=1" name="User One" />
        <OtAvatar src="https://i.pravatar.cc/150?img=2" name="User Two" />
        <OtAvatar src="https://i.pravatar.cc/150?img=3" name="User Three" />
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">With Initials</h3>
      <div class="preview__row">
        <OtAvatar name="John Doe" />
        <OtAvatar name="Jane Smith" color="danger" />
        <OtAvatar name="Bob Wilson" color="success" />
        <OtAvatar name="Alice" color="warning" />
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Sizes</h3>
      <div class="preview__row">
        <OtAvatar name="Small" size="sm" />
        <OtAvatar name="Medium" size="md" />
        <OtAvatar name="Large" size="lg" />
        <OtAvatar name="XLarge" size="xl" />
        <OtAvatar name="Custom" :size="60" />
      </div>
    </section>
  </div>
</template>
