<template><EChart :option="option" /></template>

<script setup lang="ts">
import { computed } from 'vue'
import EChart from './EChart.vue'
import { ecosystem } from '../../data/mock'

const option = computed(() => ({
  radar: {
    center: ['50%', '54%'], radius: '64%',
    indicator: ecosystem.indicators,
    splitNumber: 4,
    axisName: { color: '#8fb4e8', fontSize: 11 },
    splitLine: { lineStyle: { color: 'rgba(80,150,255,0.25)' } },
    splitArea: { areaStyle: { color: ['rgba(20,60,140,0.10)', 'rgba(20,60,140,0.02)'] } },
    axisLine: { lineStyle: { color: 'rgba(80,150,255,0.25)' } }
  },
  series: [
    {
      type: 'radar', symbol: 'circle', symbolSize: 4,
      data: [{
        value: ecosystem.values,
        itemStyle: { color: '#ff9a3c' },
        lineStyle: { color: '#ff9a3c', width: 2 },
        areaStyle: { color: 'rgba(255,154,60,0.35)' }
      }]
    }
  ]
}))
</script>
