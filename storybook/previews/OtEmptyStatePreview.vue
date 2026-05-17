<script setup>
import OtEmptyState from '../../src/components/OtEmptyState.vue'
import OtButton from '../../src/components/OtButton.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Default State</h3>
      <div class="preview__col">
        <OtEmptyState
          title="No projects found"
          description="Get started by creating a new project. Projects help you organize your tasks and collaborate with your team."
        >
          <template #action>
            <OtButton variant="primary">Create Project</OtButton>
          </template>
        </OtEmptyState>
      </div>
    </section>
  </div>
</template>
