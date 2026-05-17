<script setup>
import { computed } from 'vue'

const props = defineProps({
  provider: {
    type: String,
    required: true,
    validator: (val) =>
      ['google', 'discord', 'github', 'twitter', 'apple', 'facebook'].includes(val)
  },
  label: {
    type: String,
    default: ''
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

defineEmits(['click'])

const providerConfig = {
  google: {
    label: 'Continue with Google',
    color: '#4285f4',
    icon: '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>'
  },
  discord: {
    label: 'Continue with Discord',
    color: '#5865f2',
    icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="#5865F2"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z"/></svg>'
  },
  github: {
    label: 'Continue with GitHub',
    color: '#ffffff',
    icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2.16 2.16 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.74.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.18.64.73.55A11 11 0 0012 1.27"/></svg>'
  },
  twitter: {
    label: 'Continue with X',
    color: '#ffffff',
    icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'
  },
  apple: {
    label: 'Continue with Apple',
    color: '#ffffff',
    icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>'
  },
  facebook: {
    label: 'Continue with Facebook',
    color: '#1877f2',
    icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>'
  }
}

const config = computed(() => providerConfig[props.provider])
const displayLabel = computed(() => props.label || config.value.label)
</script>

<template>
  <button
    class="ot-social-btn"
    :class="[`ot-social-btn--${provider}`, { 'ot-social-btn--loading': loading }]"
    :disabled="disabled || loading"
    @click="$emit('click', provider)"
  >
    <!-- Loading Spinner -->
    <span v-if="loading" class="ot-social-btn__spinner"></span>

    <!-- Provider Icon -->
    <span v-else class="ot-social-btn__icon" v-html="config.icon"></span>

    <span class="ot-social-btn__label">{{ displayLabel }}</span>
  </button>
</template>

<style scoped>
.ot-social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--ot-spacing-sm);
  width: 100%;
  min-height: 44px;
  padding: 10px var(--ot-spacing-md);
  border-radius: var(--ot-radius-base);
  border: 1px solid var(--ot-gray-300);
  background-color: var(--ot-bg-tertiary);
  color: var(--ot-white);
  font-family: var(--ot-font-family);
  font-size: var(--ot-font-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--ot-transition-base);
}

.ot-social-btn:hover:not(:disabled) {
  background-color: var(--ot-gray-300);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
  box-shadow: var(--ot-shadow-sm);
}

.ot-social-btn:active:not(:disabled) {
  transform: scale(0.97);
}

.ot-social-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Provider specific accents on hover */
.ot-social-btn--google:hover:not(:disabled) {
  border-color: rgba(66, 133, 244, 0.5);
  box-shadow: 0 0 12px rgba(66, 133, 244, 0.15);
}

.ot-social-btn--discord:hover:not(:disabled) {
  border-color: rgba(88, 101, 242, 0.5);
  box-shadow: 0 0 12px rgba(88, 101, 242, 0.15);
}

.ot-social-btn--github:hover:not(:disabled) {
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.08);
}

.ot-social-btn--twitter:hover:not(:disabled) {
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.08);
}

.ot-social-btn--apple:hover:not(:disabled) {
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.08);
}

.ot-social-btn--facebook:hover:not(:disabled) {
  border-color: rgba(24, 119, 242, 0.5);
  box-shadow: 0 0 12px rgba(24, 119, 242, 0.15);
}

.ot-social-btn__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ot-social-btn__label {
  font-size: inherit;
  font-weight: inherit;
}

/* Loading Spinner */
.ot-social-btn__spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-top-color: var(--ot-white);
  border-radius: 50%;
  animation: social-spin 0.6s linear infinite;
}

@keyframes social-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
