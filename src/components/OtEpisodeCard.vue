<script setup>
defineProps({
  number: {
    type: [String, Number],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    default: '24:00'
  },
  progress: {
    type: Number,
    default: 0
  },
  watched: {
    type: Boolean,
    default: false
  },
  current: {
    type: Boolean,
    default: false
  },
  filler: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<template>
  <div
    class="ot-episode-card"
    :class="{
      'ot-episode-card--watched': watched,
      'ot-episode-card--current': current
    }"
    @click="$emit('click')"
  >
    <div class="ot-episode-card__thumbnail">
      <img :src="thumbnail" :alt="title" loading="lazy" />
      <span class="ot-episode-card__duration">{{ duration }}</span>
      <div v-if="progress > 0 || watched" class="ot-episode-card__progress">
        <div
          class="ot-episode-card__progress-bar"
          :style="{ width: watched ? '100%' : `${progress}%` }"
        ></div>
      </div>
    </div>

    <div class="ot-episode-card__content">
      <div class="ot-episode-card__meta">
        <span class="ot-episode-card__number">EP {{ number }}</span>
        <span v-if="filler" class="ot-episode-card__badge ot-episode-card__badge--filler"
          >Filler</span
        >
      </div>
      <h4 class="ot-episode-card__title" :title="title">{{ title }}</h4>
    </div>
  </div>
</template>

<style scoped>
.ot-episode-card {
  display: flex;
  background-color: var(--ot-bg-secondary);
  border: 1px solid var(--ot-gray-300);
  border-radius: var(--ot-radius-base);
  overflow: hidden;
  font-family: var(--ot-font-family);
  cursor: pointer;
  transition:
    border-color var(--ot-transition-fast),
    background-color var(--ot-transition-fast);
}

.ot-episode-card:hover {
  border-color: var(--ot-gray-200);
  background-color: var(--ot-bg-tertiary);
}

.ot-episode-card--current {
  border-color: var(--ot-primary);
}

.ot-episode-card__thumbnail {
  position: relative;
  width: 140px;
  flex-shrink: 0;
  background-color: var(--ot-bg-primary);
}

.ot-episode-card__thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.ot-episode-card__duration {
  position: absolute;
  bottom: 6px;
  right: 6px;
  background-color: rgba(0, 0, 0, 0.75);
  color: var(--ot-white);
  font-size: 10px;
  padding: 2px 4px;
  border-radius: var(--ot-radius-sm);
  z-index: 1;
}

.ot-episode-card__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.2);
}

.ot-episode-card__progress-bar {
  height: 100%;
  background-color: var(--ot-primary);
}

.ot-episode-card--watched .ot-episode-card__progress-bar {
  background-color: var(--ot-gray-200);
}

.ot-episode-card__content {
  padding: var(--ot-spacing-sm) var(--ot-spacing-md);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.ot-episode-card__meta {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-sm);
  margin-bottom: 4px;
}

.ot-episode-card__number {
  font-size: 11px;
  font-weight: 600;
  color: var(--ot-gray-100);
}

.ot-episode-card__badge {
  font-size: 10px;
  padding: 1px 4px;
  border-radius: var(--ot-radius-sm);
  font-weight: 600;
}

.ot-episode-card__badge--filler {
  background-color: var(--ot-warning);
  color: var(--ot-gray-500);
}

.ot-episode-card__title {
  font-size: var(--ot-font-sm);
  font-weight: 500;
  color: var(--ot-white);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ot-episode-card--watched .ot-episode-card__title {
  color: var(--ot-gray-100);
}
</style>
