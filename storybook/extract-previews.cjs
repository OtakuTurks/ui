/**
 * Storybook Preview Extraction Script v2
 * Self-contained preview components with proper state management
 */

const fs = require('fs')
const path = require('path')

const appVuePath = path.join(__dirname, 'App.vue')
const previewsDir = path.join(__dirname, 'previews')

const content = fs.readFileSync(appVuePath, 'utf-8')
const lines = content.split('\n')

// Find all preview blocks
const previews = []
let currentPreview = null

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  const startMatch = line.match(/v-if="selectedComponent === '(Ot\w+)'" class="preview"/)
  if (startMatch && !currentPreview) {
    currentPreview = { name: startMatch[1], lines: [line], depth: 0 }
    const opens = (line.match(/<div/g) || []).length
    const closes = (line.match(/<\/div>/g) || []).length
    currentPreview.depth = opens - closes
    continue
  }
  if (currentPreview) {
    currentPreview.lines.push(line)
    const opens = (line.match(/<div/g) || []).length
    const closes = (line.match(/<\/div>/g) || []).length
    currentPreview.depth += opens - closes
    if (currentPreview.depth <= 0) {
      previews.push(currentPreview)
      currentPreview = null
    }
  }
}

console.log(`Found ${previews.length} preview blocks`)

// State mappings: which components need which reactive state
const stateMap = {
  OtInput: `const inputModel = ref('')`,
  OtDropdown: `const dropdownOptions = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3', disabled: true },
  { label: 'Option 4', value: 'opt4' }
]
const dropdownModel = ref(null)`,
  OtModal: `const modalOpen = ref(false)`,
  OtCheckbox: `const checkboxModel = ref(false)`,
  OtSwitch: `const switchModel = ref(false)`,
  OtToast: `const toast = useToast()
const triggerToast = (variant = 'info') => {
  const title = variant.charAt(0).toUpperCase() + variant.slice(1)
  const message = \`This is a \${variant} toast message that stacks!\`
  if (variant === 'success') toast.success(message, { title })
  else if (variant === 'warning') toast.warning(message, { title })
  else if (variant === 'danger') toast.error(message, { title })
  else toast.info(message, { title })
}`,
  OtDrawer: `const drawerOpen = ref(false)
const drawerPosition = ref('right')
const openDrawer = (pos) => {
  drawerPosition.value = pos
  drawerOpen.value = true
}`,
  OtPagination: `const currentPage = ref(1)`,
  OtTextarea: `const textareaModel = ref('')`,
  OtSlider: `const sliderModel = ref(50)`,
  OtRadio: `const radioModel = ref('opt1')`,
  OtProgress: `const progressValue = ref(65)`,
  OtSearchModal: `const searchModalOpen = ref(false)`,
  OtOtpInput: `const otpModel = ref('')`,
  OtTagInput: `const tagInputModel = ref(['anime', 'manga', 'community'])`,
  OtPasswordStrength: `const authPasswordModel = ref('')`,
  OtAvatarGroup: `const avatarGroupData = [
  { src: 'https://i.pravatar.cc/150?img=11', name: 'Zoro Roronoa', color: 'success' },
  { src: 'https://i.pravatar.cc/150?img=12', name: 'Luffy Monkey D.', color: 'primary' },
  { src: 'https://i.pravatar.cc/150?img=13', name: 'Nami Cat Burglar', color: 'warning' },
  { src: 'https://i.pravatar.cc/150?img=14', name: 'Sanji Vinsmoke', color: 'danger' },
  { src: 'https://i.pravatar.cc/150?img=15', name: 'Nico Robin', color: 'primary' },
  { src: 'https://i.pravatar.cc/150?img=16', name: 'Chopper Tony Tony', color: 'success' }
]`,
  OtAnimeCard: `const animeCardData = [
  { title: 'One Piece', cover: 'https://cdn.myanimelist.net/images/anime/1244/138851.jpg', score: 8.7, genres: ['Action', 'Adventure', 'Fantasy'], type: 'TV', status: 'airing', year: 1999, episodes: '1100+' },
  { title: 'Attack on Titan', cover: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg', score: 8.5, genres: ['Action', 'Drama', 'Fantasy'], type: 'TV', status: 'completed', year: 2013, episodes: 87 },
  { title: 'Jujutsu Kaisen', cover: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg', score: 8.6, genres: ['Action', 'Fantasy'], type: 'TV', status: 'airing', year: 2020, episodes: 48 },
  { title: 'Demon Slayer', cover: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg', score: 8.5, genres: ['Action', 'Fantasy'], type: 'TV', status: 'airing', year: 2019, episodes: 44 }
]`,
  OtEpisodeCard: `const episodeData = [
  { number: 'EP 1', title: 'The Day I Became a Shinigami', thumbnail: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg', duration: '23:40', watched: true, progress: 100 },
  { number: 'EP 2', title: "The Shinigami's Work", thumbnail: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg', duration: '24:10', watched: true, progress: 100 },
  { number: 'EP 3', title: "The Older Brother's Wish", thumbnail: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg', duration: '23:55', current: true, progress: 65 },
  { number: 'EP 4', title: 'Cursed Sphere', thumbnail: 'https://cdn.myanimelist.net/images/anime/1244/138851.jpg', duration: '24:00', filler: true }
]`
}

// Extra imports map
const extraImportsMap = {
  OtToast: `import { useToast } from '../../src/composables/useToast'`,
  OtAuthCard: `import OtInput from '../../src/components/OtInput.vue'\nimport OtButton from '../../src/components/OtButton.vue'\nimport OtSocialButton from '../../src/components/OtSocialButton.vue'`
}

if (!fs.existsSync(previewsDir)) {
  fs.mkdirSync(previewsDir, { recursive: true })
}

for (const preview of previews) {
  const innerLines = preview.lines.slice(1, -1)
  const innerContent = innerLines.map(l => l.replace(/^        /, '')).join('\n').trim()

  // Find used components
  const usedComponents = new Set()
  const componentRegex = /<(Ot\w+)[\s/>]/g
  let match
  while ((match = componentRegex.exec(innerContent)) !== null) {
    usedComponents.add(match[1])
  }

  // Build imports
  const imports = []
  for (const comp of usedComponents) {
    imports.push(`import ${comp} from '../../src/components/${comp}.vue'`)
  }

  // Add extra imports
  if (extraImportsMap[preview.name]) {
    // Don't duplicate
    const extra = extraImportsMap[preview.name].split('\n')
    for (const imp of extra) {
      if (!imports.some(i => i === imp)) {
        imports.push(imp)
      }
    }
  }

  // Check if needs ref
  const state = stateMap[preview.name] || ''
  const needsRef = state.includes('ref(') || innerContent.includes('v-model')
  const needsUseToast = state.includes('useToast')

  let scriptImports = ''
  if (needsRef) scriptImports += "import { ref } from 'vue'\n"

  const fileContent = `<script setup>
${scriptImports}${imports.join('\n')}
${needsUseToast ? extraImportsMap['OtToast'] + '\n' : ''}
${state ? '\n' + state + '\n' : ''}
</script>

<template>
  <div class="preview">
    ${innerContent}
  </div>
</template>
`

  const fileName = `${preview.name}Preview.vue`
  fs.writeFileSync(path.join(previewsDir, fileName), fileContent)
  console.log(`  Created: ${fileName}`)
}

// Generate index.js
const indexLines = previews.map(p => `export { default as ${p.name}Preview } from './${p.name}Preview.vue'`)
fs.writeFileSync(path.join(previewsDir, 'index.js'), indexLines.join('\n') + '\n')

console.log(`\nDone! Created ${previews.length} preview files + index.js`)
