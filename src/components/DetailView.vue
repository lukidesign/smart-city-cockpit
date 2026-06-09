<template>
  <div class="detail">
    <!-- time / weather -->
    <div class="clock">
      <span class="t font-num">08:58</span>
      <span class="d">07 - 04 - 2024</span>
      <span class="sep">|</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffd24d"><circle cx="12" cy="12" r="5"/><g stroke="#ffd24d" stroke-width="2"><line x1="12" y1="1" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="23"/><line x1="1" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="23" y2="12"/></g></svg>
      <span class="w">25℃~28℃</span>
    </div>

    <!-- left column -->
    <div class="left-col">
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

    <!-- center park title + stats -->
    <div class="park"><h2>NHKK- BBC Park</h2><span class="dd">▾</span></div>
    <div class="stats"><StatChip v-for="(s, i) in statsCards" :key="i" :value="s.value" :color="s.color" :pct="s.pct" /></div>

    <!-- machine list -->
    <MachineList class="mlist" active-id="HB1205" @select="$emit('select', $event)" />

    <!-- center machine stage -->
    <MachineStage class="mstage" />

    <!-- right detail info -->
    <div class="info">
      <div class="info-code font-num">{{ machineDetail.code }}</div>
      <div class="part" v-for="p in machineDetail.parts" :key="p.name">
        <div class="p-head"><span class="bullet" :class="{ bad: p.abnormal }"></span>{{ p.name }}</div>
        <template v-if="p.countdown">
          <div class="p-row"><span class="pk">Countdown:</span><span class="pv">{{ p.countdown }}</span></div>
          <div class="p-prog"><div class="fill" :style="{ width: p.pct + '%' }"></div><span class="ppct font-num">{{ p.pct }}%</span></div>
        </template>
        <template v-else>
          <div class="p-row"><span class="pk">Current State:</span><span class="pv" :class="{ bad: p.abnormal }">{{ p.state }}</span></div>
          <div class="p-row"><span class="pk">Maintenance:</span><span class="pv">{{ p.maintenance }}</span></div>
        </template>
      </div>
    </div>

    <!-- footers -->
    <FactoryFooter class="foot-left" title="FACTORY DATA" accent="cyan"
      :cols="[{k:'Index',v:factoryData.index},{k:'Order',v:factoryData.order},{k:'Floating',v:factoryData.floating},{k:'Passenger',v:factoryData.passenger}]" />
    <FactoryFooter class="foot-right" title="FACTORY DATA" accent="cyan"
      :cols="[{k:'Index',v:factoryData.index},{k:'Order',v:factoryData.order},{k:'Floating',v:factoryData.floating},{k:'Passenger',v:factoryData.passenger}]" />
  </div>
</template>

<script setup lang="ts">
import HudPanel from './HudPanel.vue'
import StatChip from './StatChip.vue'
import MachineList from './MachineList.vue'
import MachineStage from './MachineStage.vue'
import FactoryFooter from './FactoryFooter.vue'
import RadarChart from './charts/RadarChart.vue'
import WaterChart from './charts/WaterChart.vue'
import { statsCards, dataOverview, totalCase, ecosystem, machineDetail, factoryData } from '../data/mock'
defineEmits<{ select: [id: string] }>()
</script>

<style scoped>
.detail { position: absolute; inset: 0; }
.clock { position: absolute; left: 30px; top: 16px; display: flex; align-items: center; gap: 10px; color: var(--text-dim); font-size: 15px; }
.clock .t { font-size: 18px; color: #fff; font-weight: 700; }
.clock .sep { color: var(--text-mute); }
.clock .w { color: var(--cyan); }

.left-col { position: absolute; left: 24px; top: 96px; width: 388px; display: flex; flex-direction: column; gap: 14px; }

.do-top { display: flex; gap: 10px; margin-bottom: 12px; }
.do-tile { flex: 1; display: flex; align-items: center; gap: 10px; }
.do-ic { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
.do-ic.cyan { background: rgba(56,214,255,0.15); border: 1px solid rgba(56,214,255,0.4); }
.do-ic.orange { background: rgba(255,154,60,0.15); border: 1px solid rgba(255,154,60,0.4); }
.do-v { font-size: 21px; font-weight: 700; color: #fff; }
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
.tc-ic { width: 42px; height: 42px; border-radius: 50%; border: 1px solid rgba(56,214,255,0.35); display: flex; align-items: center; justify-content: center; background: rgba(56,214,255,0.08); }
.tc-v { font-size: 23px; font-weight: 700; color: var(--cyan); }
.tc-l { font-size: 13px; color: var(--text-dim); }
.up { color: var(--green); font-size: 13px; } .down { color: var(--red); font-size: 13px; }

.eco { display: grid; grid-template-columns: 150px 1fr; gap: 8px; align-items: center; }
.eco-rows { display: flex; flex-direction: column; gap: 9px; }
.erow { display: grid; grid-template-columns: 48px 1fr 38px; align-items: center; gap: 6px; }
.el { font-size: 12px; color: var(--text-dim); }
.ebar { height: 5px; border-radius: 3px; background: rgba(255,255,255,0.1); overflow: hidden; }
.efill { height: 100%; background: var(--grad-cyan); }
.ev { font-size: 12px; color: var(--cyan); text-align: right; }
.radar { height: 170px; }
.water { height: 150px; }

.park { position: absolute; left: 450px; top: 130px; display: flex; align-items: center; gap: 12px; }
.park h2 { font-size: 30px; font-weight: 700; color: #fff; text-shadow: 0 0 14px rgba(56,214,255,0.4); }
.dd { width: 28px; height: 28px; border: 1px solid rgba(56,214,255,0.5); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--cyan); }
.stats { position: absolute; left: 790px; top: 124px; display: flex; gap: 16px; }

.mlist { position: absolute; left: 450px; top: 270px; }
.mstage { position: absolute; left: 720px; top: 200px; width: 760px; height: 540px; }

.info { position: absolute; right: 60px; top: 220px; width: 300px; }
.info-code { font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 22px; }
.part { margin-bottom: 20px; }
.p-head { display: flex; align-items: center; gap: 10px; font-size: 19px; font-weight: 600; color: #fff; margin-bottom: 8px; }
.bullet { width: 9px; height: 9px; border-radius: 50%; background: var(--cyan); box-shadow: 0 0 8px var(--cyan); }
.bullet.bad { background: var(--red); box-shadow: 0 0 8px var(--red); }
.p-row { display: flex; gap: 10px; font-size: 14px; margin-bottom: 4px; padding-left: 19px; }
.pk { color: var(--text-dim); }
.pv { color: #fff; font-weight: 600; }
.pv.bad { color: var(--red); }
.p-prog { position: relative; height: 6px; border-radius: 3px; background: rgba(255,255,255,0.12); margin: 10px 0 0 19px; }
.p-prog .fill { height: 100%; border-radius: 3px; background: var(--grad-cyan); }
.ppct { position: absolute; right: 0; top: -18px; font-size: 12px; color: var(--cyan); }

.foot-left { position: absolute; left: 430px; bottom: 30px; }
.foot-right { position: absolute; right: 60px; bottom: 30px; }
</style>
