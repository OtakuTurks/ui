<script setup>
import OtBreadcrumb from '../../src/components/OtBreadcrumb.vue'
import OtBreadcrumbItem from '../../src/components/OtBreadcrumbItem.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Default</h3>
      <div class="preview__row">
        <OtBreadcrumb>
          <OtBreadcrumbItem to="#">Home</OtBreadcrumbItem>
          <OtBreadcrumbItem to="#">Components</OtBreadcrumbItem>
          <OtBreadcrumbItem active>Breadcrumb</OtBreadcrumbItem>
        </OtBreadcrumb>
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Custom Separator</h3>
      <div class="preview__row">
        <OtBreadcrumb>
          <OtBreadcrumbItem to="#">
            Users
            <template #separator>/</template>
          </OtBreadcrumbItem>
          <OtBreadcrumbItem to="#">
            John Doe
            <template #separator>/</template>
          </OtBreadcrumbItem>
          <OtBreadcrumbItem active>Settings</OtBreadcrumbItem>
        </OtBreadcrumb>
      </div>
    </section>
  </div>
</template>
