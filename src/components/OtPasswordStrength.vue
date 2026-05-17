<script setup>
import { computed } from 'vue'

const props = defineProps({
  password: {
    type: String,
    default: ''
  },
  minLength: {
    type: Number,
    default: 8
  },
  showLabel: {
    type: Boolean,
    default: true
  }
})

const checks = computed(() => {
  const p = props.password
  return {
    length: p.length >= props.minLength,
    lowercase: /[a-z]/.test(p),
    uppercase: /[A-Z]/.test(p),
    number: /[0-9]/.test(p),
    special: /[^A-Za-z0-9]/.test(p)
  }
})

const score = computed(() => {
  if (!props.password) return 0
  return Object.values(checks.value).filter(Boolean).length
})

const strengthConfig = computed(() => {
  const s = score.value
  if (s === 0) return { label: '', color: 'transparent', percent: 0 }
  if (s === 1) return { label: 'Very Weak', color: 'var(--ot-danger)', percent: 20 }
  if (s === 2) return { label: 'Weak', color: 'var(--ot-danger)', percent: 40 }
  if (s === 3) return { label: 'Fair', color: 'var(--ot-warning)', percent: 60 }
  if (s === 4) return { label: 'Strong', color: 'var(--ot-primary)', percent: 80 }
  return { label: 'Very Strong', color: 'var(--ot-success)', percent: 100 }
})
</script>

<template>
  <div class="ot-pw-strength" v-if="password">
    <!-- Progress Bar -->
    <div class="ot-pw-strength__track">
      <div
        class="ot-pw-strength__fill"
        :style="{
          width: strengthConfig.percent + '%',
          backgroundColor: strengthConfig.color
        }"
      ></div>
    </div>

    <!-- Label -->
    <div v-if="showLabel" class="ot-pw-strength__info">
      <span class="ot-pw-strength__label" :style="{ color: strengthConfig.color }">
        {{ strengthConfig.label }}
      </span>
    </div>

    <!-- Requirement Checklist -->
    <ul class="ot-pw-strength__checks">
      <li :class="{ 'is-met': checks.length }">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
        >
          <polyline v-if="checks.length" points="20 6 9 17 4 12"></polyline>
          <line v-else x1="18" y1="6" x2="6" y2="18"></line>
        </svg>
        At least {{ minLength }} characters
      </li>
      <li :class="{ 'is-met': checks.uppercase }">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
        >
          <polyline v-if="checks.uppercase" points="20 6 9 17 4 12"></polyline>
          <line v-else x1="18" y1="6" x2="6" y2="18"></line>
        </svg>
        Uppercase letter
      </li>
      <li :class="{ 'is-met': checks.lowercase }">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
        >
          <polyline v-if="checks.lowercase" points="20 6 9 17 4 12"></polyline>
          <line v-else x1="18" y1="6" x2="6" y2="18"></line>
        </svg>
        Lowercase letter
      </li>
      <li :class="{ 'is-met': checks.number }">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
        >
          <polyline v-if="checks.number" points="20 6 9 17 4 12"></polyline>
          <line v-else x1="18" y1="6" x2="6" y2="18"></line>
        </svg>
        Number
      </li>
      <li :class="{ 'is-met': checks.special }">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
        >
          <polyline v-if="checks.special" points="20 6 9 17 4 12"></polyline>
          <line v-else x1="18" y1="6" x2="6" y2="18"></line>
        </svg>
        Special character
      </li>
    </ul>
  </div>
</template>

<style scoped>
.ot-pw-strength {
  font-family: var(--ot-font-family);
  animation: pw-fade-in 0.2s ease;
}

.ot-pw-strength__track {
  height: 4px;
  border-radius: var(--ot-radius-full);
  background-color: var(--ot-gray-300);
  overflow: hidden;
  margin-bottom: var(--ot-spacing-sm);
}

.ot-pw-strength__fill {
  height: 100%;
  border-radius: inherit;
  transition: all var(--ot-transition-base) cubic-bezier(0.4, 0, 0.2, 1);
}

.ot-pw-strength__info {
  display: flex;
  justify-content: flex-end;
  margin-bottom: var(--ot-spacing-sm);
}

.ot-pw-strength__label {
  font-size: var(--ot-font-xs);
  font-weight: 600;
  transition: color var(--ot-transition-fast);
}

.ot-pw-strength__checks {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ot-pw-strength__checks li {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-sm);
  font-size: var(--ot-font-xs);
  color: var(--ot-gray-200);
  transition: color var(--ot-transition-fast);
}

.ot-pw-strength__checks li svg {
  flex-shrink: 0;
}

.ot-pw-strength__checks li.is-met {
  color: var(--ot-success);
}

@keyframes pw-fade-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
