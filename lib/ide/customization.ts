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

  // Slider value = root font-size in px. 16px = browser default = no visual change.
  // All rem-based tokens scale proportionally (e.g. slider 18 → 12.5% larger text).
  root.style.fontSize = `${c.fontSize}px`;

  root.style.fontWeight = c.fontBold ? '600' : '';
  root.style.fontStyle = c.fontItalic ? 'italic' : '';

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
