<template>
  <div class="rail">
    <HudPanel title="Data Overview">
      <div class="do-top">
        <div class="do-tile">
          <span class="do-ic cyan"><svg width="22" height="22" viewBox="0 0 24 24" fill="#38d6ff"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/></svg></span>
          <div><div class="do-v font-num">{{ dataOverview.gross }}</div><div class="do-l">Gross Product</div></div>
        </div>
        <div class="do-tile">
          <span class="do-ic orange"><svg width="22" height="22" viewBox="0 0 24 24" fill="#ff9a3c"><circle cx="12" cy="7" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg></span>
          <div><div class="do-v font-num">{{ dataOverview.perCapita }}</div><div class="do-l">Per Capita GDP</div></div>
        </div>
      </div>
      <div class="do-comp">
        <div class="comp-left">
          <span class="comp-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38d6ff" stroke-width="1.6"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg></span>
          <div><div class="comp-l">Completed</div><div class="comp-v font-num">{{ dataOverview.completed }} <small>P</small></div></div>
        </div>
        <div class="bars">
          <div class="brow" v-for="b in dataOverview.bars" :key="b.label">
            <span class="bl">{{ b.label }}</span>
            <div class="bbar"><div class="bfill" :class="b.color" :style="{ width: b.pct + '%' }"></div></div>
            <span class="bv font-num">{{ b.value }}</span>
          </div>
        </div>
      </div>
    </HudPanel>

    <HudPanel title="Total Case">
      <div class="tcase">
        <div class="tc" v-for="t in totalCase" :key="t.label">
          <span class="tc-ic"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#38d6ff" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg></span>
          <div><div class="tc-v font-num">{{ t.value }} <span :class="t.trend === 'up' ? 'up' : 'down'">{{ t.trend === 'up' ? '↑' : '↓' }}</span></div><div class="tc-l">{{ t.label }}</div></div>
        </div>
      </div>
    </HudPanel>

    <HudPanel title="Ecosystem">
      <div class="eco">
        <div class="eco-rows">
          <div class="erow" v-for="r in ecosystem.rows" :key="r.label">
            <span class="el">{{ r.label }}</span>
            <div class="ebar"><div class="efill" :style="{ width: r.pct + '%' }"></div></div>
            <span class="ev font-num">{{ r.pct }}%</span>
          </div>
        </div>
        <div class="radar"><RadarChart /></div>
      </div>
    </HudPanel>

    <HudPanel title="Water Quality Testin">
      <div class="water"><WaterChart /></div>
    </HudPanel>
  </div>
</template>

<script setup lang="ts">
import HudPanel from './HudPanel.vue'
import RadarChart from './charts/RadarChart.vue'
import WaterChart from './charts/WaterChart.vue'
import { dataOverview, totalCase, ecosystem } from '../data/mock'
</script>

<style scoped>
.rail { display: flex; flex-direction: column; gap: 14px; height: 100%; }
.rail > :deep(.hud-panel) { flex: 1; min-height: 0; }

.do-top { display: flex; gap: 10px; margin-bottom: 10px; }
.do-tile { flex: 1; display: flex; align-items: center; gap: 10px; }
.do-ic { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.do-ic.cyan { background: rgba(56,214,255,0.15); border: 1px solid rgba(56,214,255,0.4); }
.do-ic.orange { background: rgba(255,154,60,0.15); border: 1px solid rgba(255,154,60,0.4); }
.do-v { font-size: 22px; font-weight: 700; color: #fff; }
.do-l { font-size: 12px; color: var(--text-dim); }
.do-comp { display: flex; gap: 14px; align-items: center; background: rgba(8,20,60,0.4); border: 1px solid rgba(56,214,255,0.2); border-radius: 6px; padding: 10px 12px; }
.comp-left { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
.comp-ic { width: 38px; height: 38px; border-radius: 6px; border: 1px solid rgba(56,214,255,0.3); display: flex; align-items: center; justify-content: center; }
.comp-l { font-size: 12px; color: var(--text-dim); }
.comp-v { font-size: 22px; font-weight: 700; color: var(--cyan); }
.comp-v small { font-size: 12px; color: var(--text-mute); }
.bars { flex: 1; display: flex; flex-direction: column; gap: 7px; }
.brow { display: grid; grid-template-columns: 36px 1fr 44px; align-items: center; gap: 8px; }
.bl { font-size: 12px; color: var(--text-dim); }
.bbar { height: 6px; border-radius: 3px; background: rgba(255,255,255,0.1); overflow: hidden; }
.bfill { height: 100%; } .bfill.cyan { background: var(--grad-cyan); } .bfill.orange { background: var(--grad-orange); }
.bv { font-size: 13px; color: #fff; text-align: right; }

.tcase { display: flex; gap: 16px; }
.tc { flex: 1; display: flex; align-items: center; gap: 12px; }
.tc-ic { width: 42px; height: 42px; border-radius: 50%; border: 1px solid rgba(56,214,255,0.35); display: flex; align-items: center; justify-content: center; background: rgba(56,214,255,0.08); flex-shrink: 0; }
.tc-v { font-size: 23px; font-weight: 700; color: var(--cyan); }
.tc-l { font-size: 13px; color: var(--text-dim); }
.up { color: var(--green); font-size: 13px; } .down { color: var(--red); font-size: 13px; }

.eco { display: grid; grid-template-columns: 145px 1fr; gap: 8px; align-items: center; }
.eco-rows { display: flex; flex-direction: column; gap: 9px; }
.erow { display: grid; grid-template-columns: 48px 1fr 38px; align-items: center; gap: 6px; }
.el { font-size: 12px; color: var(--text-dim); }
.ebar { height: 5px; border-radius: 3px; background: rgba(255,255,255,0.1); overflow: hidden; }
.efill { height: 100%; background: var(--grad-cyan); }
.ev { font-size: 12px; color: var(--cyan); text-align: right; }
.radar { height: 158px; }
.water { height: 150px; }
</style>
