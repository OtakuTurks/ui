<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    default: null
  },
  genres: {
    type: Array,
    default: () => []
  },
  type: {
    type: String,
    default: '',
    validator: (val) => ['', 'TV', 'OVA', 'ONA', 'Movie', 'Special', 'Manga'].includes(val)
  },
  status: {
    type: String,
    default: '',
    validator: (val) => ['', 'airing', 'completed', 'upcoming'].includes(val)
  },
  year: {
    type: [Number, String],
    default: ''
  },
  episodes: {
    type: [Number, String],
    default: ''
  }
})

defineEmits(['click'])

const scoreColor = computed(() => {
  if (!props.score) return 'var(--ot-gray-200)'
  if (props.score >= 8) return 'var(--ot-success)'
  if (props.score >= 6) return 'var(--ot-primary)'
  if (props.score >= 4) return 'var(--ot-warning)'
  return 'var(--ot-danger)'
})

const statusLabel = computed(() => {
  const map = { airing: 'Airing', completed: 'Completed', upcoming: 'Upcoming' }
  return map[props.status] || ''
})

const statusColor = computed(() => {
  const map = {
    airing: 'var(--ot-success)',
    completed: 'var(--ot-primary)',
    upcoming: 'var(--ot-warning)'
  }
  return map[props.status] || 'var(--ot-gray-200)'
})
</script>

<template>
  <div class="ot-anime-card" @click="$emit('click')">
    <!-- Cover Image -->
    <div class="ot-anime-card__cover">
      <img :src="cover" :alt="title" loading="lazy" />

      <!-- Score Badge -->
      <span
        v-if="score !== null"
        class="ot-anime-card__score"
        :style="{ '--score-color': scoreColor }"
      >
        ★ {{ score.toFixed(1) }}
      </span>

      <!-- Type Badge -->
      <span v-if="type" class="ot-anime-card__type">
        {{ type }}
      </span>

      <!-- Hover Overlay with Details -->
      <div class="ot-anime-card__overlay">
        <div class="ot-anime-card__overlay-content">
          <div v-if="genres.length" class="ot-anime-card__genres">
            <span v-for="genre in genres.slice(0, 3)" :key="genre" class="ot-anime-card__genre-tag">
              {{ genre }}
            </span>
          </div>

          <div class="ot-anime-card__meta">
            <span v-if="year">{{ year }}</span>
            <span v-if="episodes">{{ episodes }} ep</span>
            <span v-if="statusLabel" class="ot-anime-card__status" :style="{ color: statusColor }">
              {{ statusLabel }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Title -->
    <h3 class="ot-anime-card__title">{{ title }}</h3>
  </div>
</template>

<style scoped>
.ot-anime-card {
  width: 100%;
  cursor: pointer;
  font-family: var(--ot-font-family);
  transition: transform var(--ot-transition-base) cubic-bezier(0.25, 0.8, 0.25, 1);
}

.ot-anime-card:hover {
  transform: translateY(-4px);
}

.ot-anime-card__cover {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4.2;
  border-radius: var(--ot-radius-lg);
  overflow: hidden;
  background-color: var(--ot-bg-tertiary);
}

.ot-anime-card__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--ot-transition-slow) cubic-bezier(0.25, 0.8, 0.25, 1);
}

.ot-anime-card:hover .ot-anime-card__cover img {
  transform: scale(1.06);
}

/* Score Badge */
.ot-anime-card__score {
  position: absolute;
  top: var(--ot-spacing-sm);
  left: var(--ot-spacing-sm);
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  color: var(--score-color);
  font-size: var(--ot-font-xs);
  font-weight: 700;
  padding: 4px 8px;
  border-radius: var(--ot-radius-sm);
  z-index: 2;
}

/* Type Badge */
.ot-anime-card__type {
  position: absolute;
  top: var(--ot-spacing-sm);
  right: var(--ot-spacing-sm);
  background-color: var(--ot-primary);
  color: var(--ot-white);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 3px 6px;
  border-radius: var(--ot-radius-sm);
  z-index: 2;
}

/* Hover Overlay */
.ot-anime-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    transparent 100%
  );
  display: flex;
  align-items: flex-end;
  padding: var(--ot-spacing-md);
  opacity: 0;
  transition: opacity var(--ot-transition-base) ease;
  z-index: 1;
}

.ot-anime-card:hover .ot-anime-card__overlay {
  opacity: 1;
}

.ot-anime-card__overlay-content {
  display: flex;
  flex-direction: column;
  gap: var(--ot-spacing-sm);
  width: 100%;
  transform: translateY(8px);
  transition: transform var(--ot-transition-base) ease;
}

.ot-anime-card:hover .ot-anime-card__overlay-content {
  transform: translateY(0);
}

/* Genre Tags */
.ot-anime-card__genres {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.ot-anime-card__genre-tag {
  background-color: rgba(55, 125, 255, 0.2);
  color: var(--ot-primary);
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: var(--ot-radius-sm);
}

/* Meta Info */
.ot-anime-card__meta {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-sm);
  font-size: var(--ot-font-xs);
  color: var(--ot-gray-100);
}

.ot-anime-card__meta span:not(:last-child)::after {
  content: '·';
  margin-left: var(--ot-spacing-sm);
  opacity: 0.5;
}

.ot-anime-card__status {
  font-weight: 600;
}

/* Title */
.ot-anime-card__title {
  margin-top: var(--ot-spacing-sm);
  font-size: var(--ot-font-sm);
  font-weight: 600;
  color: var(--ot-white);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.4;
}
</style>
