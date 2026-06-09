<template>
  <div class="mlist">
    <div v-for="m in machines" :key="m.id" class="mcard"
      :class="{ active: m.id === activeId }" @click="$emit('select', m.id)">
      <div class="thumb-box"><MachineThumb :kind="m.kind" /></div>
      <div class="meta">
        <span class="name">{{ m.name }}</span>
        <span class="val font-num">{{ m.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { machines } from '../data/mock'
import MachineThumb from './MachineThumb.vue'
defineProps<{ activeId?: string }>()
defineEmits<{ select: [id: string] }>()
</script>

<style scoped>
.mlist { display: flex; flex-direction: column; gap: 18px; }
.mcard {
  display: flex; align-items: center; gap: 14px;
  width: 230px; padding: 10px 16px;
  background: linear-gradient(120deg, rgba(20,52,140,0.4), rgba(10,24,80,0.25));
  border: 1px solid rgba(56,214,255,0.28); border-radius: 30px;
  cursor: pointer; transition: all .2s;
}
.mcard:hover { border-color: rgba(56,214,255,0.6); transform: translateX(4px); }
.mcard.active {
  background: linear-gradient(120deg, rgba(47,123,255,0.55), rgba(56,214,255,0.3));
  border-color: var(--cyan); box-shadow: 0 0 18px rgba(56,214,255,0.4);
}
.thumb-box {
  width: 64px; height: 44px; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.meta { display: flex; flex-direction: column; line-height: 1.2; }
.name { font-size: 13px; color: var(--text-dim); letter-spacing: 1px; }
.val { font-size: 20px; font-weight: 700; color: #fff; }
</style>
