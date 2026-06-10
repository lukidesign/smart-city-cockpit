<template>
  <div class="screen-wrap">
    <div class="screen" ref="screenRef">
      <TopNav />

      <div class="body">
        <LeftRail class="rail-left" />

        <main class="center">
          <!-- header: park title + stats -->
          <div class="park"><h2>NHKK- BBC Park</h2><span class="dd">▾</span></div>
          <div class="stats">
            <StatChip v-for="(s, i) in statsCards" :key="i" :value="s.value" :color="s.color" :pct="s.pct" />
          </div>

          <!-- OVERVIEW center -->
          <template v-if="view === 'overview'">
            <div class="slider">
              <div class="track"><div class="knob"></div></div>
              <span class="pill"><span class="tri">◀</span> Industrial Park</span>
            </div>
            <CityStage class="stage-city" />
            <MachineList class="mlist-right" @select="openDetail" />
          </template>

          <!-- DETAIL center -->
          <template v-else>
            <MachineList class="mlist-left" active-id="HB1205" @select="() => {}" />
            <MachineStage class="stage-machine" />
            <MachineInfo class="minfo" />
          </template>

          <!-- bottom footers + tabs -->
          <div class="cbottom">
            <FactoryFooter class="ff-left" title="FACTORY DATA" accent="cyan"
              :cols="footL" />
            <BottomTabs :active="tab" @change="onTab" />
            <FactoryFooter class="ff-right" :title="view === 'overview' ? 'WARNING NUMBER' : 'FACTORY DATA'"
              :accent="view === 'overview' ? 'orange' : 'cyan'" :cols="footR" />
          </div>
        </main>

        <RightRail class="rail-right" />
      </div>

      <button v-if="view === 'detail'" class="back" @click="view = 'overview'">‹ BACK</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useScale } from './utils/scale'
import TopNav from './components/TopNav.vue'
import LeftRail from './components/LeftRail.vue'
import RightRail from './components/RightRail.vue'
import BottomTabs from './components/BottomTabs.vue'
import StatChip from './components/StatChip.vue'
import MachineList from './components/MachineList.vue'
import CityStage from './components/CityStage.vue'
import MachineStage from './components/MachineStage.vue'
import MachineInfo from './components/MachineInfo.vue'
import FactoryFooter from './components/FactoryFooter.vue'
import { statsCards, factoryData, warning } from './data/mock'

const view = ref<'overview' | 'detail'>('overview')
const tab = ref('3D MAP')
function openDetail() { view.value = 'detail' }
function onTab(t: string) { tab.value = t }

const footL = computed(() => [
  { k: 'Index', v: factoryData.index }, { k: 'Order', v: factoryData.order },
  { k: 'Floating', v: factoryData.floating }, { k: 'Passenger', v: factoryData.passenger }
])
const footR = computed(() => view.value === 'overview'
  ? [{ k: 'Index', v: warning.index }, { k: 'Working', v: warning.working }, { k: 'Floating', v: warning.floating }, { k: 'Passenger', v: warning.passenger }]
  : footL.value)

const screenRef = ref<HTMLElement>()
let cleanup: () => void
onMounted(() => { if (screenRef.value) cleanup = useScale(screenRef.value, 2560, 1024) })
onUnmounted(() => cleanup?.())
</script>

<style scoped>
.screen-wrap { width: 100%; height: 100%; position: relative; overflow: hidden; }
.screen {
  position: absolute; left: 50%; top: 50%;
  width: 2560px; height: 1024px; transform-origin: 0 0;
  display: flex; flex-direction: column;
  padding: 10px 22px 14px;
}

.body { flex: 1; display: flex; gap: 18px; min-height: 0; padding-top: 4px; }
.rail-left, .rail-right { width: 384px; flex-shrink: 0; }

.center { flex: 1; position: relative; min-width: 0; }
.park { position: absolute; left: 0; top: 4px; display: flex; align-items: center; gap: 12px; z-index: 5; }
.park h2 { font-size: 30px; font-weight: 700; color: #fff; text-shadow: 0 0 14px rgba(56,214,255,0.4); white-space: nowrap; }
.dd { width: 28px; height: 28px; border: 1px solid rgba(56,214,255,0.5); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--cyan); cursor: pointer; }
.stats { position: absolute; left: 50%; top: 6px; transform: translateX(-50%); display: flex; gap: 18px; z-index: 5; }

.slider { position: absolute; left: 0; top: 130px; display: flex; align-items: center; gap: 14px; z-index: 4; }
.track { width: 6px; height: 210px; border-radius: 3px; background: rgba(80,150,255,0.18); position: relative; }
.knob { position: absolute; left: 50%; top: 38%; transform: translate(-50%, -50%); width: 14px; height: 14px; border-radius: 50%; background: var(--cyan); box-shadow: 0 0 12px var(--cyan); }
.pill { display: flex; align-items: center; gap: 8px; background: rgba(8,20,60,0.7); border: 1px solid rgba(56,214,255,0.4); color: #eaf3ff; font-size: 15px; padding: 7px 16px; border-radius: 18px; }
.pill .tri { color: var(--cyan); font-size: 11px; }

.stage-city { position: absolute; left: 50%; top: 70px; transform: translateX(-50%); width: 1080px; height: 660px; }
.mlist-right { position: absolute; right: 0; top: 120px; }
.mlist-left { position: absolute; left: 0; top: 150px; }
.stage-machine { position: absolute; left: 50%; top: 96px; transform: translateX(-50%); width: 980px; height: 600px; }
.minfo { position: absolute; right: 0; top: 96px; }

.cbottom {
  position: absolute; left: 0; right: 0; bottom: 0;
  display: flex; align-items: center; justify-content: space-between; gap: 20px;
}
.ff-left, .ff-right { flex-shrink: 0; }

.back {
  position: absolute; right: 22px; top: 86px; z-index: 30;
  background: rgba(8,20,60,0.8); border: 1px solid rgba(56,214,255,0.45);
  color: var(--cyan); font-family: inherit; font-size: 15px; font-weight: 600;
  letter-spacing: 1px; padding: 9px 18px; border-radius: 8px; cursor: pointer; transition: all .2s;
}
.back:hover { background: rgba(56,214,255,0.2); color: #fff; }
</style>
