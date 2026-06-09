<template><EChart :option="option" /></template>

<script setup lang="ts">
import { computed } from 'vue'
import EChart from './EChart.vue'
import { industryMap } from '../../data/mock'

const option = computed(() => ({
  tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
  series: [
    {
      type: 'pie', radius: ['58%', '82%'], center: ['50%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: { borderColor: '#081a55', borderWidth: 3 },
      label: { show: false },
      labelLine: { show: false },
      data: industryMap.map(d => ({
        value: d.value, name: d.name, itemStyle: { color: d.color }
      }))
    }
  ],
  graphic: [
    { type: 'text', left: 'center', top: '42%',
      style: { text: '57%', fontSize: 20, fontFamily: 'Orbitron', fill: '#38d6ff', fontWeight: 'bold' } }
  ]
}))
</script>
