<script setup>
defineProps({
  copyright: {
    type: String,
    default: '© 2026 OtakuTurks. All rights reserved.'
  },
  links: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <footer class="ot-footer">
    <div class="ot-footer__content">
      <div class="ot-footer__left">
        <slot name="brand"></slot>
        <p class="ot-footer__copyright">{{ copyright }}</p>
      </div>

      <div v-if="links && links.length" class="ot-footer__right">
        <a v-for="link in links" :key="link.label" :href="link.href" class="ot-footer__link">
          {{ link.label }}
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.ot-footer {
  width: 100%;
  background-color: var(--ot-bg-secondary);
  padding: var(--ot-spacing-lg) var(--ot-spacing-xl);
  font-family: var(--ot-font-family);
}

.ot-footer__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--ot-spacing-md);
  max-width: 1200px;
  margin: 0 auto;
}

.ot-footer__left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--ot-spacing-sm);
  text-align: center;
}

.ot-footer__copyright {
  margin: 0;
  font-size: var(--ot-font-xs);
  color: var(--ot-gray-200);
}

.ot-footer__right {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--ot-spacing-md);
}

.ot-footer__link {
  font-size: var(--ot-font-sm);
  color: var(--ot-gray-100);
  text-decoration: none;
  transition: color var(--ot-transition-fast);
}

.ot-footer__link:hover {
  color: var(--ot-white);
}

@media (min-width: 768px) {
  .ot-footer__content {
    flex-direction: row;
    justify-content: space-between;
  }
  .ot-footer__left {
    align-items: flex-start;
    text-align: left;
  }
}
</style>
