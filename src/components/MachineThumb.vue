<template>
  <svg viewBox="0 0 64 44" width="58" height="40" class="thumb">
    <!-- pump / motor unit -->
    <template v-if="kind !== 'robot'">
      <ellipse cx="32" cy="40" rx="26" ry="3.5" fill="rgba(0,0,0,0.25)" />
      <rect x="6" y="20" width="20" height="16" rx="2" :fill="dark" />
      <rect x="6" y="20" width="20" height="4" rx="1" :fill="accent" opacity="0.8" />
      <rect x="24" y="14" width="26" height="22" rx="3" :fill="body" />
      <circle cx="50" cy="25" r="9" :fill="body" stroke="rgba(0,0,0,0.15)" />
      <circle cx="50" cy="25" r="4" :fill="accent" />
      <rect x="30" y="8" width="5" height="8" rx="1" :fill="dark" />
      <rect x="14" y="36" width="40" height="4" rx="2" :fill="dark" />
    </template>
    <!-- robotic arm -->
    <template v-else>
      <ellipse cx="32" cy="40" rx="22" ry="3.5" fill="rgba(0,0,0,0.25)" />
      <rect x="22" y="32" width="20" height="8" rx="2" fill="#2f7bff" />
      <rect x="29" y="16" width="6" height="18" rx="2" fill="#5b8dff" />
      <rect x="33" y="12" width="16" height="6" rx="3" fill="#38d6ff" transform="rotate(20 41 15)" />
      <circle cx="32" cy="33" r="3" fill="#eaf3ff" />
      <circle cx="48" cy="22" r="3" fill="#ff9a3c" />
    </template>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ kind: string }>()
const palette: Record<string, { body: string; dark: string; accent: string }> = {
  'pump-blue':   { body: '#dfe9f7', dark: '#3a4a6b', accent: '#2f7bff' },
  'pump-orange': { body: '#e9eef7', dark: '#3a4a6b', accent: '#ff7a3c' },
  'pump-white':  { body: '#f2f6fc', dark: '#7d8aa3', accent: '#9fb4d6' },
  'robot':       { body: '#dfe9f7', dark: '#3a4a6b', accent: '#38d6ff' }
}
const body = computed(() => palette[props.kind]?.body ?? '#dfe9f7')
const dark = computed(() => palette[props.kind]?.dark ?? '#3a4a6b')
const accent = computed(() => palette[props.kind]?.accent ?? '#2f7bff')
</script>

<style scoped>
.thumb { display: block; }
</style>
