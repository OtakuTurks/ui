<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: 'auto'
  },
  height: {
    type: [String, Number],
    default: 'auto'
  },
  fit: {
    type: String,
    default: 'cover',
    validator: (value) => ['cover', 'contain', 'fill', 'none', 'scale-down'].includes(value)
  },
  radius: {
    type: String,
    default: 'base',
    validator: (value) => ['none', 'sm', 'base', 'lg', 'xl', 'full'].includes(value)
  },
  placeholder: {
    type: String,
    default: ''
  },
  fallback: {
    type: String,
    default: ''
  },
  lazy: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['load', 'error'])

const loaded = ref(false)
const hasError = ref(false)

const imageSrc = computed(() => {
  if (hasError.value && props.fallback) {
    return props.fallback
  }
  return props.src
})

const handleLoad = () => {
  loaded.value = true
  hasError.value = false
  emit('load')
}

const handleError = () => {
  hasError.value = true
  emit('error')
}

const imageStyle = computed(() => {
  const style = {}
  if (typeof props.width === 'number') {
    style.width = `${props.width}px`
  } else {
    style.width = props.width
  }
  if (typeof props.height === 'number') {
    style.height = `${props.height}px`
  } else {
    style.height = props.height
  }
  return style
})
</script>

<template>
  <div
    class="ot-image"
    :class="[`ot-image--radius-${radius}`, { 'ot-image--loading': !loaded && !hasError }]"
    :style="imageStyle"
  >
    <img
      v-if="imageSrc"
      class="ot-image__img"
      :class="`ot-image__img--${fit}`"
      :src="imageSrc"
      :alt="alt"
      :loading="lazy ? 'lazy' : 'eager'"
      @load="handleLoad"
      @error="handleError"
    />
    <div v-if="placeholder && !loaded && !hasError" class="ot-image__placeholder">
      <img :src="placeholder" :alt="alt" class="ot-image__placeholder-img" />
    </div>
    <div v-else-if="!loaded && !hasError" class="ot-image__skeleton">
      <div class="ot-image__skeleton-wave" />
    </div>
    <div v-if="!src || hasError" class="ot-image__fallback">
      <slot name="fallback">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
          />
        </svg>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.ot-image {
  position: relative;
  display: inline-block;
  overflow: hidden;
  background-color: var(--ot-gray-400);
}

/* Radius */
.ot-image--radius-none {
  border-radius: 0;
}

.ot-image--radius-sm {
  border-radius: var(--ot-radius-sm);
}

.ot-image--radius-base {
  border-radius: var(--ot-radius-base);
}

.ot-image--radius-lg {
  border-radius: var(--ot-radius-lg);
}

.ot-image--radius-xl {
  border-radius: var(--ot-radius-xl);
}

.ot-image--radius-full {
  border-radius: var(--ot-radius-full);
}

.ot-image__img {
  display: block;
  width: 100%;
  height: 100%;
}

.ot-image__img--cover {
  object-fit: cover;
}

.ot-image__img--contain {
  object-fit: contain;
}

.ot-image__img--fill {
  object-fit: fill;
}

.ot-image__img--none {
  object-fit: none;
}

.ot-image__img--scale-down {
  object-fit: scale-down;
}

.ot-image__placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.ot-image__placeholder-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(10px);
  opacity: 0.7;
}

.ot-image__skeleton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--ot-gray-300);
}

.ot-image__skeleton-wave {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--ot-gray-300) 25%,
    var(--ot-gray-400) 50%,
    var(--ot-gray-300) 75%
  );
  background-size: 200% 100%;
  animation: ot-image-wave 1.5s ease-in-out infinite;
}

@keyframes ot-image-wave {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.ot-image__fallback {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--ot-gray-400);
  color: var(--ot-gray-100);
}
</style>
