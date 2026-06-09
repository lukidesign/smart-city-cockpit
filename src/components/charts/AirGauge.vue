<template><EChart :option="option" /></template>

<script setup lang="ts">
import { computed } from 'vue'
import EChart from './EChart.vue'

const option = computed(() => ({
  series: [
    {
      type: 'gauge', startAngle: 220, endAngle: -40,
      radius: '92%', center: ['50%', '52%'],
      progress: { show: false },
      axisLine: {
        lineStyle: {
          width: 14,
          color: [
            [0.25, '#36e0a6'], [0.5, '#38d6ff'],
            [0.75, '#ffd24d'], [1, '#ff9a3c']
          ]
        }
      },
      pointer: {
        length: '58%', width: 4, itemStyle: { color: '#eaf3ff' }
      },
      anchor: { show: true, size: 10, itemStyle: { color: '#38d6ff' } },
      axisTick: { distance: -14, length: 4, lineStyle: { color: '#0a1655', width: 1 } },
      splitLine: { distance: -14, length: 14, lineStyle: { color: '#0a1655', width: 2 } },
      axisLabel: { show: false },
      detail: {
        valueAnimation: true, offsetCenter: [0, '32%'],
        fontSize: 18, fontFamily: 'Orbitron', color: '#eaf3ff',
        formatter: '{value}'
      },
      title: { offsetCenter: [0, '60%'], color: '#8fb4e8', fontSize: 11 },
      data: [{ value: 86, name: 'API' }]
    }
  ]
}))
</script>
