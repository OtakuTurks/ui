<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: 'Search components...'
  },
  items: {
    type: Array,
    default: () => []
    // [{ name: String, category: String, icon?: Component }]
  }
})

const emit = defineEmits(['close', 'select'])

const searchQuery = ref('')
const selectedIndex = ref(0)
const searchInputRef = ref(null)

const filteredItems = computed(() => {
  if (!searchQuery.value) return props.items

  const query = searchQuery.value.toLowerCase()
  return props.items.filter(
    (item) => item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
  )
})

const groupedItems = computed(() => {
  const groups = {}
  filteredItems.value.forEach((item) => {
    if (!groups[item.category]) {
      groups[item.category] = []
    }
    groups[item.category].push(item)
  })
  return groups
})

const flatItems = computed(() => {
  return Object.values(groupedItems.value).flat()
})

const handleKeydown = (event) => {
  if (!props.isOpen) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      if (selectedIndex.value < flatItems.value.length - 1) {
        selectedIndex.value++
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (selectedIndex.value > 0) {
        selectedIndex.value--
      }
      break
    case 'Enter':
      event.preventDefault()
      if (flatItems.value[selectedIndex.value]) {
        selectItem(flatItems.value[selectedIndex.value])
      }
      break
    case 'Escape':
      event.preventDefault()
      close()
      break
  }
}

const selectItem = (item) => {
  emit('select', item)
  close()
}

const close = () => {
  emit('close')
}

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      searchQuery.value = ''
      selectedIndex.value = 0
      setTimeout(() => {
        searchInputRef.value?.focus()
      }, 100)
    }
  }
)

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="ot-search-modal">
      <div v-if="isOpen" class="ot-search-modal-overlay" @click.self="close">
        <div class="ot-search-modal">
          <div class="ot-search-modal__header">
            <svg
              class="ot-search-modal__icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              />
            </svg>
            <input
              ref="searchInputRef"
              v-model="searchQuery"
              type="text"
              class="ot-search-modal__input"
              :placeholder="placeholder"
            />
            <kbd class="ot-search-modal__kbd">ESC</kbd>
          </div>

          <div class="ot-search-modal__content">
            <div v-if="flatItems.length === 0" class="ot-search-modal__empty">
              <p>No results found for "{{ searchQuery }}"</p>
            </div>

            <div v-else>
              <div
                v-for="(items, category) in groupedItems"
                :key="category"
                class="ot-search-modal__group"
              >
                <div class="ot-search-modal__category">{{ category }}</div>
                <div
                  v-for="(item, index) in items"
                  :key="item.name"
                  class="ot-search-modal__item"
                  :class="{
                    'ot-search-modal__item--selected': flatItems.indexOf(item) === selectedIndex
                  }"
                  @click="selectItem(item)"
                  @mouseenter="selectedIndex = flatItems.indexOf(item)"
                >
                  <component v-if="item.icon" :is="item.icon" class="ot-search-modal__item-icon" />
                  <span class="ot-search-modal__item-name">{{ item.name }}</span>
                  <kbd class="ot-search-modal__item-kbd">Enter</kbd>
                </div>
              </div>
            </div>
          </div>

          <div class="ot-search-modal__footer">
            <div class="ot-search-modal__hint"><kbd>↑↓</kbd> Navigate</div>
            <div class="ot-search-modal__hint"><kbd>Enter</kbd> Select</div>
            <div class="ot-search-modal__hint"><kbd>ESC</kbd> Close</div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ot-search-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  padding-top: 100px;
  z-index: var(--ot-z-modal-backdrop);
}

.ot-search-modal {
  width: 100%;
  max-width: 560px;
  background-color: var(--ot-gray-400);
  border-radius: var(--ot-radius-lg);
  box-shadow: var(--ot-shadow-lg);
  overflow: hidden;
  height: fit-content;
  max-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  z-index: var(--ot-z-modal);
}

/* Header */
.ot-search-modal__header {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-md);
  padding: var(--ot-spacing-md) var(--ot-spacing-lg);
  border-bottom: 1px solid var(--ot-gray-300);
}

.ot-search-modal__icon {
  color: var(--ot-gray-100);
  flex-shrink: 0;
}

.ot-search-modal__input {
  flex: 1;
  border: none;
  background: transparent;
  color: var(--ot-gray-200);
  font-size: var(--ot-font-base);
  font-family: var(--ot-font-family);
  outline: none;
}

.ot-search-modal__input::placeholder {
  color: var(--ot-gray-100);
}

.ot-search-modal__kbd {
  padding: 2px 8px;
  background-color: var(--ot-gray-300);
  border-radius: var(--ot-radius-sm);
  font-size: var(--ot-font-xs);
  color: var(--ot-gray-200);
  font-family: monospace;
}

/* Content */
.ot-search-modal__content {
  flex: 1;
  overflow-y: auto;
  padding: var(--ot-spacing-sm) 0;
}

.ot-search-modal__empty {
  padding: var(--ot-spacing-xl);
  text-align: center;
  color: var(--ot-gray-100);
}

/* Group */
.ot-search-modal__group {
  margin-bottom: var(--ot-spacing-sm);
}

.ot-search-modal__category {
  padding: var(--ot-spacing-xs) var(--ot-spacing-lg);
  font-size: var(--ot-font-xs);
  font-weight: 600;
  color: var(--ot-gray-100);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Item */
.ot-search-modal__item {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-md);
  padding: var(--ot-spacing-sm) var(--ot-spacing-lg);
  cursor: pointer;
  transition: background-color var(--ot-transition-fast);
}

.ot-search-modal__item:hover,
.ot-search-modal__item--selected {
  background-color: var(--ot-gray-300);
}

.ot-search-modal__item--selected {
  border-left: 3px solid var(--ot-primary);
  padding-left: calc(var(--ot-spacing-lg) - 3px);
}

.ot-search-modal__item-icon {
  width: 20px;
  height: 20px;
  color: var(--ot-primary);
}

.ot-search-modal__item-name {
  flex: 1;
  color: var(--ot-gray-200);
}

.ot-search-modal__item-kbd {
  opacity: 0;
  font-size: var(--ot-font-xs);
  color: var(--ot-gray-100);
}

.ot-search-modal__item--selected .ot-search-modal__item-kbd {
  opacity: 1;
}

/* Footer */
.ot-search-modal__footer {
  display: flex;
  gap: var(--ot-spacing-lg);
  padding: var(--ot-spacing-sm) var(--ot-spacing-lg);
  border-top: 1px solid var(--ot-gray-300);
  background-color: var(--ot-gray-500);
}

.ot-search-modal__hint {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-xs);
  font-size: var(--ot-font-xs);
  color: var(--ot-gray-100);
}

.ot-search-modal__hint kbd {
  padding: 2px 6px;
  background-color: var(--ot-gray-400);
  border-radius: var(--ot-radius-sm);
  font-size: var(--ot-font-xs);
}

/* Transitions */
.ot-search-modal-enter-active,
.ot-search-modal-leave-active {
  transition: opacity var(--ot-transition-base);
}

.ot-search-modal-enter-from,
.ot-search-modal-leave-to {
  opacity: 0;
}

.ot-search-modal-enter-active .ot-search-modal,
.ot-search-modal-leave-active .ot-search-modal {
  transition:
    transform var(--ot-transition-base),
    opacity var(--ot-transition-base);
}

.ot-search-modal-enter-from .ot-search-modal,
.ot-search-modal-leave-to .ot-search-modal {
  transform: scale(0.95) translateY(-20px);
  opacity: 0;
}
</style>
