<script setup>
import { ref } from 'vue'
const props = defineProps({
  accept: { type: String, default: '*/*' },
  multiple: { type: Boolean, default: false }
})
const emit = defineEmits(['change'])
const fileInput = ref(null)
const files = ref([])

const handleFileChange = (e) => {
  files.value = Array.from(e.target.files)
  emit('change', files.value)
}
const triggerClick = () => fileInput.value.click()
</script>
<template>
  <div class="ot-file-input">
    <input
      ref="fileInput"
      type="file"
      class="ot-file-input__native"
      :accept="accept"
      :multiple="multiple"
      @change="handleFileChange"
    />
    <button type="button" class="ot-file-input__trigger" @click="triggerClick">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
      </svg>
      <span>Select Files</span>
    </button>
    <div v-if="files.length" class="ot-file-input__list">
      <div v-for="f in files" :key="f.name" class="ot-file-input__file">
        {{ f.name }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.ot-file-input__native {
  display: none;
}
.ot-file-input__trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: var(--ot-gray-400, #374151);
  color: var(--ot-white, #fff);
  border: 1px dashed var(--ot-gray-200, #9ca3af);
  border-radius: var(--ot-radius-base, 8px);
  cursor: pointer;
  transition: all 0.2s;
}
.ot-file-input__trigger:hover {
  background-color: var(--ot-gray-300, #4b5563);
  border-color: var(--ot-primary, #3b82f6);
}
.ot-file-input__list {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.ot-file-input__file {
  font-size: 13px;
  color: var(--ot-gray-100, #d1d5db);
}
</style>
