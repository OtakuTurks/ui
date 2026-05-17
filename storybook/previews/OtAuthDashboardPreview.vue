<script setup>
import { ref } from 'vue'
import OtAuthDashboard from '../../src/components/OtAuthDashboard.vue'
import OtSessionManager from '../../src/components/OtSessionManager.vue'
import OtPasswordStrength from '../../src/components/OtPasswordStrength.vue'
import OtButton from '../../src/components/OtButton.vue'
import OtInput from '../../src/components/OtInput.vue'

const user = ref({
  name: 'Oğuzhan',
  email: 'oguzhan@otakuturks.com',
  avatar: 'https://i.pravatar.cc/150?img=11'
})

const navigation = ref([
  {
    id: 'profile',
    label: 'Profile Settings',
    description: 'Manage your personal information and avatar.',
    icon: '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'
  },
  {
    id: 'security',
    label: 'Security & Password',
    description: 'Update your password and secure your account.',
    icon: '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>'
  },
  {
    id: 'sessions',
    label: 'Active Sessions',
    description: 'Manage devices currently logged into your account.',
    icon: '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>'
  }
])

const activeTab = ref('profile')

// Mock data for sessions
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
  }
])
const loadingSession = ref(false)
const handleRevoke = (session) => {
  loadingSession.value = true
  setTimeout(() => {
    sessions.value = sessions.value.filter((s) => s.ip !== session.ip)
    loadingSession.value = false
  }, 1000)
}
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">BetterAuth User Dashboard</h3>
      <div style="max-width: 1000px; margin: 0 auto">
        <OtAuthDashboard :user="user" :navigation="navigation" v-model:active-tab="activeTab">
          <!-- Profile Tab -->
          <template #profile>
            <div style="display: flex; flex-direction: column; gap: 24px">
              <div style="display: flex; gap: 16px">
                <OtInput label="First Name" v-model="user.name" style="flex: 1" />
                <OtInput label="Last Name" model-value="Yılmaz" style="flex: 1" />
              </div>
              <OtInput label="Email Address" v-model="user.email" disabled />
              <div style="display: flex; justify-content: flex-end">
                <OtButton variant="primary">Save Changes</OtButton>
              </div>
            </div>
          </template>

          <!-- Security Tab -->
          <template #security>
            <div style="display: flex; flex-direction: column; gap: 24px">
              <OtInput
                label="Current Password"
                type="password"
                placeholder="Enter current password"
              />
              <div>
                <label
                  style="
                    display: block;
                    margin-bottom: 8px;
                    font-size: 14px;
                    color: var(--ot-gray-100);
                    font-weight: 500;
                  "
                  >New Password</label
                >
                <OtPasswordStrength />
              </div>
              <div style="display: flex; justify-content: flex-end">
                <OtButton variant="primary">Update Password</OtButton>
              </div>
            </div>
          </template>

          <!-- Sessions Tab -->
          <template #sessions>
            <OtSessionManager
              :sessions="sessions"
              :loading="loadingSession"
              @revoke="handleRevoke"
            />
          </template>
        </OtAuthDashboard>
      </div>
    </section>
  </div>
</template>
