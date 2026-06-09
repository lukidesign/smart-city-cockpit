<template>
  <div class="tabs">
    <span v-for="t in tabs" :key="t" class="tab" :class="{ active: t === active }"
      @click="$emit('change', t)">{{ t }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ active: string }>()
defineEmits<{ change: [tab: string] }>()
const tabs = ['3D MAP', 'GRID MAP', 'SATELLITE']
</script>

<style scoped>
.tabs {
  display: flex; align-items: center; justify-content: center; gap: 14px;
  background: linear-gradient(180deg, rgba(20,52,140,0.55), rgba(10,24,80,0.35));
  border: 1px solid rgba(56,214,255,0.4); border-radius: 8px;
  padding: 10px 26px; backdrop-filter: blur(4px);
}
.tab {
  font-size: 17px; font-weight: 600; letter-spacing: 1.5px; color: var(--text-dim);
  padding: 6px 22px; border-radius: 6px; cursor: pointer; transition: all .2s;
}
.tab:hover { color: var(--cyan); }
.tab.active {
  color: #fff; background: linear-gradient(180deg, rgba(56,214,255,0.35), rgba(47,123,255,0.25));
  box-shadow: 0 0 14px rgba(56,214,255,0.4) inset; text-shadow: 0 0 10px rgba(56,214,255,0.6);
}
</style>
