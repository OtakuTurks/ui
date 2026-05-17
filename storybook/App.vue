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
import OtToast from '../src/components/OtToast.vue'
import OtAccordion from '../src/components/OtAccordion.vue'
import OtAccordionItem from '../src/components/OtAccordionItem.vue'

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
  { name: 'OtToast', category: 'Feedback', icon: null }
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

const toastVisible = ref(false)
const toastProps = ref({
  variant: 'info',
  title: 'Notification',
  message: 'This is a toast message!'
})

const showToast = (variant = 'info') => {
  toastProps.value = {
    variant,
    title: variant.charAt(0).toUpperCase() + variant.slice(1),
    message: `This is a ${variant} toast message!`
  }
  toastVisible.value = true
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
            <h3 class="preview__subtitle">Variants</h3>
            <div class="preview__row">
              <OtButton variant="primary" @click="showToast('info')">Info Toast</OtButton>
              <OtButton variant="success" @click="showToast('success')">Success Toast</OtButton>
              <OtButton variant="warning" @click="showToast('warning')">Warning Toast</OtButton>
              <OtButton variant="danger" @click="showToast('danger')">Danger Toast</OtButton>
            </div>
          </section>

          <!-- Shared Toast Component for the page -->
          <OtToast
            v-model:visible="toastVisible"
            :variant="toastProps.variant"
            :title="toastProps.title"
            :message="toastProps.message"
            :duration="3000"
          />
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
      </div>
    </main>

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
