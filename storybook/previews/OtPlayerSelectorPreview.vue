<script setup>
import { ref } from 'vue'
import OtPlayerSelector from '../../src/components/OtPlayerSelector.vue'

const providers = ref([
  { id: 1, name: 'Sora Drive (CDN)', type: 'Direct Stream', quality: '1080p', ping: 45 },
  { id: 2, name: 'OtakuTurks Sub', type: 'Hardsub', quality: '1080p', ping: 85 },
  { id: 3, name: 'Hydra Player', type: 'Multi-host', quality: '720p', ping: 120 },
  { id: 4, name: 'Backup Server (Slow)', type: 'Raw Video', quality: '480p', ping: 420 }
])

const activeId = ref(1)

const handleSelect = (provider) => {
  activeId.value = provider.id
}
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Standard Source Selector</h3>
      <div style="max-width: 600px; margin: 0 auto">
        <OtPlayerSelector :providers="providers" :active-id="activeId" @select="handleSelect" />
      </div>
    </section>
  </div>
</template>
