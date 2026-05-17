<script setup></script>
<template>
  <ul class="ot-list">
    <slot />
  </ul>
</template>
<style scoped>
.ot-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid var(--ot-gray-300, #4b5563);
  border-radius: var(--ot-radius-base, 8px);
  background-color: var(--ot-bg-secondary, #1f2937);
  overflow: hidden;
}
</style>
