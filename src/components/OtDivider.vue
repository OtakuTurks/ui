<script setup>
defineProps({
  vertical: { type: Boolean, default: false },
  dashed: { type: Boolean, default: false }
})
</script>
<template>
  <div
    class="ot-divider"
    :class="{ 'ot-divider--vertical': vertical, 'ot-divider--dashed': dashed }"
  ></div>
</template>
<style scoped>
.ot-divider {
  background-color: var(--ot-gray-300, #4b5563);
  margin: var(--ot-spacing-md, 16px) 0;
  height: 1px;
  width: 100%;
}
.ot-divider--vertical {
  width: 1px;
  height: auto;
  margin: 0 var(--ot-spacing-md, 16px);
  display: inline-block;
}
.ot-divider--dashed {
  background-color: transparent;
  border-top: 1px dashed var(--ot-gray-300, #4b5563);
}
.ot-divider--vertical.ot-divider--dashed {
  border-top: none;
  border-left: 1px dashed var(--ot-gray-300, #4b5563);
}
</style>
