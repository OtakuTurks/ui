<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import OtButton from '../src/components/OtButton.vue'
import OtInput from '../src/components/OtInput.vue'
import OtDropdown from '../src/components/OtDropdown.vue'
import OtModal from '../src/components/OtModal.vue'
import OtGrid from '../src/components/OtGrid.vue'
import OtAvatar from '../src/components/OtAvatar.vue'
import OtIconButton from '../src/components/OtIconButton.vue'
import OtSearchModal from '../src/components/OtSearchModal.vue'
import OtCheckbox from '../src/components/OtCheckbox.vue'
import OtSwitch from '../src/components/OtSwitch.vue'
import OtCard from '../src/components/OtCard.vue'
import OtBadge from '../src/components/OtBadge.vue'
import OtTooltip from '../src/components/OtTooltip.vue'
import OtTabs from '../src/components/OtTabs.vue'
import OtTab from '../src/components/OtTab.vue'
import OtProgress from '../src/components/OtProgress.vue'
import OtAlert from '../src/components/OtAlert.vue'
import OtTag from '../src/components/OtTag.vue'
import OtSkeleton from '../src/components/OtSkeleton.vue'
import OtToastContainer from '../src/components/OtToastContainer.vue'
import OtAccordion from '../src/components/OtAccordion.vue'
import OtAccordionItem from '../src/components/OtAccordionItem.vue'
import OtSpinner from '../src/components/OtSpinner.vue'
import OtDrawer from '../src/components/OtDrawer.vue'
import OtPagination from '../src/components/OtPagination.vue'
import OtBreadcrumb from '../src/components/OtBreadcrumb.vue'
import OtBreadcrumbItem from '../src/components/OtBreadcrumbItem.vue'
import OtTextarea from '../src/components/OtTextarea.vue'
import OtSlider from '../src/components/OtSlider.vue'
import OtEmptyState from '../src/components/OtEmptyState.vue'
import OtRadio from '../src/components/OtRadio.vue'
import OtDivider from '../src/components/OtDivider.vue'
import OtKbd from '../src/components/OtKbd.vue'
import OtRating from '../src/components/OtRating.vue'
import OtStatistic from '../src/components/OtStatistic.vue'
import OtFileInput from '../src/components/OtFileInput.vue'
import OtList from '../src/components/OtList.vue'
import OtListItem from '../src/components/OtListItem.vue'
import OtTimeline from '../src/components/OtTimeline.vue'
import OtTimelineItem from '../src/components/OtTimelineItem.vue'
import OtColorPicker from '../src/components/OtColorPicker.vue'
import OtOtpInput from '../src/components/OtOtpInput.vue'
import OtCopyButton from '../src/components/OtCopyButton.vue'
import OtAvatarGroup from '../src/components/OtAvatarGroup.vue'
import OtResult from '../src/components/OtResult.vue'
import OtGlassCard from '../src/components/OtGlassCard.vue'
import OtTerminal from '../src/components/OtTerminal.vue'
import OtMarquee from '../src/components/OtMarquee.vue'
import OtTagInput from '../src/components/OtTagInput.vue'
import OtBackToTop from '../src/components/OtBackToTop.vue'
import OtAuthCard from '../src/components/OtAuthCard.vue'
import OtSocialButton from '../src/components/OtSocialButton.vue'
import OtPasswordStrength from '../src/components/OtPasswordStrength.vue'
import OtAnimeCard from '../src/components/OtAnimeCard.vue'
import OtEpisodeCard from '../src/components/OtEpisodeCard.vue'
import OtScoreDisplay from '../src/components/OtScoreDisplay.vue'
import { useToast } from '../src/composables/useToast'

const selectedComponent = ref('OtButton')
const searchModalOpen = ref(false)

const components = [
  { name: 'OtButton', category: 'Form', icon: null },
  { name: 'OtInput', category: 'Form', icon: null },
  { name: 'OtDropdown', category: 'Form', icon: null },
  { name: 'OtIconButton', category: 'Form', icon: null },
  { name: 'OtCheckbox', category: 'Form', icon: null },
  { name: 'OtSwitch', category: 'Form', icon: null },
  { name: 'OtAvatar', category: 'Media', icon: null },
  { name: 'OtGrid', category: 'Layout', icon: null },
  { name: 'OtCard', category: 'Layout', icon: null },
  { name: 'OtTabs', category: 'Navigation', icon: null },
  { name: 'OtModal', category: 'Overlays', icon: null },
  { name: 'OtSearchModal', category: 'Overlays', icon: null },
  { name: 'OtTooltip', category: 'Overlays', icon: null },
  { name: 'OtAlert', category: 'Feedback', icon: null },
  { name: 'OtProgress', category: 'Feedback', icon: null },
  { name: 'OtBadge', category: 'Data Display', icon: null },
  { name: 'OtTag', category: 'Data Display', icon: null },
  { name: 'OtSkeleton', category: 'Data Display', icon: null },
  { name: 'OtAccordion', category: 'Data Display', icon: null },
  { name: 'OtToast', category: 'Feedback', icon: null },
  { name: 'OtSpinner', category: 'Feedback', icon: null },
  { name: 'OtDrawer', category: 'Overlays', icon: null },
  { name: 'OtPagination', category: 'Navigation', icon: null },
  { name: 'OtBreadcrumb', category: 'Navigation', icon: null },
  { name: 'OtTextarea', category: 'Form', icon: null },
  { name: 'OtSlider', category: 'Form', icon: null },
  { name: 'OtRadio', category: 'Form', icon: null },
  { name: 'OtFileInput', category: 'Form', icon: null },
  { name: 'OtColorPicker', category: 'Form', icon: null },
  { name: 'OtEmptyState', category: 'Data Display', icon: null },
  { name: 'OtRating', category: 'Data Display', icon: null },
  { name: 'OtStatistic', category: 'Data Display', icon: null },
  { name: 'OtList', category: 'Data Display', icon: null },
  { name: 'OtTimeline', category: 'Data Display', icon: null },
  { name: 'OtKbd', category: 'Data Display', icon: null },
  { name: 'OtDivider', category: 'Layout', icon: null },
  { name: 'OtOtpInput', category: 'Form', icon: null },
  { name: 'OtCopyButton', category: 'Form', icon: null },
  { name: 'OtAvatarGroup', category: 'Media', icon: null },
  { name: 'OtResult', category: 'Feedback', icon: null },
  { name: 'OtGlassCard', category: 'Layout', icon: null },
  { name: 'OtTerminal', category: 'Data Display', icon: null },
  { name: 'OtMarquee', category: 'Layout', icon: null },
  { name: 'OtTagInput', category: 'Form', icon: null },
  { name: 'OtBackToTop', category: 'Navigation', icon: null },
  { name: 'OtAuthCard', category: 'Auth', icon: null },
  { name: 'OtSocialButton', category: 'Auth', icon: null },
  { name: 'OtPasswordStrength', category: 'Auth', icon: null },
  { name: 'OtAnimeCard', category: 'Media', icon: null },
  { name: 'OtEpisodeCard', category: 'Media', icon: null },
  { name: 'OtScoreDisplay', category: 'Data Display', icon: null }
]

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

// Demo data for components
const dropdownOptions = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3', disabled: true },
  { label: 'Option 4', value: 'opt4' }
]

const inputModel = ref('')
const dropdownModel = ref(null)
const modalOpen = ref(false)
const checkboxModel = ref(false)
const checkboxArrayModel = ref(['opt1'])
const switchModel = ref(false)
const progressValue = ref(65)

const toast = useToast()

const triggerToast = (variant = 'info') => {
  const title = variant.charAt(0).toUpperCase() + variant.slice(1)
  const message = `This is a ${variant} toast message that stacks!`

  if (variant === 'success') toast.success(message, { title })
  else if (variant === 'warning') toast.warning(message, { title })
  else if (variant === 'danger') toast.error(message, { title })
  else toast.info(message, { title })
}

const drawerOpen = ref(false)
const drawerPosition = ref('right')
const currentPage = ref(1)
const textareaModel = ref('')
const sliderModel = ref(50)
const radioModel = ref('opt1')
const otpModel = ref('')
const tagInputModel = ref(['anime', 'manga', 'community'])
const authPasswordModel = ref('')

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

const avatarGroupData = [
  { src: 'https://i.pravatar.cc/150?img=11', name: 'Zoro Roronoa', color: 'success' },
  { src: 'https://i.pravatar.cc/150?img=12', name: 'Luffy Monkey D.', color: 'primary' },
  { src: 'https://i.pravatar.cc/150?img=13', name: 'Nami Cat Burglar', color: 'warning' },
  { src: 'https://i.pravatar.cc/150?img=14', name: 'Sanji Vinsmoke', color: 'danger' },
  { src: 'https://i.pravatar.cc/150?img=15', name: 'Nico Robin', color: 'primary' },
  { src: 'https://i.pravatar.cc/150?img=16', name: 'Chopper Tony Tony', color: 'success' }
]

const openDrawer = (pos) => {
  drawerPosition.value = pos
  drawerOpen.value = true
}
</script>

<template>
  <div class="storybook">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar__header">
        <h1 class="sidebar__brand">
          <OtAvatar
            src="https://thumbs2.imgbox.com/f8/9e/ccoQ0QLW_t.jpeg"
            name="User One"
            size="md"
          />
          OtakuTurks UI
        </h1>
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
        <!-- OtButton Preview -->
        <div v-if="selectedComponent === 'OtButton'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Variants</h3>
            <div class="preview__row">
              <OtButton variant="primary">Primary</OtButton>
              <OtButton variant="secondary">Secondary</OtButton>
              <OtButton variant="danger">Danger</OtButton>
              <OtButton variant="warning">Warning</OtButton>
              <OtButton variant="success">Success</OtButton>
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Sizes</h3>
            <div class="preview__row">
              <OtButton size="sm">Small</OtButton>
              <OtButton size="md">Medium</OtButton>
              <OtButton size="lg">Large</OtButton>
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">States</h3>
            <div class="preview__row">
              <OtButton>Normal</OtButton>
              <OtButton disabled>Disabled</OtButton>
              <OtButton full-width>Full Width</OtButton>
            </div>
          </section>
        </div>

        <!-- OtInput Preview -->
        <div v-if="selectedComponent === 'OtInput'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Types</h3>
            <div class="preview__col">
              <OtInput v-model="inputModel" placeholder="Text input" />
              <OtInput type="password" placeholder="Password input" />
              <OtInput type="email" placeholder="Email input" />
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Sizes</h3>
            <div class="preview__col">
              <OtInput size="sm" placeholder="Small" />
              <OtInput size="md" placeholder="Medium" />
              <OtInput size="lg" placeholder="Large" />
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">States</h3>
            <div class="preview__col">
              <OtInput placeholder="Normal" />
              <OtInput placeholder="Error" error />
              <OtInput placeholder="Disabled" disabled />
              <OtInput placeholder="Full width" full-width />
            </div>
          </section>
        </div>

        <!-- OtDropdown Preview -->
        <div v-if="selectedComponent === 'OtDropdown'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Default</h3>
            <div class="preview__row">
              <OtDropdown
                v-model="dropdownModel"
                :options="dropdownOptions"
                placeholder="Select option"
              />
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Sizes</h3>
            <div class="preview__row">
              <OtDropdown size="sm" :options="dropdownOptions" placeholder="Small" />
              <OtDropdown size="md" :options="dropdownOptions" placeholder="Medium" />
              <OtDropdown size="lg" :options="dropdownOptions" placeholder="Large" />
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">States</h3>
            <div class="preview__row">
              <OtDropdown :options="dropdownOptions" placeholder="Normal" />
              <OtDropdown :options="dropdownOptions" placeholder="Disabled" disabled />
              <OtDropdown :options="dropdownOptions" placeholder="Full width" full-width />
            </div>
          </section>
        </div>

        <!-- OtIconButton Preview -->
        <div v-if="selectedComponent === 'OtIconButton'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Variants</h3>
            <div class="preview__row">
              <OtIconButton variant="primary" aria-label="Primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  />
                </svg>
              </OtIconButton>
              <OtIconButton variant="secondary" aria-label="Secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  />
                </svg>
              </OtIconButton>
              <OtIconButton variant="danger" aria-label="Danger">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  />
                </svg>
              </OtIconButton>
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Sizes</h3>
            <div class="preview__row">
              <OtIconButton size="sm" aria-label="Small">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  />
                </svg>
              </OtIconButton>
              <OtIconButton size="md" aria-label="Medium">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  />
                </svg>
              </OtIconButton>
              <OtIconButton size="lg" aria-label="Large">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  />
                </svg>
              </OtIconButton>
            </div>
          </section>
        </div>

        <!-- OtAvatar Preview -->
        <div v-if="selectedComponent === 'OtAvatar'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">With Image</h3>
            <div class="preview__row">
              <OtAvatar src="https://i.pravatar.cc/150?img=1" name="User One" />
              <OtAvatar src="https://i.pravatar.cc/150?img=2" name="User Two" />
              <OtAvatar src="https://i.pravatar.cc/150?img=3" name="User Three" />
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">With Initials</h3>
            <div class="preview__row">
              <OtAvatar name="John Doe" />
              <OtAvatar name="Jane Smith" color="danger" />
              <OtAvatar name="Bob Wilson" color="success" />
              <OtAvatar name="Alice" color="warning" />
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Sizes</h3>
            <div class="preview__row">
              <OtAvatar name="Small" size="sm" />
              <OtAvatar name="Medium" size="md" />
              <OtAvatar name="Large" size="lg" />
              <OtAvatar name="XLarge" size="xl" />
              <OtAvatar name="Custom" :size="60" />
            </div>
          </section>
        </div>

        <!-- OtGrid Preview -->
        <div v-if="selectedComponent === 'OtGrid'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Fixed Columns</h3>
            <OtGrid :cols="3" :gap="16">
              <div class="grid-item">1</div>
              <div class="grid-item">2</div>
              <div class="grid-item">3</div>
              <div class="grid-item">4</div>
              <div class="grid-item">5</div>
              <div class="grid-item">6</div>
            </OtGrid>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Responsive Grid</h3>
            <OtGrid :cols="{ xs: 1, sm: 2, md: 3, lg: 4 }" :gap="16">
              <div class="grid-item">1</div>
              <div class="grid-item">2</div>
              <div class="grid-item">3</div>
              <div class="grid-item">4</div>
            </OtGrid>
          </section>
        </div>

        <!-- OtModal Preview -->
        <div v-if="selectedComponent === 'OtModal'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Modal</h3>
            <div class="preview__row">
              <OtButton @click="modalOpen = true">Open Modal</OtButton>
            </div>
          </section>

          <OtModal :is-open="modalOpen" @close="modalOpen = false">
            <h2 style="margin-bottom: 16px; color: var(--ot-gray-200)">Modal Title</h2>
            <p style="color: var(--ot-gray-200)">
              This is a modal content. You can put any content here.
            </p>
            <div style="margin-top: 24px; display: flex; gap: 8px">
              <OtButton variant="secondary" @click="modalOpen = false">Cancel</OtButton>
              <OtButton @click="modalOpen = false">Confirm</OtButton>
            </div>
          </OtModal>
        </div>

        <!-- OtSearchModal Preview -->
        <div v-if="selectedComponent === 'OtSearchModal'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Search Modal</h3>
            <div class="preview__row">
              <OtButton @click="searchModalOpen = true">Open Search (Ctrl+K)</OtButton>
            </div>
          </section>
        </div>

        <!-- OtCheckbox Preview -->
        <div v-if="selectedComponent === 'OtCheckbox'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Basic</h3>
            <div class="preview__col">
              <OtCheckbox v-model="checkboxModel" label="Accept terms and conditions" />
              <OtCheckbox :model-value="true" label="Checked" />
              <OtCheckbox disabled label="Disabled" />
              <OtCheckbox :model-value="true" disabled label="Disabled checked" />
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Indeterminate</h3>
            <div class="preview__col">
              <OtCheckbox indeterminate label="Indeterminate state" />
            </div>
          </section>
        </div>

        <!-- OtSwitch Preview -->
        <div v-if="selectedComponent === 'OtSwitch'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Basic</h3>
            <div class="preview__col">
              <OtSwitch v-model="switchModel" label="Toggle feature" />
              <OtSwitch :model-value="true" label="Enabled" />
              <OtSwitch disabled label="Disabled" />
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Sizes</h3>
            <div class="preview__col">
              <OtSwitch size="sm" label="Small" />
              <OtSwitch size="md" label="Medium" />
              <OtSwitch size="lg" label="Large" />
            </div>
          </section>
        </div>

        <!-- OtCard Preview -->
        <div v-if="selectedComponent === 'OtCard'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Variants</h3>
            <div class="preview__row" style="gap: 16px">
              <OtCard variant="elevated" style="width: 200px">
                <h4 style="color: var(--ot-gray-200); margin-bottom: 8px">Elevated</h4>
                <p style="color: var(--ot-gray-100); font-size: 14px">Card with shadow elevation</p>
              </OtCard>
              <OtCard variant="outlined" style="width: 200px">
                <h4 style="color: var(--ot-gray-200); margin-bottom: 8px">Outlined</h4>
                <p style="color: var(--ot-gray-100); font-size: 14px">Card with border</p>
              </OtCard>
              <OtCard variant="filled" style="width: 200px">
                <h4 style="color: var(--ot-gray-200); margin-bottom: 8px">Filled</h4>
                <p style="color: var(--ot-gray-100); font-size: 14px">
                  Card with filled background
                </p>
              </OtCard>
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Hoverable</h3>
            <div class="preview__row">
              <OtCard variant="elevated" hoverable style="width: 200px">
                <p style="color: var(--ot-gray-200)">Hover over me!</p>
              </OtCard>
            </div>
          </section>
        </div>

        <!-- OtBadge Preview -->
        <div v-if="selectedComponent === 'OtBadge'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Variants</h3>
            <div class="preview__row">
              <OtBadge variant="primary">Primary</OtBadge>
              <OtBadge variant="secondary">Secondary</OtBadge>
              <OtBadge variant="success">Success</OtBadge>
              <OtBadge variant="warning">Warning</OtBadge>
              <OtBadge variant="danger">Danger</OtBadge>
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Sizes</h3>
            <div class="preview__row">
              <OtBadge size="sm">Small</OtBadge>
              <OtBadge size="md">Medium</OtBadge>
              <OtBadge size="lg">Large</OtBadge>
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Dot Badge</h3>
            <div class="preview__row">
              <OtBadge variant="primary" dot />
              <OtBadge variant="success" dot />
              <OtBadge variant="danger" dot />
            </div>
          </section>
        </div>

        <!-- OtTooltip Preview -->
        <div v-if="selectedComponent === 'OtTooltip'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Positions</h3>
            <div class="preview__row" style="gap: 40px">
              <OtTooltip content="Top tooltip" position="top">
                <OtButton>Top</OtButton>
              </OtTooltip>
              <OtTooltip content="Bottom tooltip" position="bottom">
                <OtButton>Bottom</OtButton>
              </OtTooltip>
              <OtTooltip content="Left tooltip" position="left">
                <OtButton>Left</OtButton>
              </OtTooltip>
              <OtTooltip content="Right tooltip" position="right">
                <OtButton>Right</OtButton>
              </OtTooltip>
            </div>
          </section>
        </div>

        <!-- OtTabs Preview -->
        <div v-if="selectedComponent === 'OtTabs'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Line Variant</h3>
            <OtTabs variant="line" style="max-width: 500px">
              <OtTab value="tab1" label="Tab One">
                <p style="color: var(--ot-gray-200)">Content for Tab One</p>
              </OtTab>
              <OtTab value="tab2" label="Tab Two">
                <p style="color: var(--ot-gray-200)">Content for Tab Two</p>
              </OtTab>
              <OtTab value="tab3" label="Tab Three">
                <p style="color: var(--ot-gray-200)">Content for Tab Three</p>
              </OtTab>
            </OtTabs>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Pills Variant</h3>
            <OtTabs variant="pills" style="max-width: 500px">
              <OtTab value="tab1" label="Tab One">
                <p style="color: var(--ot-gray-200)">Content for Tab One</p>
              </OtTab>
              <OtTab value="tab2" label="Tab Two">
                <p style="color: var(--ot-gray-200)">Content for Tab Two</p>
              </OtTab>
            </OtTabs>
          </section>
        </div>

        <!-- OtProgress Preview -->
        <div v-if="selectedComponent === 'OtProgress'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Variants</h3>
            <div class="preview__col" style="max-width: 400px; gap: 24px">
              <OtProgress :value="65" variant="primary" show-label />
              <OtProgress :value="80" variant="success" show-label />
              <OtProgress :value="45" variant="warning" show-label />
              <OtProgress :value="30" variant="danger" show-label />
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Sizes</h3>
            <div class="preview__col" style="max-width: 400px; gap: 24px">
              <OtProgress :value="70" size="sm" />
              <OtProgress :value="70" size="md" />
              <OtProgress :value="70" size="lg" />
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Striped & Animated</h3>
            <div class="preview__col" style="max-width: 400px; gap: 24px">
              <OtProgress :value="60" striped />
              <OtProgress :value="75" striped animated />
            </div>
          </section>
        </div>

        <!-- OtAlert Preview -->
        <div v-if="selectedComponent === 'OtAlert'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Variants</h3>
            <div class="preview__col" style="max-width: 600px; gap: 16px">
              <OtAlert variant="info" title="Information">
                This is an informational alert message.
              </OtAlert>
              <OtAlert variant="success" title="Success!">
                Your changes have been saved successfully.
              </OtAlert>
              <OtAlert variant="warning" title="Warning">
                Please review your input before continuing.
              </OtAlert>
              <OtAlert variant="danger" title="Error">
                Something went wrong. Please try again.
              </OtAlert>
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Dismissible</h3>
            <div class="preview__col" style="max-width: 600px">
              <OtAlert variant="info" dismissible> This alert can be dismissed. </OtAlert>
            </div>
          </section>
        </div>

        <!-- OtTag Preview -->
        <div v-if="selectedComponent === 'OtTag'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Variants</h3>
            <div class="preview__row">
              <OtTag variant="primary">Primary</OtTag>
              <OtTag variant="secondary">Secondary</OtTag>
              <OtTag variant="success">Success</OtTag>
              <OtTag variant="warning">Warning</OtTag>
              <OtTag variant="danger">Danger</OtTag>
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Sizes</h3>
            <div class="preview__row">
              <OtTag size="sm">Small</OtTag>
              <OtTag size="md">Medium</OtTag>
              <OtTag size="lg">Large</OtTag>
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Removable</h3>
            <div class="preview__row">
              <OtTag variant="primary" removable @remove="() => {}">Removable</OtTag>
              <OtTag variant="danger" removable @remove="() => {}">Delete</OtTag>
            </div>
          </section>
        </div>

        <!-- OtSkeleton Preview -->
        <div v-if="selectedComponent === 'OtSkeleton'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Variants</h3>
            <div class="preview__row" style="gap: 24px">
              <OtSkeleton variant="text" width="200px" />
              <OtSkeleton variant="circular" :width="60" :height="60" />
              <OtSkeleton variant="rectangular" :width="200" :height="100" />
              <OtSkeleton variant="rounded" :width="200" :height="100" />
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Animations</h3>
            <div class="preview__col" style="max-width: 300px; gap: 16px">
              <OtSkeleton variant="text" animation="pulse" />
              <OtSkeleton variant="text" animation="wave" />
              <OtSkeleton variant="text" animation="none" />
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Card Loading</h3>
            <OtCard style="width: 300px">
              <div style="display: flex; gap: 16px; align-items: center">
                <OtSkeleton variant="circular" :width="40" :height="40" />
                <div style="flex: 1">
                  <OtSkeleton variant="text" width="80%" height="16" style="margin-bottom: 8px" />
                  <OtSkeleton variant="text" width="60%" height="12" />
                </div>
              </div>
            </OtCard>
          </section>
        </div>

        <!-- OtToast Preview -->
        <div v-if="selectedComponent === 'OtToast'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Variants (Stacked)</h3>
            <div class="preview__row">
              <OtButton variant="primary" @click="triggerToast('info')">Info Toast</OtButton>
              <OtButton variant="success" @click="triggerToast('success')">Success Toast</OtButton>
              <OtButton variant="warning" @click="triggerToast('warning')">Warning Toast</OtButton>
              <OtButton variant="danger" @click="triggerToast('danger')">Danger Toast</OtButton>
            </div>
          </section>
        </div>

        <!-- OtAccordion Preview -->
        <div v-if="selectedComponent === 'OtAccordion'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Single Item Open</h3>
            <div class="preview__col" style="max-width: 600px">
              <OtAccordion>
                <OtAccordionItem name="1" title="Accordion Item 1">
                  <p>Content for the first accordion item.</p>
                </OtAccordionItem>
                <OtAccordionItem name="2" title="Accordion Item 2">
                  <p>Content for the second accordion item.</p>
                </OtAccordionItem>
                <OtAccordionItem name="3" title="Accordion Item 3">
                  <p>Content for the third accordion item.</p>
                </OtAccordionItem>
              </OtAccordion>
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Multiple Items Open</h3>
            <div class="preview__col" style="max-width: 600px">
              <OtAccordion multiple>
                <OtAccordionItem name="1" title="Accordion Item 1">
                  <p>Content for the first accordion item.</p>
                </OtAccordionItem>
                <OtAccordionItem name="2" title="Accordion Item 2">
                  <p>Content for the second accordion item.</p>
                </OtAccordionItem>
              </OtAccordion>
            </div>
          </section>
        </div>

        <!-- OtSpinner Preview -->
        <div v-if="selectedComponent === 'OtSpinner'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Variants</h3>
            <div
              class="preview__row"
              style="background: var(--ot-gray-400); padding: 16px; border-radius: 8px"
            >
              <OtSpinner variant="primary" />
              <OtSpinner variant="success" />
              <OtSpinner variant="warning" />
              <OtSpinner variant="danger" />
              <OtSpinner variant="white" />
              <OtSpinner variant="secondary" />
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Sizes</h3>
            <div class="preview__row">
              <OtSpinner size="sm" />
              <OtSpinner size="md" />
              <OtSpinner size="lg" />
              <OtSpinner size="xl" />
            </div>
          </section>
        </div>

        <!-- OtDrawer Preview -->
        <div v-if="selectedComponent === 'OtDrawer'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Positions</h3>
            <div class="preview__row">
              <OtButton @click="openDrawer('left')">Left Drawer</OtButton>
              <OtButton @click="openDrawer('right')">Right Drawer</OtButton>
              <OtButton @click="openDrawer('top')">Top Drawer</OtButton>
              <OtButton @click="openDrawer('bottom')">Bottom Drawer</OtButton>
            </div>
          </section>

          <OtDrawer
            :is-open="drawerOpen"
            :position="drawerPosition"
            :title="`${drawerPosition.charAt(0).toUpperCase() + drawerPosition.slice(1)} Drawer`"
            @close="drawerOpen = false"
          >
            <p style="color: var(--ot-gray-200)">
              This is the drawer content. It slides in smoothly from the selected edge.
            </p>

            <template #footer>
              <div style="display: flex; gap: 8px; justify-content: flex-end">
                <OtButton variant="secondary" @click="drawerOpen = false">Cancel</OtButton>
                <OtButton @click="drawerOpen = false">Confirm</OtButton>
              </div>
            </template>
          </OtDrawer>
        </div>

        <!-- OtPagination Preview -->
        <div v-if="selectedComponent === 'OtPagination'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Basic Pagination</h3>
            <div class="preview__row">
              <OtPagination v-model:currentPage="currentPage" :total-pages="10" />
            </div>
          </section>
        </div>

        <!-- OtBreadcrumb Preview -->
        <div v-if="selectedComponent === 'OtBreadcrumb'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Default</h3>
            <div class="preview__row">
              <OtBreadcrumb>
                <OtBreadcrumbItem to="#">Home</OtBreadcrumbItem>
                <OtBreadcrumbItem to="#">Components</OtBreadcrumbItem>
                <OtBreadcrumbItem active>Breadcrumb</OtBreadcrumbItem>
              </OtBreadcrumb>
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Custom Separator</h3>
            <div class="preview__row">
              <OtBreadcrumb>
                <OtBreadcrumbItem to="#">
                  Users
                  <template #separator>/</template>
                </OtBreadcrumbItem>
                <OtBreadcrumbItem to="#">
                  John Doe
                  <template #separator>/</template>
                </OtBreadcrumbItem>
                <OtBreadcrumbItem active>Settings</OtBreadcrumbItem>
              </OtBreadcrumb>
            </div>
          </section>
        </div>

        <!-- OtTextarea Preview -->
        <div v-if="selectedComponent === 'OtTextarea'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Basic Textarea</h3>
            <div class="preview__col" style="max-width: 400px">
              <OtTextarea
                v-model="textareaModel"
                placeholder="Write your message here..."
                :maxLength="200"
              />
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">States</h3>
            <div class="preview__col" style="max-width: 400px; gap: 16px">
              <OtTextarea placeholder="Error state" error />
              <OtTextarea placeholder="Disabled state" disabled />
            </div>
          </section>
        </div>

        <!-- OtSlider Preview -->
        <div v-if="selectedComponent === 'OtSlider'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Basic Slider</h3>
            <div class="preview__col" style="max-width: 400px">
              <OtSlider v-model="sliderModel" show-value />
              <p style="margin-top: 16px; color: var(--ot-gray-200)">
                Current Value: {{ sliderModel }}
              </p>
            </div>
          </section>
        </div>

        <!-- OtRadio Preview -->
        <div v-if="selectedComponent === 'OtRadio'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Radio Group</h3>
            <div class="preview__row">
              <OtRadio v-model="radioModel" value="opt1" label="Option 1" />
              <OtRadio v-model="radioModel" value="opt2" label="Option 2" />
              <OtRadio v-model="radioModel" value="opt3" label="Disabled Option" disabled />
            </div>
            <p style="margin-top: 16px; color: var(--ot-gray-200)">Selected: {{ radioModel }}</p>
          </section>
        </div>

        <!-- OtEmptyState Preview -->
        <div v-if="selectedComponent === 'OtEmptyState'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Default State</h3>
            <div class="preview__col">
              <OtEmptyState
                title="No projects found"
                description="Get started by creating a new project. Projects help you organize your tasks and collaborate with your team."
              >
                <template #action>
                  <OtButton variant="primary">Create Project</OtButton>
                </template>
              </OtEmptyState>
            </div>
          </section>
        </div>

        <!-- OtDivider Preview -->
        <div v-if="selectedComponent === 'OtDivider'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Horizontal</h3>
            <p>Content above</p>
            <OtDivider />
            <p>Content below</p>
            <br />
            <p>Dashed</p>
            <OtDivider dashed />
          </section>
          <section class="preview__section">
            <h3 class="preview__subtitle">Vertical</h3>
            <div style="display: flex; align-items: center; height: 50px">
              <span>Left</span>
              <OtDivider vertical />
              <span>Right</span>
              <OtDivider vertical dashed />
              <span>Far Right</span>
            </div>
          </section>
        </div>

        <!-- OtKbd Preview -->
        <div v-if="selectedComponent === 'OtKbd'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Keyboard Shortcuts</h3>
            <p>Press <OtKbd>Ctrl</OtKbd> + <OtKbd>K</OtKbd> to open search.</p>
          </section>
        </div>

        <!-- OtRating Preview -->
        <div v-if="selectedComponent === 'OtRating'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Interactive</h3>
            <OtRating :modelValue="3" />
          </section>
          <section class="preview__section">
            <h3 class="preview__subtitle">Readonly</h3>
            <OtRating :modelValue="4" readonly />
          </section>
        </div>

        <!-- OtStatistic Preview -->
        <div v-if="selectedComponent === 'OtStatistic'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Statistics</h3>
            <div class="preview__row">
              <OtStatistic title="Active Users" value="124,592" />
              <OtStatistic title="Revenue" value="84,200" prefix="$" />
              <OtStatistic title="Growth" value="12.5" suffix="%" />
            </div>
          </section>
        </div>

        <!-- OtFileInput Preview -->
        <div v-if="selectedComponent === 'OtFileInput'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">File Upload</h3>
            <OtFileInput multiple accept="image/*" />
          </section>
        </div>

        <!-- OtList Preview -->
        <div v-if="selectedComponent === 'OtList'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Basic List</h3>
            <OtList style="max-width: 400px">
              <OtListItem>
                <OtAvatar name="Alice" />
                Alice Freeman
              </OtListItem>
              <OtListItem>
                <OtAvatar name="Bob" />
                Bob Smith
              </OtListItem>
              <OtListItem>
                <OtAvatar name="Charlie" />
                Charlie Davis
              </OtListItem>
            </OtList>
          </section>
        </div>

        <!-- OtTimeline Preview -->
        <div v-if="selectedComponent === 'OtTimeline'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Activity Timeline</h3>
            <OtTimeline>
              <OtTimelineItem title="Account Created" time="2 hours ago" active>
                User signed up using Google Auth.
              </OtTimelineItem>
              <OtTimelineItem title="Profile Updated" time="1 hour ago">
                Changed avatar and bio.
              </OtTimelineItem>
              <OtTimelineItem title="First Post" time="10 mins ago">
                Published "Hello World".
              </OtTimelineItem>
            </OtTimeline>
          </section>
        </div>

        <!-- OtColorPicker Preview -->
        <div v-if="selectedComponent === 'OtColorPicker'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Color Selection</h3>
            <div class="preview__row">
              <OtColorPicker modelValue="#3b82f6" />
              <OtColorPicker modelValue="#10b981" disabled />
            </div>
          </section>
        </div>

        <!-- OtOtpInput Preview -->
        <div v-if="selectedComponent === 'OtOtpInput'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Interactive Demo</h3>
            <div class="preview__col">
              <OtOtpInput
                v-model="otpModel"
                @complete="(code) => console.log('OTP code complete:', code)"
              />
              <div style="font-size: 14px; color: var(--ot-gray-100)">
                Current Value:
                <strong style="color: var(--ot-primary)">{{ otpModel || 'empty' }}</strong>
              </div>
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Disabled State</h3>
            <div class="preview__col">
              <OtOtpInput model-value="123456" disabled />
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Custom Length (4 digits) & Text Mode</h3>
            <div class="preview__col">
              <OtOtpInput type="text" :length="4" placeholder="-" />
            </div>
          </section>
        </div>

        <!-- OtCopyButton Preview -->
        <div v-if="selectedComponent === 'OtCopyButton'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Variants</h3>
            <div class="preview__row">
              <OtCopyButton
                text="npm install @otakuturks/ui"
                label="Copy Command"
                copied-label="Copied!"
              />
              <OtCopyButton text="Secondary Value" variant="secondary" />
              <OtCopyButton text="Primary Action" variant="primary" label="Click to Copy" />
              <OtCopyButton text="Success Variant" variant="success" label="Secure Link" />
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Sizes</h3>
            <div class="preview__row">
              <OtCopyButton text="Small Code" size="sm" label="Small" />
              <OtCopyButton text="Medium Code" size="md" label="Medium" />
              <OtCopyButton text="Large Code" size="lg" label="Large" />
            </div>
          </section>
        </div>

        <!-- OtAvatarGroup Preview -->
        <div v-if="selectedComponent === 'OtAvatarGroup'" class="preview">
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
                <p style="margin-bottom: 8px; color: var(--ot-gray-100)">
                  Small Spacing & Small Size
                </p>
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

        <!-- OtResult Preview -->
        <div v-if="selectedComponent === 'OtResult'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Result States</h3>
            <div class="preview__row" style="justify-content: space-around; gap: 32px">
              <OtResult
                status="success"
                title="Payment Successful"
                sub-title="Your Premium Otaku subscription has been activated."
              />
              <OtResult
                status="warning"
                title="Auth Token Expiring"
                sub-title="Please re-verify your email address."
              />
              <OtResult
                status="error"
                title="Submission Failed"
                sub-title="Please check your form inputs and try again."
              />
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Errors & Glitches</h3>
            <div class="preview__row" style="justify-content: space-around; gap: 32px">
              <OtResult
                status="404"
                title="Not Found"
                sub-title="The page you are looking for has vanished into thin air."
              />
              <OtResult
                status="500"
                title="Server Melt Down"
                sub-title="Internal server error. Our gnomes are on it."
              />
            </div>
          </section>
        </div>

        <!-- OtGlassCard Preview -->
        <div v-if="selectedComponent === 'OtGlassCard'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Glassmorphism Visuals</h3>
            <div class="preview__row" style="gap: 32px">
              <OtGlassCard style="width: 320px" glow-color="#377dff">
                <h4 style="margin-bottom: 8px">Zoro Roronoa</h4>
                <p style="font-size: 14px; opacity: 0.8; margin-bottom: 16px">
                  The legendary swordsman who fights with three swords.
                </p>
                <div style="display: flex; justify-content: space-between; align-items: center">
                  <span style="font-size: 12px; font-weight: bold; color: var(--ot-success)"
                    >Lvl. 99</span
                  >
                  <span style="font-size: 12px; opacity: 0.6">Power: 9200</span>
                </div>
              </OtGlassCard>

              <OtGlassCard style="width: 320px" glow-color="#ff715b">
                <h4 style="margin-bottom: 8px">Monkey D. Luffy</h4>
                <p style="font-size: 14px; opacity: 0.8; margin-bottom: 16px">
                  The pirate captain who aims to find the One Piece.
                </p>
                <div style="display: flex; justify-content: space-between; align-items: center">
                  <span style="font-size: 12px; font-weight: bold; color: var(--ot-danger)"
                    >Lvl. 100</span
                  >
                  <span style="font-size: 12px; opacity: 0.6">Power: 9999</span>
                </div>
              </OtGlassCard>
            </div>
          </section>
        </div>

        <!-- OtTerminal Preview -->
        <div v-if="selectedComponent === 'OtTerminal'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Interactive Bash Simulator</h3>
            <div class="preview__col">
              <OtTerminal
                title="zoro@otakuturks ~ dev"
                copy-text="git commit -m 'feat: add terminal component'"
                height="320px"
              >
                <p>
                  <span class="prompt">zoro@otakuturks ~</span>
                  <span class="command">git status</span>
                </p>
                <p class="comment"># On branch main</p>
                <p class="comment"># Your branch is up to date with 'origin/main'.</p>
                <p class="comment"># Untracked files:</p>
                <p class="comment">
                  # (use "git add &lt;file&gt;..." to include in what will be committed)
                </p>
                <p class="error"># src/components/OtTerminal.vue</p>
                <br />
                <p>
                  <span class="prompt">zoro@otakuturks ~</span>
                  <span class="command"
                    >git add . && git commit -m 'feat: add terminal component'</span
                  >
                </p>
                <p class="success">[main bd532f1] feat: add terminal component</p>
                <p class="success">1 file changed, 114 insertions(+)</p>
                <p class="success">create mode 100644 src/components/OtTerminal.vue</p>
              </OtTerminal>
            </div>
          </section>
        </div>

        <!-- OtMarquee Preview -->
        <div v-if="selectedComponent === 'OtMarquee'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Horizontal Infinite Loop Slider</h3>
            <div class="preview__col" style="gap: 24px">
              <div>
                <p style="margin-bottom: 8px; color: var(--ot-gray-100)">
                  Default (Left, Speed 20s, Pause on Hover)
                </p>
                <OtMarquee :speed="15">
                  <span
                    style="
                      font-size: 18px;
                      font-weight: bold;
                      color: var(--ot-primary);
                      padding: 0 20px;
                    "
                    >🔥 One Piece</span
                  >
                  <span
                    style="
                      font-size: 18px;
                      font-weight: bold;
                      color: var(--ot-success);
                      padding: 0 20px;
                    "
                    >⚡ Naruto</span
                  >
                  <span
                    style="
                      font-size: 18px;
                      font-weight: bold;
                      color: var(--ot-danger);
                      padding: 0 20px;
                    "
                    >👑 Attack on Titan</span
                  >
                  <span
                    style="
                      font-size: 18px;
                      font-weight: bold;
                      color: var(--ot-warning);
                      padding: 0 20px;
                    "
                    >⚔️ Bleach</span
                  >
                  <span
                    style="
                      font-size: 18px;
                      font-weight: bold;
                      color: var(--ot-primary);
                      padding: 0 20px;
                    "
                    >🌌 Demon Slayer</span
                  >
                </OtMarquee>
              </div>

              <div>
                <p style="margin-bottom: 8px; color: var(--ot-gray-100)">
                  Reverse Direction (Right, Speed 10s)
                </p>
                <OtMarquee direction="right" :speed="10">
                  <span
                    style="
                      font-size: 18px;
                      font-weight: bold;
                      color: var(--ot-danger);
                      padding: 0 20px;
                    "
                    >🔥 Jujutsu Kaisen</span
                  >
                  <span
                    style="
                      font-size: 18px;
                      font-weight: bold;
                      color: var(--ot-warning);
                      padding: 0 20px;
                    "
                    >⚡ Hunter x Hunter</span
                  >
                  <span
                    style="
                      font-size: 18px;
                      font-weight: bold;
                      color: var(--ot-success);
                      padding: 0 20px;
                    "
                    >👑 Death Note</span
                  >
                  <span
                    style="
                      font-size: 18px;
                      font-weight: bold;
                      color: var(--ot-primary);
                      padding: 0 20px;
                    "
                    >⚔️ Chainsaw Man</span
                  >
                </OtMarquee>
              </div>
            </div>
          </section>
        </div>

        <!-- OtTagInput Preview -->
        <div v-if="selectedComponent === 'OtTagInput'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Interactive Tag Staging</h3>
            <div class="preview__col">
              <OtTagInput v-model="tagInputModel" placeholder="Type tag and press Enter..." />
              <div style="font-size: 14px; color: var(--ot-gray-100); margin-top: 8px">
                Staged Tags: <strong style="color: var(--ot-primary)">{{ tagInputModel }}</strong>
              </div>
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Disabled Tag Input</h3>
            <div class="preview__col">
              <OtTagInput :model-value="['readonly', 'locked']" disabled />
            </div>
          </section>
        </div>

        <!-- OtBackToTop Preview -->
        <div v-if="selectedComponent === 'OtBackToTop'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Scroll Progress Indicator</h3>
            <div
              class="preview__col"
              style="align-items: center; justify-content: center; min-height: 200px"
            >
              <p
                style="
                  color: var(--ot-gray-100);
                  max-width: 420px;
                  text-align: center;
                  margin-bottom: 24px;
                "
              >
                Scroll down this page to see the floating back-to-top button appear in the
                bottom-right corner! It contains a circular progress ring synced with your scroll
                position.
              </p>
              <!-- Static mock presentation of the button -->
              <div
                style="
                  position: relative;
                  width: 64px;
                  height: 64px;
                  border-radius: 50%;
                  background: var(--ot-bg-secondary);
                  border: 1px solid var(--ot-gray-300);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-shadow: var(--ot-shadow-lg);
                "
              >
                <svg
                  style="
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    transform: rotate(-90deg);
                  "
                  viewBox="0 0 48 48"
                >
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="rgba(255, 255, 255, 0.08)"
                    stroke-width="3.5"
                    fill="none"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="var(--ot-primary)"
                    stroke-width="3.5"
                    fill="none"
                    stroke-linecap="round"
                    stroke-dasharray="125.66"
                    stroke-dashoffset="37.7"
                  />
                </svg>
                <span style="color: var(--ot-white); font-weight: bold; font-size: 12px">70%</span>
              </div>
            </div>
            <!-- Main active trigger instance -->
            <OtBackToTop :visibility-height="100" />
          </section>
        </div>

        <!-- OtAuthCard Preview -->
        <div v-if="selectedComponent === 'OtAuthCard'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Login Form</h3>
            <div class="preview__row" style="justify-content: center">
              <OtAuthCard title="Welcome Back" sub-title="Sign in to your OtakuTurks account">
                <template #social>
                  <OtSocialButton provider="google" />
                  <OtSocialButton provider="discord" />
                  <OtSocialButton provider="github" />
                </template>

                <OtInput type="email" placeholder="Email address" full-width />
                <OtInput type="password" placeholder="Password" full-width />
                <OtButton variant="primary" full-width>Sign In</OtButton>

                <template #footer> Don't have an account? <a href="#">Sign Up</a> </template>
              </OtAuthCard>
            </div>
          </section>
        </div>

        <!-- OtSocialButton Preview -->
        <div v-if="selectedComponent === 'OtSocialButton'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">All Providers</h3>
            <div class="preview__col" style="max-width: 360px; margin: 0 auto; gap: 8px">
              <OtSocialButton provider="google" />
              <OtSocialButton provider="discord" />
              <OtSocialButton provider="github" />
              <OtSocialButton provider="twitter" />
              <OtSocialButton provider="apple" />
              <OtSocialButton provider="facebook" />
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">States</h3>
            <div class="preview__col" style="max-width: 360px; margin: 0 auto; gap: 8px">
              <OtSocialButton provider="google" loading />
              <OtSocialButton provider="discord" disabled />
            </div>
          </section>
        </div>

        <!-- OtPasswordStrength Preview -->
        <div v-if="selectedComponent === 'OtPasswordStrength'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Interactive Demo</h3>
            <div class="preview__col" style="max-width: 400px; margin: 0 auto">
              <OtInput
                v-model="authPasswordModel"
                type="password"
                placeholder="Type a password..."
                full-width
              />
              <OtPasswordStrength :password="authPasswordModel" />
            </div>
          </section>
        </div>

        <!-- OtAnimeCard Preview -->
        <div v-if="selectedComponent === 'OtAnimeCard'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Anime Grid</h3>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px">
              <OtAnimeCard v-for="(anime, i) in animeCardData" :key="i" v-bind="anime" />
            </div>
          </section>
        </div>

        <!-- OtEpisodeCard Preview -->
        <div v-if="selectedComponent === 'OtEpisodeCard'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Episode Listing</h3>
            <div class="preview__col" style="gap: 8px">
              <OtEpisodeCard v-for="(ep, i) in episodeData" :key="i" v-bind="ep" />
            </div>
          </section>
        </div>

        <!-- OtScoreDisplay Preview -->
        <div v-if="selectedComponent === 'OtScoreDisplay'" class="preview">
          <section class="preview__section">
            <h3 class="preview__subtitle">Score Tiers</h3>
            <div class="preview__row" style="gap: 32px; justify-content: center">
              <OtScoreDisplay :score="9.2" />
              <OtScoreDisplay :score="7.8" />
              <OtScoreDisplay :score="5.5" />
              <OtScoreDisplay :score="3.2" />
            </div>
          </section>

          <section class="preview__section">
            <h3 class="preview__subtitle">Custom Sizes</h3>
            <div
              class="preview__row"
              style="gap: 32px; justify-content: center; align-items: flex-end"
            >
              <OtScoreDisplay :score="8.5" :size="60" :stroke-width="4" />
              <OtScoreDisplay :score="8.5" :size="100" :stroke-width="8" />
              <OtScoreDisplay :score="8.5" :size="120" :stroke-width="10" />
            </div>
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

.sidebar__brand {
  font-size: var(--ot-font-lg);
  font-weight: 700;
  color: var(--ot-white);
  margin: 0 0 var(--ot-spacing-md) 0;
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-sm);
}

.sidebar__brand-icon {
  color: var(--ot-primary);
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

/* Preview */
.preview {
  max-width: 1200px;
}

.preview__section {
  margin-bottom: var(--ot-spacing-2xl);
}

.preview__subtitle {
  font-size: var(--ot-font-lg);
  font-weight: 600;
  color: var(--ot-gray-200);
  margin: 0 0 var(--ot-spacing-md) 0;
}

.preview__row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ot-spacing-md);
  align-items: center;
}

.preview__col {
  display: flex;
  flex-direction: column;
  gap: var(--ot-spacing-md);
  max-width: 400px;
}

/* Grid Item Demo */
.grid-item {
  background-color: var(--ot-gray-400);
  padding: var(--ot-spacing-lg);
  border-radius: var(--ot-radius-base);
  text-align: center;
  color: var(--ot-gray-200);
  font-weight: 600;
}
</style>
