<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  autoplay: {
    type: Boolean,
    default: false
  },
  interval: {
    type: Number,
    default: 5000
  },
  indicators: {
    type: Boolean,
    default: true
  },
  arrows: {
    type: Boolean,
    default: true
  },
  height: {
    type: [String, Number],
    default: 'auto'
  },
  loop: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const currentIndex = ref(props.modelValue)
const carouselRef = ref(null)
let autoplayTimer = null

const goTo = (index) => {
  currentIndex.value = index
  emit('update:modelValue', index)
  emit('change', index)
}

const next = () => {
  if (props.loop || currentIndex.value < props.slides.length - 1) {
    goTo((currentIndex.value + 1) % props.slides.length)
  }
}

const prev = () => {
  if (props.loop || currentIndex.value > 0) {
    goTo(currentIndex.value === 0 ? props.slides.length - 1 : currentIndex.value - 1)
  }
}

const startAutoplay = () => {
  if (props.autoplay) {
    autoplayTimer = setInterval(next, props.interval)
  }
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

const handleMouseEnter = () => {
  if (props.autoplay) stopAutoplay()
}

const handleMouseLeave = () => {
  if (props.autoplay) startAutoplay()
}

watch(
  () => props.modelValue,
  (val) => {
    currentIndex.value = val
  }
)

onMounted(() => {
  startAutoplay()
})

onBeforeUnmount(() => {
  stopAutoplay()
})

defineExpose({ next, prev, goTo })
</script>

<template>
  <div
    ref="carouselRef"
    class="ot-carousel"
    :style="{ height: typeof height === 'number' ? `${height}px` : height }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="ot-carousel__container">
      <TransitionGroup name="ot-carousel" tag="div" class="ot-carousel__track">
        <div
          v-for="(slide, index) in $slots.default ? $slots.default() : []"
          :key="index"
          v-show="index === currentIndex"
          class="ot-carousel__slide"
        >
          <component :is="slide" />
        </div>
      </TransitionGroup>
    </div>

    <button
      v-if="arrows"
      type="button"
      class="ot-carousel__arrow ot-carousel__arrow--prev"
      @click="prev"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
      </svg>
    </button>

    <button
      v-if="arrows"
      type="button"
      class="ot-carousel__arrow ot-carousel__arrow--next"
      @click="next"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
      </svg>
    </button>

    <div v-if="indicators" class="ot-carousel__indicators">
      <button
        v-for="(_, index) in $slots.default ? $slots.default() : []"
        :key="index"
        type="button"
        class="ot-carousel__indicator"
        :class="{ 'ot-carousel__indicator--active': index === currentIndex }"
        @click="goTo(index)"
      />
    </div>
  </div>
</template>

<style scoped>
.ot-carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: var(--ot-gray-500);
  border-radius: var(--ot-radius-lg);
}

.ot-carousel__container {
  width: 100%;
  height: 100%;
}

.ot-carousel__track {
  position: relative;
  width: 100%;
  height: 100%;
}

.ot-carousel__slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.ot-carousel__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: var(--ot-radius-full);
  color: var(--ot-white);
  cursor: pointer;
  transition: all var(--ot-transition-fast);
  opacity: 0;
  z-index: 10;
}

.ot-carousel:hover .ot-carousel__arrow {
  opacity: 1;
}

.ot-carousel__arrow:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.ot-carousel__arrow--prev {
  left: var(--ot-spacing-md);
}

.ot-carousel__arrow--next {
  right: var(--ot-spacing-md);
}

.ot-carousel__indicators {
  position: absolute;
  bottom: var(--ot-spacing-md);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--ot-spacing-sm);
  z-index: 10;
}

.ot-carousel__indicator {
  width: 8px;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  border-radius: var(--ot-radius-full);
  cursor: pointer;
  transition: all var(--ot-transition-fast);
}

.ot-carousel__indicator--active {
  width: 24px;
  background-color: var(--ot-white);
}

/* Transitions */
.ot-carousel-enter-active,
.ot-carousel-leave-active {
  transition: all var(--ot-transition-base);
}

.ot-carousel-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.ot-carousel-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
