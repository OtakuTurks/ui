<script setup>
import { ref } from 'vue'
import OtUserProfileCard from '../../src/components/OtUserProfileCard.vue'

const premiumUser = ref({
  username: 'Eren Yeager',
  avatar: 'https://i.pravatar.cc/150?img=12',
  tier: 'Premium',
  status: 'Active Member',
  stats: {
    'Episodes Watched': 1240,
    'Manga Read': 450,
    Comments: 932
  }
})

const standardUser = ref({
  username: 'Mikasa Ackerman',
  avatar: 'https://i.pravatar.cc/150?img=5',
  tier: 'Standard',
  status: 'Offline',
  stats: {
    'Episodes Watched': 890,
    'Manga Read': 120,
    Comments: 341
  }
})
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Premium User Profile</h3>
      <div style="max-width: 400px; margin: 0 auto">
        <OtUserProfileCard :user="premiumUser" />
      </div>
    </section>

    <section class="preview__section" style="margin-top: 40px">
      <h3 class="preview__subtitle">Standard User Profile</h3>
      <div style="max-width: 400px; margin: 0 auto">
        <OtUserProfileCard :user="standardUser" />
      </div>
    </section>
  </div>
</template>
