<script setup></script>

<template>
  <nav aria-label="Breadcrumb" class="ot-breadcrumb">
    <ol class="ot-breadcrumb__list">
      <slot />
    </ol>
  </nav>
</template>

<style scoped>
.ot-breadcrumb__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 8px;
}
</style>
