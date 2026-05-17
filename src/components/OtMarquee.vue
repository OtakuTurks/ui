<script setup>
defineProps({
  direction: {
    type: String,
    default: 'left',
    validator: (val) => ['left', 'right'].includes(val)
  },
  speed: {
    type: Number,
    default: 20
  },
  pauseOnHover: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="ot-marquee" :class="{ 'ot-marquee--pause-hover': pauseOnHover }">
    <div
      class="ot-marquee__track"
      :class="[`ot-marquee__track--dir-${direction}`]"
      :style="{ animationDuration: `${speed}s` }"
    >
      <!-- Duplicate content inside slot to create seamless infinite scrolling loops -->
      <div class="ot-marquee__content">
        <slot />
      </div>
      <div class="ot-marquee__content" aria-hidden="true">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ot-marquee {
  display: flex;
  overflow: hidden;
  user-select: none;
  width: 100%;
  position: relative;
  mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}

.ot-marquee__track {
  display: flex;
  width: max-content;
  flex-shrink: 0;
}

.ot-marquee__track--dir-left {
  animation: scroll-left linear infinite;
}

.ot-marquee__track--dir-right {
  animation: scroll-right linear infinite;
}

.ot-marquee__content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: var(--ot-spacing-lg, 24px);
  padding: 0 var(--ot-spacing-sm);
  flex-shrink: 0;
}

/* Pause on hover */
.ot-marquee--pause-hover:hover .ot-marquee__track {
  animation-play-state: paused;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes scroll-right {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
