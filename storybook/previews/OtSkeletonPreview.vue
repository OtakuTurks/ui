<script setup>
import OtSkeleton from '../../src/components/OtSkeleton.vue'
import OtCard from '../../src/components/OtCard.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Variants</h3>
      <div class="preview__row" style="gap: 24px">
        <OtSkeleton variant="text" width="200px" />
        <OtSkeleton variant="circular" :width="60" :height="60" />
        <OtSkeleton variant="rectangular" :width="200" :height="100" />
        <OtSkeleton variant="rounded" :width="200" :height="100" />
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Animations</h3>
      <div class="preview__col" style="max-width: 300px; gap: 16px">
        <OtSkeleton variant="text" animation="pulse" />
        <OtSkeleton variant="text" animation="wave" />
        <OtSkeleton variant="text" animation="none" />
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Card Loading</h3>
      <OtCard style="width: 300px">
        <div style="display: flex; gap: 16px; align-items: center">
          <OtSkeleton variant="circular" :width="40" :height="40" />
          <div style="flex: 1">
            <OtSkeleton variant="text" width="80%" height="16" style="margin-bottom: 8px" />
            <OtSkeleton variant="text" width="60%" height="12" />
          </div>
        </div>
      </OtCard>
    </section>
  </div>
</template>
