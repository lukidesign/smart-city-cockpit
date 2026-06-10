<template>
  <div class="rail">
    <HudPanel title="Police Today">
      <div class="police-top">
        <div class="ptile">
          <span class="picon cyan">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#38d6ff"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a4 4 0 018 0v2" stroke="#0a1655" stroke-width="2" fill="none"/></svg>
          </span>
          <div><div class="pl">Police Number</div><div class="pv font-num">{{ police.number }}</div></div>
        </div>
        <div class="ptile">
          <span class="picon orange">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#ff9a3c"><path d="M12 2a6 6 0 016 6v4l2 3H4l2-3V8a6 6 0 016-6z"/><circle cx="12" cy="20" r="2"/></svg>
          </span>
          <div><div class="pl">Alarms</div><div class="pv font-num orange">{{ police.alarms }} <span class="up">↑</span></div></div>
        </div>
      </div>
      <div class="bars">
        <div class="brow" v-for="b in police.industry" :key="b.label">
          <span class="bl">{{ b.label }}</span>
          <div class="bbar"><div class="bfill" :class="b.color" :style="{ width: b.pct + '%' }"></div></div>
          <span class="bv font-num">{{ b.value }}</span>
        </div>
      </div>
    </HudPanel>

    <HudPanel title="Safety Monitoring Statistics">
      <div class="safety">
        <div class="srow" v-for="s in safety" :key="s.label">
          <span class="sicon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#38d6ff" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>
          </span>
          <div>
            <div class="sv font-num">{{ s.value }} <span :class="s.trend === 'up' ? 'up' : 'down'">{{ s.trend === 'up' ? '↑' : '↓' }}</span></div>
            <div class="slbl">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </HudPanel>

    <HudPanel title="Air Quality">
      <div class="air">
        <div class="cities">
          <div class="crow" v-for="c in airQuality.cities" :key="c.name">
            <span class="cn">{{ c.name }}</span><span class="cg">{{ c.grade }}</span>
          </div>
        </div>
        <div class="gauge"><AirGauge /></div>
        <div class="legend">
          <div class="lrow" v-for="l in airQuality.legend" :key="l.range">
            <span class="dot" :style="{ background: l.color }"></span>{{ l.range }}
          </div>
        </div>
      </div>
    </HudPanel>

    <HudPanel title="Industry Map">
      <div class="industry">
        <div class="donut"><DonutChart /></div>
        <div class="ilegend">
          <div class="irow" v-for="d in industryMap" :key="d.name">
            <span class="dot" :style="{ background: d.color }"></span>{{ d.name }}
          </div>
        </div>
      </div>
    </HudPanel>
  </div>
</template>

<script setup lang="ts">
import HudPanel from './HudPanel.vue'
import AirGauge from './charts/AirGauge.vue'
import DonutChart from './charts/DonutChart.vue'
import { police, safety, airQuality, industryMap } from '../data/mock'
</script>

<style scoped>
.rail { display: flex; flex-direction: column; gap: 14px; height: 100%; }
.rail > :deep(.hud-panel) { flex: 1; min-height: 0; }

.police-top { display: flex; gap: 12px; margin-bottom: 12px; }
.ptile { flex: 1; display: flex; align-items: center; gap: 10px; }
.picon { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.picon.cyan { background: rgba(56,214,255,0.15); border: 1px solid rgba(56,214,255,0.4); }
.picon.orange { background: rgba(255,154,60,0.15); border: 1px solid rgba(255,154,60,0.4); }
.pl { font-size: 13px; color: var(--text-dim); }
.pv { font-size: 24px; font-weight: 700; color: #fff; }
.pv.orange { color: var(--orange); }
.up { color: var(--green); font-size: 14px; } .down { color: var(--red); font-size: 14px; }
.bars { display: flex; flex-direction: column; gap: 10px; }
.brow { display: grid; grid-template-columns: 130px 1fr 50px; align-items: center; gap: 10px; }
.bl { font-size: 13px; color: var(--text-dim); }
.bbar { height: 6px; border-radius: 3px; background: rgba(255,255,255,0.1); overflow: hidden; }
.bfill { height: 100%; border-radius: 3px; }
.bfill.cyan { background: var(--grad-cyan); } .bfill.orange { background: var(--grad-orange); }
.bv { font-size: 14px; color: #fff; text-align: right; }

.safety { display: flex; gap: 16px; }
.srow { flex: 1; display: flex; align-items: center; gap: 12px; }
.sicon { width: 42px; height: 42px; border-radius: 50%; border: 1px solid rgba(56,214,255,0.35); display: flex; align-items: center; justify-content: center; background: rgba(56,214,255,0.08); flex-shrink: 0; }
.sv { font-size: 24px; font-weight: 700; color: var(--cyan); }
.slbl { font-size: 13px; color: var(--text-dim); }

.air { display: grid; grid-template-columns: 76px 1fr 118px; align-items: center; gap: 6px; }
.cities { display: flex; flex-direction: column; gap: 6px; }
.crow { display: flex; justify-content: space-between; font-size: 12px; }
.cn { color: var(--text-dim); } .cg { color: var(--cyan); }
.gauge { height: 134px; }
.legend { display: flex; flex-direction: column; gap: 7px; }
.lrow { display: flex; align-items: center; gap: 7px; font-size: 11px; color: var(--text-dim); }
.dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }

.industry { display: grid; grid-template-columns: 140px 1fr; align-items: center; }
.donut { height: 144px; }
.ilegend { display: flex; flex-direction: column; gap: 12px; }
.irow { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text-dim); }
</style>
