<template>
  <div class="ff">
    <div class="icon">
      <svg width="46" height="40" viewBox="0 0 48 40" fill="none">
        <rect x="2" y="16" width="14" height="22" fill="#5b8dff" opacity="0.8"/>
        <rect x="18" y="6" width="12" height="32" fill="#7fb8ff"/>
        <rect x="32" y="20" width="12" height="18" fill="#38d6ff" opacity="0.8"/>
        <g fill="#0a1655" opacity="0.5"><rect x="20" y="10" width="3" height="3"/><rect x="25" y="10" width="3" height="3"/><rect x="20" y="16" width="3" height="3"/><rect x="25" y="16" width="3" height="3"/></g>
      </svg>
    </div>
    <div class="content">
      <div class="title" :class="accent">{{ title }}</div>
      <div class="cols">
        <div class="col" v-for="c in cols" :key="c.k">
          <span class="k">{{ c.k }}</span>
          <span class="v font-num" :class="accent">{{ c.v }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; accent?: string; cols: { k: string; v: string }[] }>()
</script>

<style scoped>
.ff { display: flex; align-items: center; gap: 16px; }
.icon { flex-shrink: 0; }
.title { font-size: 18px; font-weight: 700; letter-spacing: 1px; margin-bottom: 6px; }
.title.cyan { color: var(--cyan); } .title.orange { color: var(--orange); }
.cols { display: flex; gap: 26px; }
.col { display: flex; flex-direction: column; }
.k { font-size: 12px; color: var(--text-mute); letter-spacing: 1px; text-transform: uppercase; }
.v { font-size: 18px; font-weight: 700; color: #fff; }
.v.cyan { color: var(--cyan); } .v.orange { color: var(--orange); }
</style>
