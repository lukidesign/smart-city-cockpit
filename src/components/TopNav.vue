<template>
  <header class="topnav">
    <div class="bg-frame"></div>

    <nav class="left">
      <span class="nav-item" :class="{ active: i === 0 }" v-for="(n, i) in ['POPULATION', 'ECONOMICS']" :key="n">{{ n }}</span>
    </nav>

    <div class="center">
      <svg class="logo" width="30" height="30" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" fill="#38d6ff"/>
        <g stroke="#38d6ff" stroke-width="1.2">
          <circle cx="12" cy="4" r="1.6" fill="#0a1655"/>
          <circle cx="19" cy="9" r="1.6" fill="#0a1655"/>
          <circle cx="16" cy="19" r="1.6" fill="#0a1655"/>
          <circle cx="8" cy="19" r="1.6" fill="#0a1655"/>
          <circle cx="5" cy="9" r="1.6" fill="#0a1655"/>
          <path d="M12 6 L12 9 M17.5 9.6 L14.4 11 M15.2 17.4 L13 13.5 M8.8 17.4 L11 13.5 M6.5 9.6 L9.6 11"/>
        </g>
      </svg>
      <h1 class="title font-num">SMART CITY COCKPIT</h1>
    </div>

    <nav class="right">
      <span class="nav-item" v-for="n in ['COMMAND', 'ECOLOGY']" :key="n">{{ n }}</span>
    </nav>

    <div class="user">
      <div class="avatar">
        <span class="badge">8</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#38d6ff"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>
      </div>
      <span class="uname">Jacky001</span>
      <span class="caret">▾</span>
    </div>
  </header>
</template>

<style scoped>
.topnav { position: relative; height: 92px; }
.bg-frame {
  position: absolute; left: 50%; top: 0; transform: translateX(-50%);
  width: 1180px; height: 78px;
  background: linear-gradient(180deg, rgba(20,52,140,0.55), rgba(10,24,80,0.25));
  clip-path: polygon(0 0, 100% 0, 94% 100%, 6% 100%);
  border-bottom: 2px solid rgba(56,214,255,0.5);
}
.left, .right {
  position: absolute; top: 26px; display: flex; gap: 46px;
}
.left { left: 230px; }
.right { right: 230px; }
.nav-item {
  font-size: 17px; font-weight: 600; letter-spacing: 1.5px; color: var(--text-dim);
  cursor: pointer; padding: 6px 4px; transition: color .2s, text-shadow .2s;
}
.nav-item:hover { color: var(--cyan); }
.nav-item.active { color: #fff; text-shadow: 0 0 10px rgba(56,214,255,0.7); }
.center {
  position: absolute; left: 50%; top: 18px; transform: translateX(-50%);
  display: flex; align-items: center; gap: 12px;
}
.title {
  font-size: 30px; font-weight: 700; letter-spacing: 3px;
  background: linear-gradient(180deg, #ffffff 30%, #8fd4ff 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  text-shadow: 0 0 18px rgba(56,214,255,0.35);
}
.user {
  position: absolute; right: 30px; top: 24px;
  display: flex; align-items: center; gap: 10px; color: var(--text);
}
.avatar { position: relative; width: 34px; height: 34px; border-radius: 50%;
  border: 1px solid rgba(56,214,255,0.5); display: flex; align-items: center; justify-content: center;
  background: rgba(20,52,140,0.5); overflow: visible; }
.avatar svg { width: 20px; height: 20px; }
.badge {
  position: absolute; top: -5px; right: -5px; min-width: 16px; height: 16px;
  background: var(--orange); color: #1a0d00; font-size: 10px; font-weight: 700;
  border-radius: 8px; display: flex; align-items: center; justify-content: center; padding: 0 4px;
}
.uname { font-size: 16px; font-weight: 600; }
.caret { color: var(--text-dim); font-size: 12px; cursor: pointer; }
</style>
