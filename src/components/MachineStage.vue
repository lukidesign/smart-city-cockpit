<template>
  <div class="mstage">
    <div class="base-glow"></div>

    <svg class="scene" viewBox="0 0 720 460" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="metalG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ffffff"/><stop offset="0.5" stop-color="#e6edf7"/><stop offset="1" stop-color="#c2cee0"/>
        </linearGradient>
        <linearGradient id="darkG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#3a4456"/><stop offset="1" stop-color="#222a38"/>
        </linearGradient>
      </defs>

      <!-- skid base -->
      <polygon points="120,360 600,360 660,330 180,330" fill="url(#darkG)"/>
      <polygon points="120,360 120,392 600,392 600,360" fill="#1a212e"/>
      <polygon points="600,360 660,330 660,360 600,392" fill="#10151f"/>

      <!-- radiator block (left) -->
      <rect x="150" y="200" width="120" height="150" rx="4" fill="#2c3442"/>
      <g stroke="#475063" stroke-width="2">
        <line v-for="n in 9" :key="n" :x1="160" :y1="208 + n*15" :x2="262" :y2="208 + n*15"/>
      </g>

      <!-- main motor body -->
      <rect x="270" y="170" width="240" height="170" rx="20" fill="url(#metalG)"/>
      <ellipse cx="510" cy="255" rx="40" ry="85" fill="#dfe7f2"/>
      <ellipse cx="510" cy="255" rx="40" ry="85" fill="none" stroke="#b6c3d6" stroke-width="2"/>
      <g stroke="#c2cee0" stroke-width="2">
        <line v-for="n in 7" :key="n" :x1="300 + n*26" :y1="180" :x2="300 + n*26" :y2="330"/>
      </g>

      <!-- pump head + pipe (top) -->
      <rect x="330" y="120" width="70" height="60" rx="10" fill="#e6edf7"/>
      <rect x="352" y="92" width="26" height="34" rx="6" fill="#cdd8e8"/>
      <path d="M365 100 q60 -40 110 6 l0 30 q-50 -34 -100 0 z" fill="#3a4456"/>
      <circle cx="478" cy="132" r="14" fill="#2c3442" stroke="#475063" stroke-width="3"/>

      <!-- hotspots -->
      <g>
        <circle cx="248" cy="232" r="24" fill="rgba(56,214,255,0.18)" stroke="#38d6ff" stroke-width="2"/>
        <circle cx="248" cy="232" r="6" fill="#38d6ff"/>
        <circle class="pulse" cx="248" cy="232" r="24" fill="none" stroke="#38d6ff" stroke-width="2"/>
      </g>
      <g>
        <circle cx="455" cy="245" r="26" fill="rgba(255,77,109,0.2)" stroke="#ff4d6d" stroke-width="2"/>
        <circle cx="455" cy="245" r="7" fill="#ff4d6d"/>
        <circle class="pulse" cx="455" cy="245" r="26" fill="none" stroke="#ff4d6d" stroke-width="2"/>
      </g>
      <g>
        <circle cx="600" cy="300" r="22" fill="rgba(255,154,60,0.2)" stroke="#ff9a3c" stroke-width="2"/>
        <circle cx="600" cy="300" r="6" fill="#ff9a3c"/>
      </g>

      <!-- leader line to End Effector -->
      <line x1="455" y1="245" x2="560" y2="368" stroke="#ff4d6d" stroke-width="1.5" stroke-dasharray="4 3"/>
    </svg>

    <div class="hotspot-chip">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="12" r="9"/></svg>
      End Effector
    </div>
    <div class="code-chip">HB 1205 C-2</div>
  </div>
</template>

<style scoped>
.mstage { position: relative; width: 100%; height: 100%; }
.scene { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 2; }
.base-glow {
  position: absolute; left: 50%; top: 70%; transform: translate(-50%, -50%);
  width: 560px; height: 180px; border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(56,160,255,0.3) 0%, rgba(56,160,255,0.05) 55%, transparent 72%);
  filter: blur(6px); z-index: 1;
}
.pulse { transform-origin: center; transform-box: fill-box; animation: pulse 2s ease-out infinite; }
@keyframes pulse { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(2); opacity: 0; } }
.hotspot-chip {
  position: absolute; left: 62%; top: 80%; z-index: 4;
  display: flex; align-items: center; gap: 8px;
  background: linear-gradient(90deg, #ff4d6d, #ff7a3c); color: #fff;
  font-size: 16px; font-weight: 600; padding: 8px 18px; border-radius: 20px;
  box-shadow: 0 0 16px rgba(255,77,109,0.5);
}
.code-chip {
  position: absolute; left: 50%; top: 92%; transform: translateX(-50%); z-index: 4;
  background: rgba(8,20,60,0.85); border: 1px solid rgba(56,214,255,0.45);
  color: #eaf3ff; font-size: 16px; font-weight: 600; padding: 7px 22px; border-radius: 18px;
}
@media (prefers-reduced-motion: reduce) { .pulse { animation: none; } }
</style>
