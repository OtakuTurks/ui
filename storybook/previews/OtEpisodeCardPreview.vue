<script setup>
import OtEpisodeCard from '../../src/components/OtEpisodeCard.vue'

const episodeData = [
  {
    number: 'EP 1',
    title: 'The Day I Became a Shinigami',
    thumbnail: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
    duration: '23:40',
    watched: true,
    progress: 100
  },
  {
    number: 'EP 2',
    title: "The Shinigami's Work",
    thumbnail: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
    duration: '24:10',
    watched: true,
    progress: 100
  },
  {
    number: 'EP 3',
    title: "The Older Brother's Wish",
    thumbnail: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
    duration: '23:55',
    current: true,
    progress: 65
  },
  {
    number: 'EP 4',
    title: 'Cursed Sphere',
    thumbnail: 'https://cdn.myanimelist.net/images/anime/1244/138851.jpg',
    duration: '24:00',
    filler: true
  }
]
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Episode Listing</h3>
      <div class="preview__col" style="gap: 8px">
        <OtEpisodeCard v-for="(ep, i) in episodeData" :key="i" v-bind="ep" />
      </div>
    </section>
  </div>
</template>
