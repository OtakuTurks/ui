<script setup>
import { computed } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    default: () => []
    // [{ key: String, label: String, width?: String, align?: 'left'|'center'|'right' }]
  },
  data: {
    type: Array,
    default: () => []
  },
  striped: {
    type: Boolean,
    default: false
  },
  hoverable: {
    type: Boolean,
    default: true
  },
  bordered: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
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

const emit = defineEmits(['row-click'])

const handleRowClick = (row, index) => {
  emit('row-click', { row, index })
}

const getColumnStyle = (column) => {
  const style = {}
  if (column.width) style.width = column.width
  if (column.align) style.textAlign = column.align
  return style
}
</script>

<template>
  <div class="ot-table-wrapper">
    <table
      class="ot-table"
      :class="[
        `ot-table--${size}`,
        {
          'ot-table--striped': striped,
          'ot-table--hoverable': hoverable,
          'ot-table--bordered': bordered,
          'ot-table--loading': loading
        }
      ]"
    >
      <thead class="ot-table__head">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="ot-table__th"
            :style="getColumnStyle(column)"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody class="ot-table__body">
        <template v-if="!loading && data.length">
          <tr
            v-for="(row, index) in data"
            :key="index"
            class="ot-table__tr"
            @click="handleRowClick(row, index)"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="ot-table__td"
              :style="getColumnStyle(column)"
            >
              <slot :name="column.key" :row="row" :index="index">
                {{ row[column.key] }}
              </slot>
            </td>
          </tr>
        </template>
        <tr v-else-if="loading">
          <td :colspan="columns.length" class="ot-table__empty">
            <div class="ot-table__loading">
              <svg class="ot-table__spinner" width="24" height="24" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-dasharray="31.4"
                  stroke-dashoffset="10"
                />
              </svg>
              <span>Loading...</span>
            </div>
          </td>
        </tr>
        <tr v-else>
          <td :colspan="columns.length" class="ot-table__empty">
            {{ emptyText }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.ot-table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.ot-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--ot-font-family);
}

.ot-table__head {
  background-color: var(--ot-gray-500);
}

.ot-table__th {
  font-weight: 600;
  color: var(--ot-gray-100);
  text-align: left;
  border-bottom: 1px solid var(--ot-gray-300);
}

.ot-table__td {
  color: var(--ot-gray-200);
  border-bottom: 1px solid var(--ot-gray-300);
}

.ot-table__tr:last-child .ot-table__td {
  border-bottom: none;
}

/* Sizes */
.ot-table--sm .ot-table__th,
.ot-table--sm .ot-table__td {
  padding: 8px 12px;
  font-size: var(--ot-font-sm);
}

.ot-table--md .ot-table__th,
.ot-table--md .ot-table__td {
  padding: 12px 16px;
  font-size: var(--ot-font-sm);
}

.ot-table--lg .ot-table__th,
.ot-table--lg .ot-table__td {
  padding: 16px 20px;
  font-size: var(--ot-font-base);
}

/* Striped */
.ot-table--striped .ot-table__tr:nth-child(even) {
  background-color: var(--ot-gray-500);
}

/* Hoverable */
.ot-table--hoverable .ot-table__tr {
  cursor: pointer;
  transition: background-color var(--ot-transition-fast);
}

.ot-table--hoverable .ot-table__tr:hover {
  background-color: var(--ot-gray-300);
}

/* Bordered */
.ot-table--bordered .ot-table__th,
.ot-table--bordered .ot-table__td {
  border: 1px solid var(--ot-gray-300);
}

/* Empty */
.ot-table__empty {
  text-align: center;
  padding: var(--ot-spacing-xl);
  color: var(--ot-gray-100);
}

.ot-table__loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--ot-spacing-sm);
}

.ot-table__spinner {
  color: var(--ot-primary);
  animation: ot-table-spin 1s linear infinite;
}

@keyframes ot-table-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
