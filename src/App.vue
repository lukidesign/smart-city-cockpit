<template>
  <div class="screen-wrap">
    <div class="screen" ref="screenRef">
      <TopNav />

      <OverviewView v-if="view === 'overview'" @open="openDetail" />
      <DetailView v-else @select="() => {}" />

      <!-- back button (detail only) -->
      <button v-if="view === 'detail'" class="back" @click="view = 'overview'">‹ BACK</button>

      <!-- bottom center tabs -->
      <div class="bottom-bar">
        <BottomTabs :active="tab" @change="onTab" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useScale } from './utils/scale'
import TopNav from './components/TopNav.vue'
import BottomTabs from './components/BottomTabs.vue'
import OverviewView from './components/OverviewView.vue'
import DetailView from './components/DetailView.vue'

const view = ref<'overview' | 'detail'>('overview')
const tab = ref('3D MAP')
function openDetail() { view.value = 'detail' }
function onTab(t: string) { tab.value = t }

const screenRef = ref<HTMLElement>()
let cleanup: () => void
onMounted(() => { if (screenRef.value) cleanup = useScale(screenRef.value) })
onUnmounted(() => cleanup?.())
</script>

<style scoped>
.screen-wrap { width: 100%; height: 100%; position: relative; overflow: hidden; }
.screen {
  position: absolute; left: 50%; top: 50%;
  width: 1920px; height: 1080px; transform-origin: 0 0;
}
.bottom-bar {
  position: absolute; left: 50%; bottom: 24px; transform: translateX(-50%);
  display: flex; align-items: center; gap: 16px; z-index: 20;
}
.back {
  position: absolute; right: 30px; top: 54px; z-index: 30;
  background: rgba(8,20,60,0.8); border: 1px solid rgba(56,214,255,0.45);
  color: var(--cyan); font-family: inherit; font-size: 15px; font-weight: 600;
  letter-spacing: 1px; padding: 9px 18px; border-radius: 8px; cursor: pointer;
  transition: all .2s;
}
.back:hover { background: rgba(56,214,255,0.2); color: #fff; }

.fade-enter-active, .fade-leave-active { transition: opacity .3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
