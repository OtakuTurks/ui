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
  }
})

defineEmits(['click'])
</script>

<template>
  <div class="ot-episode-card" @click="$emit('click')">
    <div class="ot-episode-card__thumbnail-box">
      <div class="ot-episode-card__ratio">
        <img :src="thumbnail" :alt="title" loading="lazy" />
      </div>
    </div>

    <div class="ot-episode-card__content">
      <h6 class="ot-episode-card__title" :title="title">{{ title }}</h6>
      <span class="ot-episode-card__subtitle">Bölüm {{ number }}</span>
    </div>
  </div>
</template>

<style scoped>
.ot-episode-card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  font-family: var(--ot-font-family);
  width: 100%;
}

.ot-episode-card__thumbnail-box {
  background-color: var(--ot-gray-300);
  border-radius: var(--ot-radius-base);
  overflow: hidden;
  transition: box-shadow 250ms linear;
}

.ot-episode-card:hover .ot-episode-card__thumbnail-box {
  box-shadow: 0 0 0 4px var(--ot-primary);
}

.ot-episode-card__ratio {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
}

.ot-episode-card__ratio img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.ot-episode-card__content {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
}

.ot-episode-card__title {
  margin: 0 0 2px 0;
  color: var(--ot-white);
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ot-episode-card__subtitle {
  color: var(--ot-gray-200);
  font-size: var(--ot-font-sm);
}
</style>
