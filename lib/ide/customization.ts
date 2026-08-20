export interface Customization {
  accentColor: string | null;
  textColor: string | null;
  fontSize: number;
  fontBold: boolean;
  fontItalic: boolean;
  uiFont: string | null;
}

export const DEFAULT_CUSTOMIZATION: Customization = {
  accentColor: null,
  textColor: null,
  fontSize: 16,
  fontBold: false,
  fontItalic: false,
  uiFont: null,
};

const KEY = 'ide_customization_v1';

export function loadCustomization(): Customization {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...DEFAULT_CUSTOMIZATION, ...JSON.parse(raw) };
  } catch {}
  return { ...DEFAULT_CUSTOMIZATION };
}

export function saveCustomization(c: Customization): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(c));
  } catch {}
}

export function hexToRgbStr(hex: string): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

const CUSTOM_THEME_VARS = [
  '--main-bg', '--bg-text', '--titlebar-bg', '--sidebar-bg', '--sidebar-hover-bg',
  '--explorer-bg', '--explorer-hover-bg', '--tabs-bg', '--tab-bg', '--tab-active-bg',
  '--tab-border', '--bottombar-bg', '--bottombar-border', '--terminal-bg',
  '--terminal-header-bg', '--article-bg', '--scrollbar-thumb-bg',
];

export function applyCustomThemeColors(accentHex: string): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const { h, s } = hexToHSL(accentHex);
  const bs = Math.min(s, 40); // cap bg saturation so deep accents don't overwhelm
  const hsl = (hv: number, sv: number, lv: number) => `hsl(${hv}, ${sv}%, ${lv}%)`;

  root.style.setProperty('--main-bg', hsl(h, bs, 7));
  root.style.setProperty('--bg-text', hsl(h, bs, 9));
  root.style.setProperty('--titlebar-bg', hsl(h, bs, 6));
  root.style.setProperty('--sidebar-bg', hsl(h, bs, 9));
  root.style.setProperty('--sidebar-hover-bg', hsl(h, bs, 13));
  root.style.setProperty('--explorer-bg', hsl(h, bs, 9));
  root.style.setProperty('--explorer-hover-bg', hsl(h, bs, 13));
  root.style.setProperty('--tabs-bg', hsl(h, bs, 8));
  root.style.setProperty('--tab-bg', hsl(h, bs, 12));
  root.style.setProperty('--tab-active-bg', hsl(h, bs, 7));
  root.style.setProperty('--tab-border', hsl(h, bs, 9));
  root.style.setProperty('--bottombar-bg', accentHex);
  root.style.setProperty('--bottombar-border', 'transparent');
  root.style.setProperty('--terminal-bg', hsl(h, bs, 7));
  root.style.setProperty('--terminal-header-bg', hsl(h, bs, 8));
  root.style.setProperty('--article-bg', hsl(h, bs, 9));
  root.style.setProperty('--scrollbar-thumb-bg', hsl(h, bs, 20));
}

export function clearCustomThemeColors(): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  CUSTOM_THEME_VARS.forEach(v => root.style.removeProperty(v));
}

function luminance(hex: string): number {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function loadGoogleFont(name: string): void {
  if (typeof document === 'undefined') return;
  const id = `gf-${name.replace(/\s+/g, '-').toLowerCase()}`;
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(name)}:wght@300;400;500;600;700&display=swap`;
  document.head.appendChild(link);
}

export function applyCustomization(c: Customization): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  if (c.accentColor) {
    root.style.setProperty('--accent-color', c.accentColor);
    root.style.setProperty('--accent-color-rgb', hexToRgbStr(c.accentColor));
    const lum = luminance(c.accentColor);
    root.style.setProperty('--button-text', lum > 0.55 ? '#000000' : '#ffffff');
    root.style.setProperty('--button-bg', c.accentColor);
  } else {
    root.style.removeProperty('--accent-color');
    root.style.removeProperty('--accent-color-rgb');
    root.style.removeProperty('--button-text');
    root.style.removeProperty('--button-bg');
  }

  if (c.textColor) {
    root.style.setProperty('--text-color', c.textColor);
  } else {
    root.style.removeProperty('--text-color');
  }

  // Font size: zoom the editor content area so ALL text scales (rem and px alike).
  // 16 = browser default = no zoom. CSS rule: #main-editor { zoom: var(--font-zoom, 1) }
  const zoom = c.fontSize / 16;
  if (zoom !== 1) {
    root.style.setProperty('--font-zoom', String(zoom));
  } else {
    root.style.removeProperty('--font-zoom');
  }

  root.style.fontWeight = c.fontBold ? '600' : '';
  root.style.fontStyle = c.fontItalic ? 'italic' : '';

  // Generate full theme colors when on custom theme
  const theme = root.getAttribute('data-theme');
  if (theme === 'custom' && c.accentColor) {
    applyCustomThemeColors(c.accentColor);
  } else if (theme !== 'custom') {
    clearCustomThemeColors();
  }

  if (c.uiFont) {
    loadGoogleFont(c.uiFont);
    root.style.setProperty('--font-ui', `"${c.uiFont}", system-ui, -apple-system, sans-serif`);
  } else {
    root.style.removeProperty('--font-ui');
  }
}

export interface FontOption {
  name: string;
  label: string;
  mono?: boolean;
}

export const UI_FONTS: FontOption[] = [
  { name: 'Inter', label: 'Inter' },
  { name: 'DM Sans', label: 'DM Sans' },
  { name: 'Outfit', label: 'Outfit' },
  { name: 'Plus Jakarta Sans', label: 'Jakarta' },
  { name: 'IBM Plex Sans', label: 'IBM Plex' },
  { name: 'Nunito', label: 'Nunito' },
  { name: 'Geist', label: 'Geist' },
  { name: 'Roboto', label: 'Roboto' },
  { name: 'Fira Code', label: 'Fira Code', mono: true },
  { name: 'Source Code Pro', label: 'Source Code', mono: true },
  { name: 'IBM Plex Mono', label: 'IBM Plex Mono', mono: true },
  { name: 'Inconsolata', label: 'Inconsolata', mono: true },
];
