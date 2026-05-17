<script setup>
import { ref } from 'vue'
import OtSessionManager from '../../src/components/OtSessionManager.vue'

const sessions = ref([
  {
    device: 'desktop',
    browser: 'Chrome',
    os: 'Windows 11',
    ip: '192.168.1.144',
    location: 'Istanbul, TR',
    isCurrent: true
  },
  {
    device: 'mobile',
    browser: 'Safari',
    os: 'iOS 17.4',
    ip: '85.105.42.12',
    location: 'Ankara, TR',
    lastActive: '2 hours ago'
  },
  {
    device: 'desktop',
    browser: 'Firefox',
    os: 'Linux (Ubuntu)',
    ip: '94.54.180.7',
    location: 'Izmir, TR',
    lastActive: '3 days ago'
  }
])

const loading = ref(false)

const handleRevoke = (session) => {
  loading.value = true
  // Simulating api revoke request
  setTimeout(() => {
    sessions.value = sessions.value.filter((s) => s.ip !== session.ip)
    loading.value = false
  }, 1000)
}
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Interactive Better Auth Sessions</h3>
      <div style="max-width: 600px; margin: 0 auto">
        <OtSessionManager :sessions="sessions" :loading="loading" @revoke="handleRevoke" />
      </div>
    </section>
  </div>
</template>
