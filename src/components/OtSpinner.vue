<script setup>
defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg', 'xl'].includes(v)
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'success', 'warning', 'danger', 'white'].includes(v)
  }
})
</script>

<template>
  <svg
    class="ot-spinner"
    :class="[`ot-spinner--${size}`, `ot-spinner--${variant}`]"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      class="ot-spinner__track"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    ></circle>
    <path
      class="ot-spinner__head"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
</template>

<style scoped>
.ot-spinner {
  animation: ot-spinner-spin 1s linear infinite;
  display: inline-block;
}

.ot-spinner__track {
  opacity: 0.25;
}

.ot-spinner__head {
  opacity: 0.75;
}

/* Sizes */
.ot-spinner--sm {
  width: 16px;
  height: 16px;
}
.ot-spinner--md {
  width: 24px;
  height: 24px;
}
.ot-spinner--lg {
  width: 32px;
  height: 32px;
}
.ot-spinner--xl {
  width: 48px;
  height: 48px;
}

/* Variants */
.ot-spinner--primary {
  color: var(--ot-primary, #3b82f6);
}
.ot-spinner--secondary {
  color: var(--ot-gray-300, #9ca3af);
}
.ot-spinner--success {
  color: var(--ot-success, #10b981);
}
.ot-spinner--warning {
  color: var(--ot-warning, #f59e0b);
}
.ot-spinner--danger {
  color: var(--ot-danger, #ef4444);
}
.ot-spinner--white {
  color: var(--ot-white, #ffffff);
}

@keyframes ot-spinner-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
