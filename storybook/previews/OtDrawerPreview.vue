<script setup>
import { ref } from 'vue'
import OtButton from '../../src/components/OtButton.vue'
import OtDrawer from '../../src/components/OtDrawer.vue'

const drawerOpen = ref(false)
const drawerPosition = ref('right')
const openDrawer = (pos) => {
  drawerPosition.value = pos
  drawerOpen.value = true
}
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Positions</h3>
      <div class="preview__row">
        <OtButton @click="openDrawer('left')">Left Drawer</OtButton>
        <OtButton @click="openDrawer('right')">Right Drawer</OtButton>
        <OtButton @click="openDrawer('top')">Top Drawer</OtButton>
        <OtButton @click="openDrawer('bottom')">Bottom Drawer</OtButton>
      </div>
    </section>

    <OtDrawer
      :is-open="drawerOpen"
      :position="drawerPosition"
      :title="`${drawerPosition.charAt(0).toUpperCase() + drawerPosition.slice(1)} Drawer`"
      @close="drawerOpen = false"
    >
      <p style="color: var(--ot-gray-200)">
        This is the drawer content. It slides in smoothly from the selected edge.
      </p>

      <template #footer>
        <div style="display: flex; gap: 8px; justify-content: flex-end">
          <OtButton variant="secondary" @click="drawerOpen = false">Cancel</OtButton>
          <OtButton @click="drawerOpen = false">Confirm</OtButton>
        </div>
      </template>
    </OtDrawer>
  </div>
</template>
