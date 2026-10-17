export function getPlaceholderSvg(name: string, category: string, bg: string, accent: string): string {
  const icon = category === "pizzas" ? "🍕" : category === "sides" ? "🥖" : "🥤"
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <defs>
      <radialGradient id="g" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="${bg}" stop-opacity="1"/>
      </radialGradient>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.05 0"/>
      </filter>
    </defs>
    <rect width="800" height="600" fill="${bg}"/>
    <rect width="800" height="600" fill="url(#g)"/>
    <rect width="800" height="600" filter="url(#noise)"/>
    <circle cx="400" cy="270" r="140" fill="${accent}" fill-opacity="0.2" stroke="${accent}" stroke-width="2" stroke-dasharray="6 6"/>
    <text x="400" y="295" font-family="system-ui, -apple-system, sans-serif" font-size="96" text-anchor="middle">${icon}</text>
    <text x="400" y="470" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="-0.02em">${name}</text>
    <text x="400" y="515" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="500" fill="#E0D6CE" text-anchor="middle" letter-spacing="0.08em">HVD PIZZAS • SANGHIPURAM</text>
  </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}
