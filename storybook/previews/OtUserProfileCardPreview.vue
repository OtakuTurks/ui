<script setup>
import { ref } from 'vue'
import OtUserProfileCard from '../../src/components/OtUserProfileCard.vue'

const legendUser = ref({
  username: 'ErenYeager_99',
  avatar: 'https://i.pravatar.cc/150?img=12',
  banner: 'https://thumbs2.imgbox.com/3c/69/qfWnI7bU_t.jpg',
  tier: 'Legend',
  status: 'Rumbler & Pioneer',
  episodesWatched: 1240,
  mangaRead: 450,
  commentsCount: 932,
  level: 85,
  xp: 750,
  maxXp: 1000,
  achievements: [
    { name: 'Freedom Fighter', icon: '🕊️', description: 'Unlock Eren Yeager status' },
    { name: 'First Class Otaku', icon: '👑', description: 'Watch more than 1000 episodes' },
    { name: 'VIP Supporter', icon: '⭐', description: 'Support community growth' }
  ]
})

const goldUser = ref({
  username: 'Mikasa_Ackerman',
  avatar: 'https://i.pravatar.cc/150?img=5',
  banner: 'https://thumbs2.imgbox.com/f8/9e/ccoQ0QLW_t.jpeg',
  tier: 'Gold',
  status: 'Protector of the Scarf',
  episodesWatched: 890,
  mangaRead: 120,
  commentsCount: 341,
  level: 42,
  xp: 320,
  maxXp: 500,
  achievements: [
    { name: 'Top Tier Defender', icon: '⚔️', description: 'Protect humanity' },
    { name: 'Loyal Friend', icon: '❤️', description: 'Maintain extreme friendship' }
  ]
})
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Legend Rank User Card</h3>
      <div style="max-width: 500px; margin: 0 auto">
        <OtUserProfileCard :user="legendUser" />
      </div>
    </section>

    <section class="preview__section" style="margin-top: 40px">
      <h3 class="preview__subtitle">Gold Rank User Card</h3>
      <div style="max-width: 500px; margin: 0 auto">
        <OtUserProfileCard :user="goldUser" />
      </div>
    </section>
  </div>
</template>
