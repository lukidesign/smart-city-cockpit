<template>
  <div class="chip">
    <span class="cube" :class="color">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2 L21 7 V17 L12 22 L3 17 V7 Z" :fill="color === 'orange' ? '#ff8a3c' : '#38d6ff'" opacity="0.9"/>
        <path d="M12 2 L21 7 L12 12 L3 7 Z" fill="#fff" opacity="0.85"/>
      </svg>
    </span>
    <div class="meta">
      <span class="lab">Stats</span>
      <span class="val font-num">{{ value }}</span>
      <div class="bar"><div class="fill" :class="color" :style="{ width: pct + '%' }"></div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ value: string; color: string; pct: number }>()
</script>

<style scoped>
.chip {
  display: flex; align-items: center; gap: 12px;
  background: linear-gradient(120deg, rgba(20,52,140,0.45), rgba(10,24,80,0.3));
  border: 1px solid rgba(56,214,255,0.35); border-radius: 30px;
  padding: 9px 22px 9px 14px; min-width: 200px;
}
.cube { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; }
.meta { display: flex; flex-direction: column; }
.lab { font-size: 12px; color: var(--text-mute); letter-spacing: 1px; }
.val { font-size: 19px; font-weight: 700; color: #fff; line-height: 1.1; }
.bar { width: 130px; height: 4px; border-radius: 2px; background: rgba(255,255,255,0.12); margin-top: 4px; overflow: hidden; }
.fill { height: 100%; border-radius: 2px; }
.fill.cyan { background: var(--grad-cyan); }
.fill.orange { background: var(--grad-orange); }
</style>
