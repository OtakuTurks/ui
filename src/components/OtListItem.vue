<script setup></script>
<template>
  <li class="ot-list-item">
    <slot />
  </li>
</template>
<style scoped>
.ot-list-item {
  padding: var(--ot-spacing-md, 16px);
  color: var(--ot-white, #ffffff);
  border-bottom: 1px solid var(--ot-gray-300, #4b5563);
  display: flex;
  align-items: center;
  gap: 12px;
}
.ot-list-item:last-child {
  border-bottom: none;
}
</style>
