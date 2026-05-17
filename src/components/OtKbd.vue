<script setup></script>
<template>
  <kbd class="ot-kbd"><slot /></kbd>
</template>
<style scoped>
.ot-kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.2em 0.4em;
  font-family: monospace;
  font-size: 0.85em;
  font-weight: 600;
  color: var(--ot-gray-100, #f3f4f6);
  background-color: var(--ot-gray-400, #374151);
  border: 1px solid var(--ot-gray-300, #4b5563);
  border-radius: var(--ot-radius-sm, 4px);
  box-shadow: 0 2px 0 0 var(--ot-gray-500, #1f2937);
}
</style>
