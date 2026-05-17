<script setup>
defineProps({
  title: {
    type: String,
    default: 'Welcome Back'
  },
  subTitle: {
    type: String,
    default: ''
  },
  maxWidth: {
    type: String,
    default: '420px'
  }
})
</script>

<template>
  <div class="ot-auth-card" :style="{ maxWidth }">
    <!-- Logo / Brand Area -->
    <div v-if="$slots.logo" class="ot-auth-card__logo">
      <slot name="logo" />
    </div>

    <!-- Header -->
    <div class="ot-auth-card__header">
      <h2 class="ot-auth-card__title">{{ title }}</h2>
      <p v-if="subTitle" class="ot-auth-card__subtitle">{{ subTitle }}</p>
    </div>

    <!-- Social Login Providers -->
    <div v-if="$slots.social" class="ot-auth-card__social">
      <slot name="social" />
    </div>

    <!-- Divider -->
    <div v-if="$slots.social && $slots.default" class="ot-auth-card__divider">
      <span class="ot-auth-card__divider-line"></span>
      <span class="ot-auth-card__divider-text">or continue with</span>
      <span class="ot-auth-card__divider-line"></span>
    </div>

    <!-- Form Fields -->
    <div v-if="$slots.default" class="ot-auth-card__body">
      <slot />
    </div>

    <!-- Footer Links -->
    <div v-if="$slots.footer" class="ot-auth-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.ot-auth-card {
  width: 100%;
  background-color: var(--ot-bg-secondary);
  border: 1px solid var(--ot-gray-300);
  border-radius: var(--ot-radius-xl);
  padding: var(--ot-spacing-xl);
  font-family: var(--ot-font-family);
  animation: auth-slide-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  position: relative;
  overflow: hidden;
}

/* Subtle ambient glow behind the card */
.ot-auth-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 50% 0%, rgba(55, 125, 255, 0.04) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.ot-auth-card__logo {
  display: flex;
  justify-content: center;
  margin-bottom: var(--ot-spacing-lg);
  position: relative;
  z-index: 1;
}

.ot-auth-card__header {
  text-align: center;
  margin-bottom: var(--ot-spacing-lg);
  position: relative;
  z-index: 1;
}

.ot-auth-card__title {
  font-size: var(--ot-font-xl);
  font-weight: 700;
  color: var(--ot-white);
  margin-bottom: var(--ot-spacing-xs);
}

.ot-auth-card__subtitle {
  font-size: var(--ot-font-sm);
  color: var(--ot-gray-100);
  line-height: var(--ot-line-height);
}

.ot-auth-card__social {
  display: flex;
  flex-direction: column;
  gap: var(--ot-spacing-sm);
  position: relative;
  z-index: 1;
}

/* Divider */
.ot-auth-card__divider {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-md);
  margin: var(--ot-spacing-lg) 0;
  position: relative;
  z-index: 1;
}

.ot-auth-card__divider-line {
  flex: 1;
  height: 1px;
  background-color: var(--ot-gray-300);
}

.ot-auth-card__divider-text {
  font-size: var(--ot-font-xs);
  color: var(--ot-gray-200);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.ot-auth-card__body {
  display: flex;
  flex-direction: column;
  gap: var(--ot-spacing-md);
  position: relative;
  z-index: 1;
}

.ot-auth-card__footer {
  margin-top: var(--ot-spacing-lg);
  text-align: center;
  font-size: var(--ot-font-sm);
  color: var(--ot-gray-100);
  position: relative;
  z-index: 1;
}

.ot-auth-card__footer :deep(a) {
  color: var(--ot-primary);
  text-decoration: none;
  font-weight: 600;
  transition: color var(--ot-transition-fast);
}

.ot-auth-card__footer :deep(a:hover) {
  color: var(--ot-primary-hover);
}

@keyframes auth-slide-up {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
