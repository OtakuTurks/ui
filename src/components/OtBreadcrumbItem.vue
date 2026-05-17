<script setup>
defineProps({
  to: { type: [String, Object], default: null },
  active: { type: Boolean, default: false }
})
</script>

<template>
  <li class="ot-breadcrumb-item">
    <a v-if="to && !active" :href="to" class="ot-breadcrumb-item__link">
      <slot />
    </a>
    <span
      v-else
      class="ot-breadcrumb-item__text"
      :class="{ 'ot-breadcrumb-item__text--active': active }"
      :aria-current="active ? 'page' : undefined"
    >
      <slot />
    </span>
    <span v-if="!active" class="ot-breadcrumb-item__separator" aria-hidden="true">
      <slot name="separator">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </slot>
    </span>
  </li>
</template>

<style scoped>
.ot-breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--ot-font-sm, 14px);
}

.ot-breadcrumb-item__link {
  color: var(--ot-gray-200, #9ca3af);
  text-decoration: none;
  transition: color 0.2s ease;
}

.ot-breadcrumb-item__link:hover {
  color: var(--ot-white, #ffffff);
}

.ot-breadcrumb-item__text {
  color: var(--ot-gray-200, #9ca3af);
}

.ot-breadcrumb-item__text--active {
  color: var(--ot-white, #ffffff);
  font-weight: 500;
}

.ot-breadcrumb-item__separator {
  color: var(--ot-gray-300, #4b5563);
  display: flex;
  align-items: center;
}
</style>
