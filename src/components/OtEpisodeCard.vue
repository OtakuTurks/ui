<script setup>
import { computed } from 'vue'

const props = defineProps({
  number: {
    type: [Number, String],
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  thumbnail: {
    type: String,
    default: ''
  },
  duration: {
    type: String,
    default: ''
  },
  filler: {
    type: Boolean,
    default: false
  },
  watched: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: 0,
    validator: (val) => val >= 0 && val <= 100
  },
  current: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click', 'play'])

const displayTitle = computed(() => {
  return props.title || `Episode ${props.number}`
})
</script>

<template>
  <div
    class="ot-episode-card"
    :class="{
      'ot-episode-card--watched': watched,
      'ot-episode-card--current': current,
      'ot-episode-card--filler': filler
    }"
    @click="$emit('click')"
  >
    <!-- Thumbnail -->
    <div class="ot-episode-card__thumb" v-if="thumbnail">
      <img :src="thumbnail" :alt="displayTitle" loading="lazy" />

      <!-- Duration Badge -->
      <span v-if="duration" class="ot-episode-card__duration">{{ duration }}</span>

      <!-- Play Button Overlay -->
      <button class="ot-episode-card__play" @click.stop="$emit('play')">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>

      <!-- Watched Progress Bar -->
      <div v-if="progress > 0" class="ot-episode-card__progress">
        <div class="ot-episode-card__progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
    </div>

    <!-- Episode Details -->
    <div class="ot-episode-card__info">
      <div class="ot-episode-card__header">
        <span class="ot-episode-card__number">
          {{ number }}
        </span>
        <span v-if="filler" class="ot-episode-card__filler-badge">Filler</span>
        <span v-if="current" class="ot-episode-card__current-badge">Now Watching</span>
      </div>
      <h4 class="ot-episode-card__title">{{ displayTitle }}</h4>
    </div>

    <!-- Watched Indicator -->
    <div v-if="watched" class="ot-episode-card__watched-icon">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--ot-success)"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.ot-episode-card {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-md);
  background-color: var(--ot-bg-secondary);
  border: 1px solid var(--ot-gray-300);
  border-radius: var(--ot-radius-lg);
  padding: var(--ot-spacing-sm);
  cursor: pointer;
  transition: all var(--ot-transition-base) ease;
  font-family: var(--ot-font-family);
  position: relative;
}

.ot-episode-card:hover {
  border-color: rgba(255, 255, 255, 0.1);
  background-color: var(--ot-bg-tertiary);
  transform: translateX(4px);
}

.ot-episode-card--current {
  border-color: var(--ot-primary);
  background-color: rgba(55, 125, 255, 0.05);
}

.ot-episode-card--watched {
  opacity: 0.7;
}

.ot-episode-card--watched:hover {
  opacity: 1;
}

.ot-episode-card--filler {
  border-left: 3px solid var(--ot-warning);
}

/* Thumbnail */
.ot-episode-card__thumb {
  position: relative;
  width: 160px;
  min-width: 160px;
  aspect-ratio: 16 / 9;
  border-radius: var(--ot-radius-base);
  overflow: hidden;
  background-color: var(--ot-bg-tertiary);
  flex-shrink: 0;
}

.ot-episode-card__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--ot-transition-slow);
}

.ot-episode-card:hover .ot-episode-card__thumb img {
  transform: scale(1.05);
}

/* Duration Badge */
.ot-episode-card__duration {
  position: absolute;
  bottom: 6px;
  right: 6px;
  background-color: rgba(0, 0, 0, 0.8);
  color: var(--ot-white);
  font-size: 10px;
  font-weight: 700;
  padding: 2px 5px;
  border-radius: var(--ot-radius-sm);
}

/* Play Button */
.ot-episode-card__play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  border: none;
  color: var(--ot-white);
  cursor: pointer;
  opacity: 0;
  transition: opacity var(--ot-transition-fast);
}

.ot-episode-card:hover .ot-episode-card__play {
  opacity: 1;
}

.ot-episode-card__play svg {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
  transition: transform var(--ot-transition-fast);
}

.ot-episode-card__play:hover svg {
  transform: scale(1.2);
}

/* Progress Bar */
.ot-episode-card__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: rgba(0, 0, 0, 0.5);
}

.ot-episode-card__progress-fill {
  height: 100%;
  background-color: var(--ot-primary);
  border-radius: 0 var(--ot-radius-full) var(--ot-radius-full) 0;
  transition: width var(--ot-transition-base);
}

/* Info Section */
.ot-episode-card__info {
  flex: 1;
  min-width: 0;
}

.ot-episode-card__header {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-sm);
  margin-bottom: 4px;
}

.ot-episode-card__number {
  font-size: var(--ot-font-xs);
  font-weight: 700;
  color: var(--ot-gray-200);
}

.ot-episode-card__title {
  font-size: var(--ot-font-sm);
  font-weight: 600;
  color: var(--ot-white);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Badges */
.ot-episode-card__filler-badge {
  font-size: 10px;
  font-weight: 700;
  color: var(--ot-warning);
  background-color: rgba(255, 190, 61, 0.1);
  padding: 1px 6px;
  border-radius: var(--ot-radius-sm);
}

.ot-episode-card__current-badge {
  font-size: 10px;
  font-weight: 700;
  color: var(--ot-primary);
  background-color: rgba(55, 125, 255, 0.1);
  padding: 1px 6px;
  border-radius: var(--ot-radius-sm);
  animation: pulse-glow 2s infinite;
}

@keyframes pulse-glow {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

/* Watched Icon */
.ot-episode-card__watched-icon {
  display: flex;
  align-items: center;
  padding-right: var(--ot-spacing-sm);
  flex-shrink: 0;
}
</style>
