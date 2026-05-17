<script setup>
import OtTabs from '../../src/components/OtTabs.vue'
import OtTab from '../../src/components/OtTab.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Line Variant</h3>
      <OtTabs variant="line" style="max-width: 500px">
        <OtTab value="tab1" label="Tab One">
          <p style="color: var(--ot-gray-200)">Content for Tab One</p>
        </OtTab>
        <OtTab value="tab2" label="Tab Two">
          <p style="color: var(--ot-gray-200)">Content for Tab Two</p>
        </OtTab>
        <OtTab value="tab3" label="Tab Three">
          <p style="color: var(--ot-gray-200)">Content for Tab Three</p>
        </OtTab>
      </OtTabs>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Pills Variant</h3>
      <OtTabs variant="pills" style="max-width: 500px">
        <OtTab value="tab1" label="Tab One">
          <p style="color: var(--ot-gray-200)">Content for Tab One</p>
        </OtTab>
        <OtTab value="tab2" label="Tab Two">
          <p style="color: var(--ot-gray-200)">Content for Tab Two</p>
        </OtTab>
      </OtTabs>
    </section>
  </div>
</template>
