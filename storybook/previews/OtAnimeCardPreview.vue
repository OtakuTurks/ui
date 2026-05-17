<script setup>
import OtAnimeCard from '../../src/components/OtAnimeCard.vue'

const animeCardData = [
  {
    title: 'One Piece',
    cover: 'https://cdn.myanimelist.net/images/anime/1244/138851.jpg',
    score: 8.7,
    genres: ['Action', 'Adventure', 'Fantasy'],
    type: 'TV',
    status: 'airing',
    year: 1999,
    episodes: '1100+'
  },
  {
    title: 'Attack on Titan',
    cover: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
    score: 8.5,
    genres: ['Action', 'Drama', 'Fantasy'],
    type: 'TV',
    status: 'completed',
    year: 2013,
    episodes: 87
  },
  {
    title: 'Jujutsu Kaisen',
    cover: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
    score: 8.6,
    genres: ['Action', 'Fantasy'],
    type: 'TV',
    status: 'airing',
    year: 2020,
    episodes: 48
  },
  {
    title: 'Demon Slayer',
    cover: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
    score: 8.5,
    genres: ['Action', 'Fantasy'],
    type: 'TV',
    status: 'airing',
    year: 2019,
    episodes: 44
  }
]
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Anime Grid</h3>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px">
        <OtAnimeCard v-for="(anime, i) in animeCardData" :key="i" v-bind="anime" />
      </div>
    </section>
  </div>
</template>
