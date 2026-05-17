<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import OtAvatar from '../src/components/OtAvatar.vue'
import OtSearchModal from '../src/components/OtSearchModal.vue'
import OtToastContainer from '../src/components/OtToastContainer.vue'

// Import all preview components
import * as Previews from './previews/index.js'

const selectedComponent = ref('OtButton')
const searchModalOpen = ref(false)

const components = [
  { name: 'OtButton', category: 'Form', icon: null },
  { name: 'OtInput', category: 'Form', icon: null },
  { name: 'OtDropdown', category: 'Form', icon: null },
  { name: 'OtIconButton', category: 'Form', icon: null },
  { name: 'OtCheckbox', category: 'Form', icon: null },
  { name: 'OtSwitch', category: 'Form', icon: null },
  { name: 'OtTextarea', category: 'Form', icon: null },
  { name: 'OtSlider', category: 'Form', icon: null },
  { name: 'OtRadio', category: 'Form', icon: null },
  { name: 'OtFileInput', category: 'Form', icon: null },
  { name: 'OtColorPicker', category: 'Form', icon: null },
  { name: 'OtOtpInput', category: 'Form', icon: null },
  { name: 'OtCopyButton', category: 'Form', icon: null },
  { name: 'OtTagInput', category: 'Form', icon: null },
  { name: 'OtAvatar', category: 'Media', icon: null },
  { name: 'OtAvatarGroup', category: 'Media', icon: null },
  { name: 'OtAnimeCard', category: 'Media', icon: null },
  { name: 'OtEpisodeCard', category: 'Media', icon: null },
  { name: 'OtGrid', category: 'Layout', icon: null },
  { name: 'OtCard', category: 'Layout', icon: null },
  { name: 'OtDivider', category: 'Layout', icon: null },
  { name: 'OtGlassCard', category: 'Layout', icon: null },
  { name: 'OtMarquee', category: 'Layout', icon: null },
  { name: 'OtFooter', category: 'Layout', icon: null },
  { name: 'OtAdminDashboard', category: 'Layout', icon: null },
  { name: 'OtTabs', category: 'Navigation', icon: null },
  { name: 'OtPagination', category: 'Navigation', icon: null },
  { name: 'OtBreadcrumb', category: 'Navigation', icon: null },
  { name: 'OtBackToTop', category: 'Navigation', icon: null },
  { name: 'OtModal', category: 'Overlays', icon: null },
  { name: 'OtSearchModal', category: 'Overlays', icon: null },
  { name: 'OtTooltip', category: 'Overlays', icon: null },
  { name: 'OtDrawer', category: 'Overlays', icon: null },
  { name: 'OtAlert', category: 'Feedback', icon: null },
  { name: 'OtProgress', category: 'Feedback', icon: null },
  { name: 'OtToast', category: 'Feedback', icon: null },
  { name: 'OtSpinner', category: 'Feedback', icon: null },
  { name: 'OtResult', category: 'Feedback', icon: null },
  { name: 'OtBadge', category: 'Data Display', icon: null },
  { name: 'OtTag', category: 'Data Display', icon: null },
  { name: 'OtSkeleton', category: 'Data Display', icon: null },
  { name: 'OtAccordion', category: 'Data Display', icon: null },
  { name: 'OtEmptyState', category: 'Data Display', icon: null },
  { name: 'OtRating', category: 'Data Display', icon: null },
  { name: 'OtStatistic', category: 'Data Display', icon: null },
  { name: 'OtList', category: 'Data Display', icon: null },
  { name: 'OtTimeline', category: 'Data Display', icon: null },
  { name: 'OtKbd', category: 'Data Display', icon: null },
  { name: 'OtTerminal', category: 'Data Display', icon: null },
  { name: 'OtScoreDisplay', category: 'Data Display', icon: null },
  { name: 'OtAuthCard', category: 'Auth', icon: null },
  { name: 'OtSocialButton', category: 'Auth', icon: null },
  { name: 'OtPasswordStrength', category: 'Auth', icon: null },
  { name: 'OtSessionManager', category: 'Auth', icon: null },
  { name: 'OtUserProfileCard', category: 'Auth', icon: null },
  { name: 'OtAuthDashboard', category: 'Auth', icon: null },
  { name: 'OtCommentSection', category: 'Data Display', icon: null },
  { name: 'OtPlayerSelector', category: 'Media', icon: null }
]

// Build preview map dynamically from imported previews
const previewMap = {}
for (const [key, value] of Object.entries(Previews)) {
  // OtButtonPreview -> OtButton
  const name = key.replace('Preview', '')
  previewMap[name] = value
}

const currentPreview = computed(() => previewMap[selectedComponent.value] || null)

const groupedComponents = computed(() => {
  const groups = {}
  components.forEach((comp) => {
    if (!groups[comp.category]) {
      groups[comp.category] = []
    }
    groups[comp.category].push(comp)
  })
  return groups
})

const selectComponent = (name) => {
  selectedComponent.value = name
}

const handleSearchSelect = (item) => {
  selectedComponent.value = item.name
}

const handleKeydown = (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
    event.preventDefault()
    searchModalOpen.value = true
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="storybook">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar__header">
        <div class="sidebar__header-top">
          <h1 class="sidebar__brand">
            <OtAvatar
              src="https://thumbs2.imgbox.com/f8/9e/ccoQ0QLW_t.jpeg"
              name="User One"
              size="md"
            />
            OtakuTurks UI
          </h1>
          <div class="sidebar__external-links">
            <a
              href="https://github.com/OtakuTurks/ui"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Repository"
              class="sidebar__link-icon"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                ></path>
              </svg>
            </a>
          </div>
        </div>
        <button class="sidebar__search" @click="searchModalOpen = true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
          <span>Search</span>
          <kbd>Ctrl K</kbd>
        </button>
      </div>

      <nav class="sidebar__nav">
        <div v-for="(comps, category) in groupedComponents" :key="category" class="sidebar__group">
          <div class="sidebar__category">{{ category }}</div>
          <button
            v-for="comp in comps"
            :key="comp.name"
            class="sidebar__item"
            :class="{ 'sidebar__item--active': selectedComponent === comp.name }"
            @click="selectComponent(comp.name)"
          >
            {{ comp.name }}
          </button>
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main">
      <header class="main__header">
        <h2 class="main__title">{{ selectedComponent }}</h2>
      </header>

      <div class="main__content">
        <component :is="currentPreview" v-if="currentPreview" />
        <div v-else class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">No Preview Available</h3>
            <p style="color: var(--ot-gray-100)">
              Preview for {{ selectedComponent }} has not been created yet.
            </p>
          </section>
        </div>
      </div>
    </main>

    <!-- Global Toast Container -->
    <OtToastContainer />

    <!-- Search Modal -->
    <OtSearchModal
      :is-open="searchModalOpen"
      :items="components"
      @close="searchModalOpen = false"
      @select="handleSearchSelect"
    />
  </div>
</template>

<style scoped>
.storybook {
  display: flex;
  min-height: 100vh;
  font-family: var(--ot-font-family);
}

/* Sidebar */
.sidebar {
  width: 260px;
  background-color: var(--ot-bg-secondary);
  border-right: 1px solid var(--ot-gray-300);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
}

.sidebar__header {
  padding: var(--ot-spacing-lg);
  border-bottom: 1px solid var(--ot-gray-300);
}

.sidebar__header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--ot-spacing-md);
}

.sidebar__brand {
  font-size: var(--ot-font-lg);
  font-weight: 700;
  color: var(--ot-white);
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-sm);
  white-space: nowrap;
}

.sidebar__external-links {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-sm);
}

.sidebar__link-icon {
  color: var(--ot-gray-200);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: var(--ot-radius-sm);
  transition: all var(--ot-transition-fast);
}

.sidebar__link-icon:hover {
  color: var(--ot-white);
  background-color: var(--ot-gray-400);
}

.sidebar__search {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-sm);
  width: 100%;
  padding: var(--ot-spacing-sm) var(--ot-spacing-md);
  background-color: var(--ot-gray-400);
  border: 1px solid var(--ot-gray-300);
  border-radius: var(--ot-radius-base);
  color: var(--ot-gray-100);
  font-size: var(--ot-font-sm);
  cursor: pointer;
  transition: all var(--ot-transition-fast);
}

.sidebar__search:hover {
  border-color: var(--ot-gray-200);
}

.sidebar__search kbd {
  margin-left: auto;
  padding: 2px 6px;
  background-color: var(--ot-gray-300);
  border-radius: var(--ot-radius-sm);
  font-size: var(--ot-font-xs);
  font-family: monospace;
}

.sidebar__nav {
  flex: 1;
  overflow-y: auto;
  padding: var(--ot-spacing-md) 0;
}

.sidebar__group {
  margin-bottom: var(--ot-spacing-md);
}

.sidebar__category {
  padding: var(--ot-spacing-xs) var(--ot-spacing-lg);
  font-size: var(--ot-font-xs);
  font-weight: 600;
  color: var(--ot-gray-100);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.sidebar__item {
  display: block;
  width: 100%;
  padding: var(--ot-spacing-sm) var(--ot-spacing-lg);
  background: none;
  border: none;
  color: var(--ot-gray-200);
  font-size: var(--ot-font-sm);
  text-align: left;
  cursor: pointer;
  transition: all var(--ot-transition-fast);
}

.sidebar__item:hover {
  background-color: var(--ot-gray-300);
  color: var(--ot-white);
}

.sidebar__item--active {
  background-color: var(--ot-primary);
  color: var(--ot-white);
  font-weight: 600;
}

/* Main Content */
.main {
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main__header {
  padding: var(--ot-spacing-lg) var(--ot-spacing-xl);
  border-bottom: 1px solid var(--ot-gray-300);
  background-color: var(--ot-bg-secondary);
  position: sticky;
  top: 0;
  z-index: 50;
}

.main__title {
  font-size: var(--ot-font-2xl);
  font-weight: 700;
  color: var(--ot-white);
  margin: 0;
}

.main__content {
  flex: 1;
  padding: var(--ot-spacing-xl);
  background-color: var(--ot-bg-primary);
}

/* Preview - global styles for child components */
.main__content :deep(.preview) {
  max-width: 1200px;
}

.main__content :deep(.preview__section) {
  margin-bottom: var(--ot-spacing-2xl);
}

.main__content :deep(.preview__subtitle) {
  font-size: var(--ot-font-lg);
  font-weight: 600;
  color: var(--ot-gray-200);
  margin: 0 0 var(--ot-spacing-md) 0;
}

.main__content :deep(.preview__row) {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ot-spacing-md);
  align-items: center;
}

.main__content :deep(.preview__col) {
  display: flex;
  flex-direction: column;
  gap: var(--ot-spacing-md);
  max-width: 400px;
}

.main__content :deep(.grid-item) {
  background-color: var(--ot-gray-400);
  padding: var(--ot-spacing-lg);
  border-radius: var(--ot-radius-base);
  text-align: center;
  color: var(--ot-gray-200);
  font-weight: 600;
}
</style>
