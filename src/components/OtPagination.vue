<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  siblingCount: { type: Number, default: 1 }
})

const emit = defineEmits(['update:currentPage', 'page-change'])

const changePage = (page) => {
  if (page < 1 || page > props.totalPages || page === props.currentPage || page === '...') return
  emit('update:currentPage', page)
  emit('page-change', page)
}

const paginationRange = computed(() => {
  const totalPageNumbers = props.siblingCount + 5

  if (totalPageNumbers >= props.totalPages) {
    return Array.from({ length: props.totalPages }, (_, i) => i + 1)
  }

  const leftSiblingIndex = Math.max(props.currentPage - props.siblingCount, 1)
  const rightSiblingIndex = Math.min(props.currentPage + props.siblingCount, props.totalPages)

  const showLeftDots = leftSiblingIndex > 2
  const showRightDots = rightSiblingIndex < props.totalPages - 2

  const firstPageIndex = 1
  const lastPageIndex = props.totalPages

  if (!showLeftDots && showRightDots) {
    let leftItemCount = 3 + 2 * props.siblingCount
    let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
    return [...leftRange, '...', props.totalPages]
  }

  if (showLeftDots && !showRightDots) {
    let rightItemCount = 3 + 2 * props.siblingCount
    let rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => props.totalPages - rightItemCount + i + 1
    )
    return [firstPageIndex, '...', ...rightRange]
  }

  if (showLeftDots && showRightDots) {
    let middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    )
    return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex]
  }
})
</script>

<template>
  <nav class="ot-pagination" aria-label="Pagination">
    <button
      class="ot-pagination__item ot-pagination__nav"
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
      aria-label="Previous page"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>

    <template v-for="(page, index) in paginationRange" :key="index">
      <span v-if="page === '...'" class="ot-pagination__dots">...</span>
      <button
        v-else
        class="ot-pagination__item"
        :class="{ 'ot-pagination__item--active': page === currentPage }"
        @click="changePage(page)"
        :aria-current="page === currentPage ? 'page' : undefined"
      >
        {{ page }}
      </button>
    </template>

    <button
      class="ot-pagination__item ot-pagination__nav"
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
      aria-label="Next page"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  </nav>
</template>

<style scoped>
.ot-pagination {
  display: flex;
  align-items: center;
  gap: 4px;
}

.ot-pagination__item {
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  border-radius: var(--ot-radius-base, 8px);
  font-size: var(--ot-font-sm, 14px);
  font-weight: 500;
  color: var(--ot-gray-100, #f3f4f6);
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ot-pagination__item:hover:not(:disabled):not(.ot-pagination__item--active) {
  background-color: var(--ot-gray-300, #4b5563);
}

.ot-pagination__item--active {
  background-color: var(--ot-primary, #3b82f6);
  color: var(--ot-white, #ffffff);
}

.ot-pagination__item:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ot-pagination__nav {
  padding: 0 8px;
}

.ot-pagination__dots {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: var(--ot-gray-200, #9ca3af);
}
</style>
