<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  nodes: {
    type: Array,
    default: () => []
    // [{ id, label, children?: [], expanded?: Boolean, selected?: Boolean, disabled?: Boolean }]
  },
  selectable: {
    type: Boolean,
    default: false
  },
  expandable: {
    type: Boolean,
    default: true
  },
  defaultExpandAll: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select', 'expand', 'node-click'])

const expandedNodes = ref(new Set())

// Initialize expanded state
const initializeNodes = (nodes) => {
  nodes.forEach((node) => {
    if (props.defaultExpandAll || node.expanded) {
      expandedNodes.value.add(node.id)
    }
    if (node.children) {
      initializeNodes(node.children)
    }
  })
}

initializeNodes(props.nodes)

const hasChildren = (node) => node.children && node.children.length > 0

const isExpanded = (node) => expandedNodes.value.has(node.id)

const toggleExpand = (node) => {
  if (!props.expandable || node.disabled) return

  if (expandedNodes.value.has(node.id)) {
    expandedNodes.value.delete(node.id)
  } else {
    expandedNodes.value.add(node.id)
  }
  emit('expand', { node, expanded: expandedNodes.value.has(node.id) })
}

const handleNodeClick = (node) => {
  if (node.disabled) return
  emit('node-click', node)
  if (props.selectable) {
    emit('select', node)
  }
}
</script>

<template>
  <div class="ot-tree">
    <ul class="ot-tree__list">
      <li
        v-for="node in nodes"
        :key="node.id"
        class="ot-tree__node"
        :class="{
          'ot-tree__node--disabled': node.disabled,
          'ot-tree__node--selected': node.selected,
          'ot-tree__node--expandable': hasChildren(node)
        }"
      >
        <div class="ot-tree__content" @click="handleNodeClick(node)">
          <button
            v-if="hasChildren(node)"
            type="button"
            class="ot-tree__toggle"
            :class="{ 'ot-tree__toggle--expanded': isExpanded(node) }"
            @click.stop="toggleExpand(node)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
          <span v-else class="ot-tree__toggle-placeholder" />
          <span class="ot-tree__label">{{ node.label }}</span>
        </div>
        <Transition name="ot-tree">
          <ul
            v-if="hasChildren(node) && isExpanded(node)"
            class="ot-tree__list ot-tree__list--nested"
          >
            <li
              v-for="child in node.children"
              :key="child.id"
              class="ot-tree__node"
              :class="{
                'ot-tree__node--disabled': child.disabled,
                'ot-tree__node--selected': child.selected
              }"
            >
              <div class="ot-tree__content" @click="handleNodeClick(child)">
                <button
                  v-if="child.children && child.children.length"
                  type="button"
                  class="ot-tree__toggle"
                  :class="{ 'ot-tree__toggle--expanded': expandedNodes.has(child.id) }"
                  @click.stop="toggleExpand(child)"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                  </svg>
                </button>
                <span v-else class="ot-tree__toggle-placeholder" />
                <span class="ot-tree__label">{{ child.label }}</span>
              </div>
            </li>
          </ul>
        </Transition>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.ot-tree {
  font-family: var(--ot-font-family);
}

.ot-tree__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ot-tree__list--nested {
  padding-left: var(--ot-spacing-lg);
}

.ot-tree__node {
  user-select: none;
}

.ot-tree__node--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ot-tree__content {
  display: flex;
  align-items: center;
  padding: var(--ot-spacing-xs) var(--ot-spacing-sm);
  border-radius: var(--ot-radius-sm);
  cursor: pointer;
  transition: background-color var(--ot-transition-fast);
}

.ot-tree__content:hover {
  background-color: var(--ot-gray-300);
}

.ot-tree__node--selected .ot-tree__content {
  background-color: rgba(55, 125, 255, 0.15);
}

.ot-tree__node--selected .ot-tree__label {
  color: var(--ot-primary);
}

.ot-tree__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  color: var(--ot-gray-100);
  cursor: pointer;
  transition: transform var(--ot-transition-fast);
  flex-shrink: 0;
}

.ot-tree__toggle--expanded {
  transform: rotate(90deg);
}

.ot-tree__toggle-placeholder {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.ot-tree__label {
  font-size: var(--ot-font-sm);
  color: var(--ot-gray-200);
  white-space: nowrap;
}

/* Transition */
.ot-tree-enter-active,
.ot-tree-leave-active {
  transition: all var(--ot-transition-fast);
}

.ot-tree-enter-from,
.ot-tree-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
