<template>
  <div class="hud-panel">
    <div class="corner tl"></div>
    <div class="corner tr"></div>
    <div class="corner bl"></div>
    <div class="corner br"></div>
    <header v-if="title" class="hud-title">
      <span class="bar"></span>{{ title }}
    </header>
    <div class="hud-body"><slot /></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<style scoped>
.hud-panel {
  position: relative;
  background: var(--panel-bg);
  border: 1px solid var(--panel-border);
  border-radius: 6px;
  box-shadow: inset 0 0 30px rgba(40,120,255,0.12), 0 6px 24px rgba(0,10,40,0.35);
  backdrop-filter: blur(4px);
  padding: 14px 18px 16px;
}
.corner {
  position: absolute; width: 12px; height: 12px; border: 2px solid var(--cyan);
  opacity: 0.85;
}
.tl { top: -1px; left: -1px; border-right: 0; border-bottom: 0; }
.tr { top: -1px; right: -1px; border-left: 0; border-bottom: 0; }
.bl { bottom: -1px; left: -1px; border-right: 0; border-top: 0; }
.br { bottom: -1px; right: -1px; border-left: 0; border-top: 0; }
.hud-title {
  display: flex; align-items: center; gap: 8px;
  font-weight: 600; font-size: 17px; letter-spacing: 1px;
  color: var(--text); text-transform: uppercase; margin-bottom: 12px;
}
.hud-title .bar {
  width: 4px; height: 16px; border-radius: 2px;
  background: var(--grad-cyan); box-shadow: 0 0 8px var(--cyan);
}
.hud-body { position: relative; }
</style>
