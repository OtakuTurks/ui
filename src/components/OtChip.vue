<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'filled',
    validator: (value) => ['filled', 'outlined'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  color: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'warning', 'danger'].includes(value)
  },
  removable: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    default: ''
  },
  icon: {
    type: [String, Object],
    default: null
  }
})

const emit = defineEmits(['remove', 'click'])

const handleRemove = (event) => {
  event.stopPropagation()
  if (!props.disabled) {
    emit('remove')
  }
}

const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>

<template>
  <span
    class="ot-chip"
    :class="[
      `ot-chip--${variant}`,
      `ot-chip--${size}`,
      `ot-chip--${color}`,
      {
        'ot-chip--disabled': disabled,
        'ot-chip--clickable': $attrs.onClick
      }
    ]"
    @click="handleClick"
  >
    <img v-if="avatar" :src="avatar" class="ot-chip__avatar" :alt="label" />
    <span v-if="icon" class="ot-chip__icon">
      <component v-if="typeof icon === 'object'" :is="icon" />
      <span v-else v-html="icon" />
    </span>
    <span class="ot-chip__label">{{ label }}</span>
    <button
      v-if="removable"
      type="button"
      class="ot-chip__remove"
      :disabled="disabled"
      @click="handleRemove"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        />
      </svg>
    </button>
  </span>
</template>

<style scoped>
.ot-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--ot-spacing-xs);
  font-family: var(--ot-font-family);
  font-weight: 500;
  white-space: nowrap;
  transition: all var(--ot-transition-fast);
}

.ot-chip--clickable {
  cursor: pointer;
}

.ot-chip--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Variants */
.ot-chip--filled.ot-chip--primary {
  background-color: var(--ot-primary);
  color: var(--ot-white);
}

.ot-chip--filled.ot-chip--secondary {
  background-color: var(--ot-gray-300);
  color: var(--ot-gray-200);
}

.ot-chip--filled.ot-chip--success {
  background-color: var(--ot-success);
  color: var(--ot-white);
}

.ot-chip--filled.ot-chip--warning {
  background-color: var(--ot-warning);
  color: var(--ot-gray-500);
}

.ot-chip--filled.ot-chip--danger {
  background-color: var(--ot-danger);
  color: var(--ot-white);
}

.ot-chip--outlined.ot-chip--primary {
  background-color: transparent;
  border: 1px solid var(--ot-primary);
  color: var(--ot-primary);
}

.ot-chip--outlined.ot-chip--secondary {
  background-color: transparent;
  border: 1px solid var(--ot-gray-100);
  color: var(--ot-gray-100);
}

.ot-chip--outlined.ot-chip--success {
  background-color: transparent;
  border: 1px solid var(--ot-success);
  color: var(--ot-success);
}

.ot-chip--outlined.ot-chip--warning {
  background-color: transparent;
  border: 1px solid var(--ot-warning);
  color: var(--ot-warning);
}

.ot-chip--outlined.ot-chip--danger {
  background-color: transparent;
  border: 1px solid var(--ot-danger);
  color: var(--ot-danger);
}

/* Sizes */
.ot-chip--sm {
  padding: 2px 8px;
  font-size: var(--ot-font-xs);
  border-radius: var(--ot-radius-sm);
}

.ot-chip--md {
  padding: 4px 12px;
  font-size: var(--ot-font-sm);
  border-radius: var(--ot-radius-base);
}

.ot-chip--lg {
  padding: 6px 16px;
  font-size: var(--ot-font-sm);
  border-radius: var(--ot-radius-base);
}

/* Avatar */
.ot-chip__avatar {
  width: 24px;
  height: 24px;
  border-radius: var(--ot-radius-full);
  object-fit: cover;
}

.ot-chip--sm .ot-chip__avatar {
  width: 20px;
  height: 20px;
}

.ot-chip--lg .ot-chip__avatar {
  width: 28px;
  height: 28px;
}

/* Icon */
.ot-chip__icon {
  display: flex;
  align-items: center;
  font-size: 1em;
}

/* Remove button */
.ot-chip__remove {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  color: inherit;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity var(--ot-transition-fast);
  margin-left: var(--ot-spacing-xs);
}

.ot-chip__remove:hover {
  opacity: 1;
}

.ot-chip__remove:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
