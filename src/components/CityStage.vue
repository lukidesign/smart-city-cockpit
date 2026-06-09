<template>
  <div class="stage">
    <!-- glowing base disc -->
    <div class="base-glow"></div>
    <div class="base-ring"></div>

    <svg class="scene" viewBox="0 0 760 600" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="topG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dde8f7"/>
        </linearGradient>
        <radialGradient id="orbG" cx="40%" cy="35%" r="70%">
          <stop offset="0" stop-color="#bfe6ff"/><stop offset="0.5" stop-color="#4aa0ff"/><stop offset="1" stop-color="#1846b8"/>
        </radialGradient>
        <linearGradient id="cubeG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#7fd8ff"/><stop offset="1" stop-color="#2f7bff"/>
        </linearGradient>
      </defs>

      <!-- platform -->
      <polygon :points="platform.top" fill="rgba(40,110,230,0.18)" stroke="rgba(80,180,255,0.5)" stroke-width="1.5"/>
      <polygon :points="platform.left" fill="rgba(20,50,130,0.55)"/>
      <polygon :points="platform.right" fill="rgba(14,36,100,0.7)"/>

      <!-- buildings -->
      <g v-for="(b, i) in buildings" :key="i">
        <polygon :points="b.right" :fill="b.cRight"/>
        <polygon :points="b.left" :fill="b.cLeft"/>
        <polygon :points="b.top" fill="url(#topG)"/>
        <!-- window grids on the two visible faces -->
        <g :transform="b.mLeft">
          <rect v-for="(w, k) in b.winLeft" :key="'l'+k" :x="w.x" :y="w.y" :width="w.w" :height="w.h" fill="#3f86ff" opacity="0.65"/>
        </g>
        <g :transform="b.mRight">
          <rect v-for="(w, k) in b.winRight" :key="'r'+k" :x="w.x" :y="w.y" :width="w.w" :height="w.h" fill="#2f6ae0" opacity="0.6"/>
        </g>
      </g>

      <!-- conveyor cubes -->
      <g v-for="(c, i) in cubes" :key="'c'+i">
        <polygon :points="c.right" fill="#1b54c8"/>
        <polygon :points="c.left" fill="#2f7bff"/>
        <polygon :points="c.top" fill="url(#cubeG)"/>
      </g>

      <!-- central orb (Stash) -->
      <ellipse :cx="orb.x" :cy="orb.y + 6" rx="34" ry="11" fill="rgba(0,0,0,0.28)"/>
      <circle :cx="orb.x" :cy="orb.y" r="30" fill="url(#orbG)"/>
      <ellipse :cx="orb.x - 9" :cy="orb.y - 9" rx="9" ry="5" fill="#eaf6ff" opacity="0.5"/>

      <!-- truck (left) -->
      <g :transform="`translate(${truck.x},${truck.y})`">
        <polygon points="0,18 70,18 70,46 0,46" fill="#cfd9e8"/>
        <polygon points="70,12 104,22 104,46 70,46" fill="#aab6cc"/>
        <polygon points="0,18 70,18 78,8 8,8" fill="#e7eef8"/>
        <rect x="76" y="26" width="16" height="12" rx="2" fill="#5fb8ff"/>
        <circle cx="20" cy="50" r="7" fill="#1a2740"/><circle cx="20" cy="50" r="3" fill="#5fb8ff"/>
        <circle cx="84" cy="50" r="7" fill="#1a2740"/><circle cx="84" cy="50" r="3" fill="#5fb8ff"/>
      </g>
    </svg>

    <!-- floating labels -->
    <span class="label" style="left: 58%; top: 30%;">Sales BU</span>
    <span class="label" style="left: 41%; top: 56%;">Stash</span>
    <span class="label" style="left: 70%; top: 38%;">Factory</span>

    <!-- truck progress chip -->
    <div class="truck-chip">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#38d6ff"><path d="M3 7h11v8H3z"/><path d="M14 10h4l3 3v2h-7z"/><circle cx="7" cy="17" r="2" fill="#0a1655"/><circle cx="18" cy="17" r="2" fill="#0a1655"/></svg>
      <span class="plate">川A GA626</span>
      <div class="prog"><div class="fill" style="width:28%"></div></div>
      <span class="pct font-num">28%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const S = 30
const OX = 360
const OY = 250
const iso = (x: number, y: number, z: number): [number, number] => [
  OX + (x - y) * 0.866 * S,
  OY + (x + y) * 0.5 * S - z * S
]
const pts = (arr: [number, number][]) => arr.map(p => p.join(',')).join(' ')

interface B {
  x: number; y: number; w: number; d: number; h: number
  cLeft: string; cRight: string
}
const defs: B[] = [
  { x: 0.2, y: 0.2, w: 2.0, d: 2.0, h: 7.2, cLeft: '#c2d2ea', cRight: '#9fb2d2' },
  { x: 2.4, y: 1.2, w: 1.7, d: 1.7, h: 5.4, cLeft: '#cdd9ee', cRight: '#a7b8d6' },
  { x: 3.6, y: 4.0, w: 2.2, d: 1.8, h: 1.6, cLeft: '#d6e0f0', cRight: '#b2c1dc' }
]

function face(p0: [number, number], u: [number, number], v: [number, number]) {
  // affine matrix mapping unit square -> parallelogram
  return `matrix(${u[0]},${u[1]},${v[0]},${v[1]},${p0[0]},${p0[1]})`
}
function winGrid(cols: number, rows: number) {
  const out: { x: number; y: number; w: number; h: number }[] = []
  const gx = 1 / cols, gy = 1 / rows
  for (let c = 0; c < cols; c++)
    for (let r = 0; r < rows; r++)
      out.push({ x: c * gx + gx * 0.18, y: r * gy + gy * 0.16, w: gx * 0.6, h: gy * 0.62 })
  return out
}

const buildings = computed(() =>
  defs.map(b => {
    const top = pts([iso(b.x, b.y, b.h), iso(b.x + b.w, b.y, b.h), iso(b.x + b.w, b.y + b.d, b.h), iso(b.x, b.y + b.d, b.h)])
    // left face = the (y+d) side
    const Lp0 = iso(b.x, b.y + b.d, b.h)
    const Lu = sub(iso(b.x + b.w, b.y + b.d, b.h), Lp0)
    const Lv = sub(iso(b.x, b.y + b.d, 0), Lp0)
    const left = pts([iso(b.x, b.y + b.d, 0), iso(b.x + b.w, b.y + b.d, 0), iso(b.x + b.w, b.y + b.d, b.h), iso(b.x, b.y + b.d, b.h)])
    // right face = the (x+w) side
    const Rp0 = iso(b.x + b.w, b.y, b.h)
    const Ru = sub(iso(b.x + b.w, b.y + b.d, b.h), Rp0)
    const Rv = sub(iso(b.x + b.w, b.y, 0), Rp0)
    const right = pts([iso(b.x + b.w, b.y, 0), iso(b.x + b.w, b.y + b.d, 0), iso(b.x + b.w, b.y + b.d, b.h), iso(b.x + b.w, b.y, b.h)])
    const rows = Math.max(2, Math.round(b.h * 1.6))
    return {
      top, left, right, cLeft: b.cLeft, cRight: b.cRight,
      mLeft: face(Lp0, Lu, Lv), mRight: face(Rp0, Ru, Rv),
      winLeft: winGrid(Math.max(2, Math.round(b.w * 2)), rows),
      winRight: winGrid(Math.max(2, Math.round(b.d * 2)), rows)
    }
  })
)
function sub(a: [number, number], b: [number, number]): [number, number] { return [a[0] - b[0], a[1] - b[1]] }

const platform = computed(() => {
  const z = 0.18, x0 = -1.2, y0 = -1.2, w = 8.4, d = 8.4
  return {
    top: pts([iso(x0, y0, z), iso(x0 + w, y0, z), iso(x0 + w, y0 + d, z), iso(x0, y0 + d, z)]),
    left: pts([iso(x0, y0 + d, 0), iso(x0 + w, y0 + d, 0), iso(x0 + w, y0 + d, z), iso(x0, y0 + d, z)]),
    right: pts([iso(x0 + w, y0, 0), iso(x0 + w, y0 + d, 0), iso(x0 + w, y0 + d, z), iso(x0 + w, y0, z)])
  }
})

const cubes = computed(() => {
  const list: { x: number; y: number; s: number }[] = [
    { x: 2.0, y: 5.0, s: 0.7 }, { x: 1.0, y: 5.6, s: 0.55 }, { x: 3.0, y: 5.6, s: 0.6 }
  ]
  return list.map(c => {
    const z = c.s
    return {
      top: pts([iso(c.x, c.y, z), iso(c.x + c.s, c.y, z), iso(c.x + c.s, c.y + c.s, z), iso(c.x, c.y + c.s, z)]),
      left: pts([iso(c.x, c.y + c.s, 0), iso(c.x + c.s, c.y + c.s, 0), iso(c.x + c.s, c.y + c.s, z), iso(c.x, c.y + c.s, z)]),
      right: pts([iso(c.x + c.s, c.y, 0), iso(c.x + c.s, c.y + c.s, 0), iso(c.x + c.s, c.y + c.s, z), iso(c.x + c.s, c.y, z)])
    }
  })
})

const orb = computed(() => { const [x, y] = iso(2.5, 3.4, 1.2); return { x, y } })
const truck = computed(() => { const [x, y] = iso(-1.6, 2.4, 0.4); return { x: x - 30, y: y - 30 } })
</script>

<style scoped>
.stage { position: relative; width: 100%; height: 100%; }
.scene { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 2; }
.base-glow {
  position: absolute; left: 50%; top: 58%; transform: translate(-50%, -50%);
  width: 540px; height: 230px; border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(56,160,255,0.35) 0%, rgba(56,160,255,0.06) 55%, transparent 72%);
  filter: blur(6px); z-index: 1;
}
.base-ring {
  position: absolute; left: 50%; top: 58%; transform: translate(-50%, -50%);
  width: 470px; height: 200px; border-radius: 50%;
  border: 2px solid rgba(90,190,255,0.4); box-shadow: 0 0 30px rgba(56,160,255,0.35);
  z-index: 1;
}
.label {
  position: absolute; transform: translate(-50%, -50%); z-index: 3;
  background: rgba(8,20,60,0.85); border: 1px solid rgba(56,214,255,0.45);
  color: #eaf3ff; font-size: 15px; font-weight: 600; letter-spacing: 0.5px;
  padding: 5px 14px; border-radius: 16px; white-space: nowrap;
  box-shadow: 0 0 14px rgba(56,214,255,0.25);
}
.truck-chip {
  position: absolute; left: 16%; top: 46%; z-index: 4;
  display: flex; align-items: center; gap: 10px;
  background: rgba(8,20,60,0.85); border: 1px solid rgba(56,214,255,0.45);
  padding: 8px 14px; border-radius: 22px; box-shadow: 0 0 14px rgba(56,214,255,0.25);
}
.plate { font-size: 14px; font-weight: 600; color: #eaf3ff; }
.prog { width: 70px; height: 6px; border-radius: 3px; background: rgba(255,255,255,0.15); overflow: hidden; }
.prog .fill { height: 100%; background: var(--grad-cyan); border-radius: 3px; }
.pct { font-size: 13px; color: var(--cyan); }
</style>
