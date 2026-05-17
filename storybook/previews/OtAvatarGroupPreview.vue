<script setup>
import OtAvatarGroup from '../../src/components/OtAvatarGroup.vue'

const avatarGroupData = [
  { src: 'https://i.pravatar.cc/150?img=11', name: 'Zoro Roronoa', color: 'success' },
  { src: 'https://i.pravatar.cc/150?img=12', name: 'Luffy Monkey D.', color: 'primary' },
  { src: 'https://i.pravatar.cc/150?img=13', name: 'Nami Cat Burglar', color: 'warning' },
  { src: 'https://i.pravatar.cc/150?img=14', name: 'Sanji Vinsmoke', color: 'danger' },
  { src: 'https://i.pravatar.cc/150?img=15', name: 'Nico Robin', color: 'primary' },
  { src: 'https://i.pravatar.cc/150?img=16', name: 'Chopper Tony Tony', color: 'success' }
]
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Default Stacking</h3>
      <div class="preview__row">
        <OtAvatarGroup :avatars="avatarGroupData" />
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Custom Max Display Limit</h3>
      <div class="preview__row">
        <OtAvatarGroup :avatars="avatarGroupData" :max="3" size="lg" />
      </div>
    </section>

    <section class="preview__section">
      <h3 class="preview__subtitle">Sizes & Spacings</h3>
      <div class="preview__col">
        <div>
          <p style="margin-bottom: 8px; color: var(--ot-gray-100)">Small Spacing & Small Size</p>
          <OtAvatarGroup :avatars="avatarGroupData" :max="4" size="sm" spacing="sm" />
        </div>
        <div>
          <p style="margin-bottom: 8px; color: var(--ot-gray-100)">
            Large Spacing & Extra Large Size
          </p>
          <OtAvatarGroup :avatars="avatarGroupData" :max="4" size="xl" spacing="lg" />
        </div>
      </div>
    </section>
  </div>
</template>
