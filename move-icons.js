// Chess move classification icons (chess.com style).
// Each icon: 24x24 viewBox, white glyph, drawn on a filled circle of `color`.
// Badge: circle 46px, background = color, box-shadow: 0 3px 0 rgba(0,0,0,.3), svg 30px centered.
const MOVE_ICONS = {
  brilliant: { color: '#1baca6', svg: `<rect x="5.199999999999999" y="3.4" width="4.8" height="12" rx="1.3" fill="#fff"/><circle cx="7.6" cy="19.7" r="2.5" fill="#fff"/><rect x="13.999999999999998" y="3.4" width="4.8" height="12" rx="1.3" fill="#fff"/><circle cx="16.4" cy="19.7" r="2.5" fill="#fff"/>` },
  great: { color: '#5c8bb0', svg: `<rect x="9.3" y="3.4" width="5.4" height="12" rx="1.3" fill="#fff"/><circle cx="12" cy="19.7" r="2.8000000000000003" fill="#fff"/>` },
  book: { color: '#a88865', svg: `<polygon points="2.5,5.5 11,7.8 11,20.5 2.5,18.2" fill="#fff"/><polygon points="21.5,5.5 13,7.8 13,20.5 21.5,18.2" fill="#fff"/>` },
  best: { color: '#81b64c', svg: `<polygon points="12,2.8 14.9,9 21.8,9.8 16.7,14.4 18.1,21.2 12,17.8 5.9,21.2 7.3,14.4 2.2,9.8 9.1,9" fill="#fff" stroke="#fff" stroke-width="1.6" stroke-linejoin="miter"/>` },
  excellent: { color: '#96bc4b', svg: `<polygon points="2.5,10.5 7.5,10.5 7.5,21 2.5,21" fill="#fff"/><polygon points="9.5,10.5 13,2.5 16.2,3.2 15.4,9 21.8,9 21.8,12 20.2,19.8 9.5,21" fill="#fff"/>` },
  good: { color: '#96af8b', svg: `<polygon points="2.5,12.6 6,9.1 10,13.1 18,5.1 21.5,8.6 10,20.1" fill="#fff"/>` },
  inaccuracy: { color: '#f7c631', svg: `<g transform="translate(0 1.5) scale(.8)"><path d="M6.6 8.4C6.6 2.8 17.4 2.8 17.4 8.2C17.4 12.4 12 11.8 12 15.4" fill="none" stroke="#fff" stroke-linejoin="round" stroke-linecap="butt" stroke-width="4.6"/><circle cx="12" cy="19.7" r="2.4" fill="#fff"/></g><g transform="translate(0 1.5) scale(.8)"><rect x="20.7" y="3.4" width="4.6" height="12" rx="1.3" fill="#fff"/><circle cx="23" cy="19.7" r="2.4" fill="#fff"/></g>` },
  mistake: { color: '#ffa459', svg: `<path d="M6.6 8.4C6.6 2.8 17.4 2.8 17.4 8.2C17.4 12.4 12 11.8 12 15.4" fill="none" stroke="#fff" stroke-linejoin="round" stroke-linecap="butt" stroke-width="4.6"/><circle cx="12" cy="19.7" r="2.4" fill="#fff"/>` },
  miss: { color: '#ff7769', svg: `<path d="M5 5L19 19M19 5L5 19" stroke="#fff" stroke-width="5" stroke-linecap="square" fill="none"/>` },
  blunder: { color: '#fa412d', svg: `<g transform="translate(-0.6 4.6) scale(.62)"><path d="M6.6 8.4C6.6 2.8 17.4 2.8 17.4 8.2C17.4 12.4 12 11.8 12 15.4" fill="none" stroke="#fff" stroke-linejoin="round" stroke-linecap="butt" stroke-width="5.8"/><circle cx="12" cy="19.7" r="2.4" fill="#fff"/></g><g transform="translate(11.4 4.6) scale(.62)"><path d="M6.6 8.4C6.6 2.8 17.4 2.8 17.4 8.2C17.4 12.4 12 11.8 12 15.4" fill="none" stroke="#fff" stroke-linejoin="round" stroke-linecap="butt" stroke-width="5.8"/><circle cx="12" cy="19.7" r="2.4" fill="#fff"/></g>` },
};

function badgeHTML(key, size = 46, extraClassOrOptions = '') {
  const rawKey = String(key || 'best').trim();
  const lowerKey = rawKey.toLowerCase();
  const iconDef = MOVE_ICONS[lowerKey] || MOVE_ICONS.best;
  const s = Number(size) || 46;
  const svgSize = Math.max(8, Math.round(s * 0.65));
  const shadowY = Math.max(1, Math.round(s * (3 / 46)));

  let cls = '';
  let extraAttrs = '';
  if (typeof extraClassOrOptions === 'string') {
    cls = extraClassOrOptions;
  } else if (extraClassOrOptions && typeof extraClassOrOptions === 'object') {
    cls = extraClassOrOptions.class || extraClassOrOptions.className || '';
    if (extraClassOrOptions.title) {
      const escapedTitle = String(extraClassOrOptions.title)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      extraAttrs += ` title="${escapedTitle}"`;
    }
  }
  const clsAttr = cls ? ` class="${cls}"` : '';
  return `<span${clsAttr}${extraAttrs} style="width:${s}px;height:${s}px;min-width:${s}px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:${iconDef.color};box-shadow:0 ${shadowY}px 0 rgba(0,0,0,.3);flex-shrink:0;"><svg width="${svgSize}" height="${svgSize}" viewBox="0 0 24 24" aria-hidden="true" style="display:block;flex-shrink:0;">${iconDef.svg}</svg></span>`;
}

if (typeof window !== 'undefined') {
  window.MOVE_ICONS = MOVE_ICONS;
  window.badgeHTML = badgeHTML;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MOVE_ICONS,
    badgeHTML
  };
}
