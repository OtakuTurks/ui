<script setup>
import { ref } from 'vue'
import OtDropdown from '../../src/components/OtDropdown.vue'

const dropdownOptions = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3', disabled: true },
  { label: 'Option 4', value: 'opt4' }
]
const dropdownModel = ref(null)
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Default</h3>
      <div class="preview__row">
        <OtDropdown
          v-model="dropdownModel"
          :options="dropdownOptions"
          placeholder="Select option"
        />
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Sizes</h3>
      <div class="preview__row">
        <OtDropdown size="sm" :options="dropdownOptions" placeholder="Small" />
        <OtDropdown size="md" :options="dropdownOptions" placeholder="Medium" />
        <OtDropdown size="lg" :options="dropdownOptions" placeholder="Large" />
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">States</h3>
      <div class="preview__row">
        <OtDropdown :options="dropdownOptions" placeholder="Normal" />
        <OtDropdown :options="dropdownOptions" placeholder="Disabled" disabled />
        <OtDropdown :options="dropdownOptions" placeholder="Full width" full-width />
      </div>
    </section>
  </div>
</template>
