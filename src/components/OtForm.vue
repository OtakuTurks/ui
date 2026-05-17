<script setup>
import { provide, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const errors = ref({})
const touched = ref({})

const validate = () => {
  // Validation logic will be handled by form fields
  return Object.keys(errors.value).length === 0
}

const setFieldError = (field, error) => {
  if (error) {
    errors.value[field] = error
  } else {
    delete errors.value[field]
  }
}

const setFieldTouched = (field, isTouched = true) => {
  if (isTouched) {
    touched.value[field] = true
  } else {
    delete touched.value[field]
  }
}

const reset = () => {
  errors.value = {}
  touched.value = {}
}

provide('otForm', {
  disabled: props.disabled,
  errors,
  touched,
  setFieldError,
  setFieldTouched
})

const handleSubmit = (event) => {
  event.preventDefault()
  emit('submit', props.modelValue)
}

defineExpose({ validate, reset, errors, touched })
</script>

<template>
  <form class="ot-form" @submit="handleSubmit">
    <slot />
  </form>
</template>

<style scoped>
.ot-form {
  width: 100%;
}
</style>
