<template><EChart :option="option" /></template>

<script setup lang="ts">
import { computed } from 'vue'
import * as echarts from 'echarts'
import EChart from './EChart.vue'
import { waterQuality } from '../../data/mock'

const option = computed(() => ({
  tooltip: { trigger: 'axis' },
  legend: {
    data: ['Cod', 'Bacterial'], right: 0, top: 0,
    itemWidth: 8, itemHeight: 8, textStyle: { color: '#8fb4e8', fontSize: 11 }
  },
  grid: { left: 28, right: 10, top: 28, bottom: 22 },
  xAxis: {
    type: 'category', data: waterQuality.x, boundaryGap: true,
    axisLine: { lineStyle: { color: 'rgba(80,150,255,0.3)' } },
    axisTick: { show: false },
    axisLabel: { color: '#8fb4e8', fontSize: 10 }
  },
  yAxis: {
    type: 'value', max: 80,
    splitLine: { lineStyle: { color: 'rgba(80,150,255,0.12)' } },
    axisLabel: { color: '#8fb4e8', fontSize: 10 }
  },
  series: [
    {
      name: 'Cod', type: 'bar', barWidth: 7, data: waterQuality.cod,
      itemStyle: {
        borderRadius: [3, 3, 0, 0],
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#38d6ff' }, { offset: 1, color: 'rgba(56,214,255,0.1)' }
        ])
      }
    },
    {
      name: 'Bacterial', type: 'line', smooth: true, symbol: 'circle', symbolSize: 5,
      data: waterQuality.bacterial,
      lineStyle: { color: '#ff9a3c', width: 2 },
      itemStyle: { color: '#ff9a3c' },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(255,154,60,0.3)' }, { offset: 1, color: 'rgba(255,154,60,0)' }
        ])
      }
    }
  ]
}))
</script>
