// Equal-ratio scaling against a 1920x1080 design canvas
export function useScale(el: HTMLElement, designW = 1920, designH = 1080) {
  const apply = () => {
    const scale = Math.min(window.innerWidth / designW, window.innerHeight / designH)
    el.style.transform = `scale(${scale}) translate(-50%, -50%)`
  }
  apply()
  window.addEventListener('resize', apply)
  return () => window.removeEventListener('resize', apply)
}
