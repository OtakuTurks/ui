<script setup>
import { computed } from 'vue'

const props = defineProps({
  cols: {
    type: [Number, Object],
    default: 12
    // Object: { xs: 1, sm: 2, md: 3, lg: 4 }
  },
  gap: {
    type: [Number, String],
    default: 16
  },
  alignItems: {
    type: String,
    default: 'stretch'
  },
  justifyItems: {
    type: String,
    default: 'stretch'
  }
})

const gridStyle = computed(() => {
  const style = {
    display: 'grid',
    alignItems: props.alignItems,
    justifyItems: props.justifyItems
  }

  // Gap
  if (typeof props.gap === 'number') {
    style.gap = `${props.gap}px`
  } else {
    style.gap = props.gap
  }

  // Columns
  if (typeof props.cols === 'number') {
    style.gridTemplateColumns = `repeat(${props.cols}, minmax(0, 1fr))`
  } else if (typeof props.cols === 'object') {
    // For responsive, we'll use CSS custom properties
    style.gridTemplateColumns = `repeat(${props.cols.xs || 1}, minmax(0, 1fr))`
  }

  return style
})

// Generate responsive classes if cols is object
const responsiveClasses = computed(() => {
  if (typeof props.cols !== 'object') return []
  
  return Object.keys(props.cols).map(breakpoint => `ot-grid--${breakpoint}-${props.cols[breakpoint]}`)
})
</script>

<template>
  <div
    class="ot-grid"
    :class="responsiveClasses"
    :style="gridStyle"
  >
    <slot />
  </div>
</template>

<style scoped>
.ot-grid {
  width: 100%;
}

/* Responsive Breakpoints */
@media (min-width: 600px) {
  .ot-grid--sm-1 { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
  .ot-grid--sm-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
  .ot-grid--sm-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
  .ot-grid--sm-4 { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
  .ot-grid--sm-5 { grid-template-columns: repeat(5, minmax(0, 1fr)) !important; }
  .ot-grid--sm-6 { grid-template-columns: repeat(6, minmax(0, 1fr)) !important; }
}

@media (min-width: 960px) {
  .ot-grid--md-1 { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
  .ot-grid--md-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
  .ot-grid--md-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
  .ot-grid--md-4 { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
  .ot-grid--md-5 { grid-template-columns: repeat(5, minmax(0, 1fr)) !important; }
  .ot-grid--md-6 { grid-template-columns: repeat(6, minmax(0, 1fr)) !important; }
  .ot-grid--md-7 { grid-template-columns: repeat(7, minmax(0, 1fr)) !important; }
  .ot-grid--md-8 { grid-template-columns: repeat(8, minmax(0, 1fr)) !important; }
  .ot-grid--md-9 { grid-template-columns: repeat(9, minmax(0, 1fr)) !important; }
  .ot-grid--md-10 { grid-template-columns: repeat(10, minmax(0, 1fr)) !important; }
  .ot-grid--md-11 { grid-template-columns: repeat(11, minmax(0, 1fr)) !important; }
  .ot-grid--md-12 { grid-template-columns: repeat(12, minmax(0, 1fr)) !important; }
}

@media (min-width: 1280px) {
  .ot-grid--lg-1 { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
  .ot-grid--lg-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
  .ot-grid--lg-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
  .ot-grid--lg-4 { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
  .ot-grid--lg-5 { grid-template-columns: repeat(5, minmax(0, 1fr)) !important; }
  .ot-grid--lg-6 { grid-template-columns: repeat(6, minmax(0, 1fr)) !important; }
  .ot-grid--lg-7 { grid-template-columns: repeat(7, minmax(0, 1fr)) !important; }
  .ot-grid--lg-8 { grid-template-columns: repeat(8, minmax(0, 1fr)) !important; }
  .ot-grid--lg-9 { grid-template-columns: repeat(9, minmax(0, 1fr)) !important; }
  .ot-grid--lg-10 { grid-template-columns: repeat(10, minmax(0, 1fr)) !important; }
  .ot-grid--lg-11 { grid-template-columns: repeat(11, minmax(0, 1fr)) !important; }
  .ot-grid--lg-12 { grid-template-columns: repeat(12, minmax(0, 1fr)) !important; }
}
</style>
