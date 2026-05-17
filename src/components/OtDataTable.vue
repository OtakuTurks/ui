<script setup>
import { ref, computed, watch } from 'vue'
import OtTable from './OtTable.vue'
import OtPagination from './OtPagination.vue'

const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  data: {
    type: Array,
    default: () => []
  },
  pageSize: {
    type: Number,
    default: 10
  },
  sortable: {
    type: Boolean,
    default: true
  },
  paginate: {
    type: Boolean,
    default: true
  },
  striped: {
    type: Boolean,
    default: false
  },
  hoverable: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'md'
  },
  loading: {
    type: Boolean,
    default: false
  },
  emptyText: {
    type: String,
    default: 'No data available'
  }
})

const emit = defineEmits(['row-click', 'sort-change', 'page-change'])

const currentPage = ref(1)
const sortKey = ref('')
const sortOrder = ref('asc')

const sortedData = computed(() => {
  if (!props.sortable || !sortKey.value) return props.data

  return [...props.data].sort((a, b) => {
    const aVal = a[sortKey.value]
    const bVal = b[sortKey.value]

    if (aVal === bVal) return 0
    if (aVal === null || aVal === undefined) return 1
    if (bVal === null || bVal === undefined) return -1

    const comparison = aVal > bVal ? 1 : -1
    return sortOrder.value === 'asc' ? comparison : -comparison
  })
})

const totalItems = computed(() => sortedData.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / props.pageSize))

const paginatedData = computed(() => {
  if (!props.paginate) return sortedData.value

  const start = (currentPage.value - 1) * props.pageSize
  const end = start + props.pageSize
  return sortedData.value.slice(start, end)
})

const handleSort = (column) => {
  if (!props.sortable || !column.sortable) return

  if (sortKey.value === column.key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = column.key
    sortOrder.value = 'asc'
  }

  emit('sort-change', { key: sortKey.value, order: sortOrder.value })
}

const handlePageChange = (page) => {
  currentPage.value = page
  emit('page-change', page)
}

const getSortIcon = (column) => {
  if (sortKey.value !== column.key) return 'none'
  return sortOrder.value
}

// Reset to first page when data changes
watch(
  () => props.data,
  () => {
    currentPage.value = 1
  }
)
</script>

<template>
  <div class="ot-data-table">
    <div class="ot-data-table__header">
      <slot name="header" />
    </div>

    <OtTable
      :columns="columns"
      :data="paginatedData"
      :striped="striped"
      :hoverable="hoverable"
      :size="size"
      :loading="loading"
      :empty-text="emptyText"
      @row-click="emit('row-click', $event)"
    >
      <template v-for="column in columns" :key="column.key" #[column.key]="slotProps">
        <slot :name="column.key" v-bind="slotProps" />
      </template>
    </OtTable>

    <div v-if="paginate && totalItems > pageSize" class="ot-data-table__footer">
      <div class="ot-data-table__info">
        Showing {{ (currentPage - 1) * pageSize + 1 }}-{{
          Math.min(currentPage * pageSize, totalItems)
        }}
        of {{ totalItems }}
      </div>
      <OtPagination v-model="currentPage" :total-pages="totalPages" @change="handlePageChange" />
    </div>
  </div>
</template>

<style scoped>
.ot-data-table {
  width: 100%;
}

.ot-data-table__header {
  margin-bottom: var(--ot-spacing-md);
}

.ot-data-table__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--ot-spacing-md);
  padding-top: var(--ot-spacing-md);
  border-top: 1px solid var(--ot-gray-300);
}

.ot-data-table__info {
  font-size: var(--ot-font-sm);
  color: var(--ot-gray-100);
}
</style>
