<script setup>
import { ref } from 'vue'
import OtTagInput from '../../src/components/OtTagInput.vue'

const tagInputModel = ref(['anime', 'manga', 'community'])
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Interactive Tag Staging</h3>
      <div class="preview__col">
        <OtTagInput v-model="tagInputModel" placeholder="Type tag and press Enter..." />
        <div style="font-size: 14px; color: var(--ot-gray-100); margin-top: 8px">
          Staged Tags: <strong style="color: var(--ot-primary)">{{ tagInputModel }}</strong>
        </div>
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Disabled Tag Input</h3>
      <div class="preview__col">
        <OtTagInput :model-value="['readonly', 'locked']" disabled />
      </div>
    </section>
  </div>
</template>
