<template>
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
</template>

<script setup lang="ts">
import { machineDetail } from '../data/mock'
</script>

<style scoped>
.info { width: 270px; }
.info-code { font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 22px; }
.part { margin-bottom: 18px; }
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
</style>
