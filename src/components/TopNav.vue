<template>
  <header class="topnav">
    <!-- clock far left -->
    <div class="clock">
      <span class="t font-num">08:58</span>
      <span class="d">07 - 04 - 2024</span>
      <span class="sep">|</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffd24d"><circle cx="12" cy="12" r="5"/><g stroke="#ffd24d" stroke-width="2"><line x1="12" y1="1" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="23"/><line x1="1" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="23" y2="12"/></g></svg>
      <span class="w">25℃~28℃</span>
    </div>

    <!-- centered nav cluster -->
    <div class="frame">
      <nav class="grp">
        <span class="nav-item active">POPULATION</span>
        <span class="nav-item">ECONOMICS</span>
        <div class="brand">
          <svg class="logo" width="28" height="28" viewBox="0 0 24 24" fill="none">
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
        <span class="nav-item">COMMAND</span>
        <span class="nav-item">ECOLOGY</span>
      </nav>
    </div>

    <!-- user far right -->
    <div class="user">
      <div class="avatar">
        <span class="badge">8</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#38d6ff"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>
      </div>
      <span class="uname">Jacky001</span>
      <span class="caret">▾</span>
    </div>
  </header>
</template>

<style scoped>
.topnav { position: relative; height: 72px; flex-shrink: 0; }
.clock { position: absolute; left: 6px; top: 16px; display: flex; align-items: center; gap: 9px; color: var(--text-dim); font-size: 14px; }
.clock .t { font-size: 17px; color: #fff; font-weight: 700; }
.clock .sep { color: var(--text-mute); }
.clock .w { color: var(--cyan); }

.frame {
  position: absolute; left: 50%; top: 0; transform: translateX(-50%);
  width: 1320px; height: 64px;
  background: linear-gradient(180deg, rgba(20,52,140,0.55), rgba(10,24,80,0.25));
  clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
  border-bottom: 2px solid rgba(56,214,255,0.5);
  display: flex; align-items: center; justify-content: center;
}
.grp { display: flex; align-items: center; gap: 40px; }
.nav-item {
  font-size: 17px; font-weight: 600; letter-spacing: 1.5px; color: var(--text-dim);
  cursor: pointer; transition: color .2s, text-shadow .2s;
}
.nav-item:hover { color: var(--cyan); }
.nav-item.active { color: #fff; text-shadow: 0 0 10px rgba(56,214,255,0.7); }
.brand { display: flex; align-items: center; gap: 10px; padding: 0 8px; }
.title {
  font-size: 27px; font-weight: 700; letter-spacing: 2.5px; white-space: nowrap;
  background: linear-gradient(180deg, #ffffff 30%, #8fd4ff 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  text-shadow: 0 0 18px rgba(56,214,255,0.35);
}
.user { position: absolute; right: 8px; top: 16px; display: flex; align-items: center; gap: 10px; color: var(--text); }
.avatar { position: relative; width: 32px; height: 32px; border-radius: 50%; border: 1px solid rgba(56,214,255,0.5); display: flex; align-items: center; justify-content: center; background: rgba(20,52,140,0.5); }
.badge { position: absolute; top: -5px; right: -5px; min-width: 16px; height: 16px; background: var(--orange); color: #1a0d00; font-size: 10px; font-weight: 700; border-radius: 8px; display: flex; align-items: center; justify-content: center; padding: 0 4px; }
.uname { font-size: 15px; font-weight: 600; }
.caret { color: var(--text-dim); font-size: 12px; cursor: pointer; }
</style>
