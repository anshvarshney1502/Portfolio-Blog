'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { VscColorMode, VscRefresh, VscCheck } from 'react-icons/vsc';

import { ALL_THEMES } from '@/lib/themes';
import {
  loadCustomization,
  saveCustomization,
  applyCustomization,
  Customization,
  DEFAULT_CUSTOMIZATION,
  UI_FONTS,
} from '@/lib/ide/customization';

import styles from '@/styles/SettingsPage.module.css';

export default function SettingsPage() {
  const [activeTheme, setActiveTheme] = useState('night-owl');
  const [c, setC] = useState<Customization>(DEFAULT_CUSTOMIZATION);
  const [isLoaded, setIsLoaded] = useState(false);
  const fontsLoaded = useRef<Set<string>>(new Set());

  useEffect(() => {
    const theme = localStorage.getItem('user_selected_theme') || 'night-owl';
    setActiveTheme(theme);
    const loaded = loadCustomization();
    setC(loaded);
    applyCustomization(loaded);
    setIsLoaded(true);
  }, []);

  const update = useCallback((patch: Partial<Customization>) => {
    setC(prev => {
      const next = { ...prev, ...patch };
      saveCustomization(next);
      applyCustomization(next);
      return next;
    });
  }, []);

  const selectTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    localStorage.setItem('user_selected_theme', theme);
    setActiveTheme(theme);
    // Re-apply color overrides so they persist on top of the new theme
    setC(prev => { applyCustomization(prev); return prev; });
  };

  const resetAll = () => {
    setC(DEFAULT_CUSTOMIZATION);
    saveCustomization(DEFAULT_CUSTOMIZATION);
    applyCustomization(DEFAULT_CUSTOMIZATION);
  };

  // Preload a font for preview in the font button
  const preloadFont = (name: string) => {
    if (fontsLoaded.current.has(name)) return;
    fontsLoaded.current.add(name);
    const id = `gf-prev-${name.replace(/\s+/g, '-').toLowerCase()}`;
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(name)}:wght@400;600&display=swap`;
    document.head.appendChild(link);
  };

  if (!isLoaded) return null;

  const hasCustomizations =
    c.accentColor !== null ||
    c.textColor !== null ||
    c.fontSize !== DEFAULT_CUSTOMIZATION.fontSize ||
    c.fontBold ||
    c.fontItalic ||
    c.uiFont !== null;

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* ── Header ─────────────────────────────────────────── */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.iconWrapper}>
              <VscColorMode size={20} />
            </div>
            <div>
              <h1 className={styles.title}>Settings</h1>
              <p className={styles.subtitle}>Customize appearance, typography, and colors.</p>
            </div>
          </div>
          {hasCustomizations && (
            <button className={styles.resetAll} onClick={resetAll}>
              <VscRefresh size={13} />
              Reset All
            </button>
          )}
        </header>

        {/* ── Color Theme ────────────────────────────────────── */}
        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>Color Theme</h2>
          <div className={styles.themesGrid}>
            {ALL_THEMES.map(t => (
              <button
                key={t.theme}
                className={`${styles.themeCard} ${activeTheme === t.theme ? styles.themeActive : ''}`}
                onClick={() => selectTheme(t.theme)}
              >
                {/* Color swatch preview */}
                {t.theme === 'custom' ? (
                  <div className={styles.customSwatch}>
                    <div className={styles.customGradientBar} />
                  </div>
                ) : (
                  <div className={styles.themeSwatch} style={{ background: t.bg }}>
                    <div
                      className={styles.swatchDots}
                      style={{ '--dot-color': t.accent } as React.CSSProperties}
                    >
                      <span /><span /><span />
                    </div>
                    <div className={styles.swatchLines}>
                      <div style={{ background: t.text, opacity: 0.7, width: '60%' }} />
                      <div style={{ background: t.accent, opacity: 0.9, width: '40%' }} />
                      <div style={{ background: t.text, opacity: 0.4, width: '75%' }} />
                    </div>
                    <div className={styles.swatchAccentBar} style={{ background: t.accent }} />
                  </div>
                )}

                <div className={styles.themeInfo}>
                  <span className={styles.themeName}>{t.name}</span>
                  <span className={styles.themePublisher}>{t.publisher}</span>
                </div>

                {activeTheme === t.theme && (
                  <div className={styles.themeCheck}>
                    <VscCheck size={11} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* ── Accent Color ───────────────────────────────────── */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionLabel}>Accent Color</h2>
            {c.accentColor && (
              <button className={styles.inlineReset} onClick={() => update({ accentColor: null })}>
                Reset
              </button>
            )}
          </div>
          <p className={styles.sectionDesc}>Override the theme accent on any color scheme.</p>
          <div className={styles.colorRow}>
            <label className={styles.colorPickerLabel}>
              <div
                className={styles.colorCircle}
                style={{ background: c.accentColor ?? 'var(--accent-color)' }}
              />
              <input
                type="color"
                value={c.accentColor ?? '#82aaff'}
                onChange={e => update({ accentColor: e.target.value })}
                className={styles.colorNativeInput}
              />
              <span className={styles.colorHex}>{c.accentColor ?? 'Theme default'}</span>
            </label>
            <div className={styles.colorPreviewRow}>
              {['#82aaff','#f9826c','#bd93f9','#e6b450','#88c0d0','#50fa7b','#ff6e6e','#ffffff'].map(hex => (
                <button
                  key={hex}
                  className={`${styles.colorChip} ${c.accentColor === hex ? styles.colorChipActive : ''}`}
                  style={{ background: hex }}
                  onClick={() => update({ accentColor: hex })}
                  aria-label={hex}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Text Color ─────────────────────────────────────── */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionLabel}>Text Color</h2>
            {c.textColor && (
              <button className={styles.inlineReset} onClick={() => update({ textColor: null })}>
                Reset
              </button>
            )}
          </div>
          <p className={styles.sectionDesc}>Override the theme text color globally.</p>
          <div className={styles.colorRow}>
            <label className={styles.colorPickerLabel}>
              <div
                className={styles.colorCircle}
                style={{ background: c.textColor ?? 'var(--text-color)' }}
              />
              <input
                type="color"
                value={c.textColor ?? '#d6deeb'}
                onChange={e => update({ textColor: e.target.value })}
                className={styles.colorNativeInput}
              />
              <span className={styles.colorHex}>{c.textColor ?? 'Theme default'}</span>
            </label>
            <div className={styles.colorPreviewRow}>
              {['#d6deeb','#cccccc','#efefef','#c0c0c0','#a8c7fa','#ffd7a8','#f8f8f2','#eceff4'].map(hex => (
                <button
                  key={hex}
                  className={`${styles.colorChip} ${c.textColor === hex ? styles.colorChipActive : ''}`}
                  style={{ background: hex }}
                  onClick={() => update({ textColor: hex })}
                  aria-label={hex}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Typography ─────────────────────────────────────── */}
        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>Typography</h2>

          {/* Font Family */}
          <div className={styles.subsection}>
            <div className={styles.sectionHead}>
              <h3 className={styles.subsectionLabel}>Font Family</h3>
              {c.uiFont && (
                <button className={styles.inlineReset} onClick={() => update({ uiFont: null })}>
                  Reset
                </button>
              )}
            </div>
            <div className={styles.fontsGrid}>
              <button
                className={`${styles.fontBtn} ${!c.uiFont ? styles.fontActive : ''}`}
                onClick={() => update({ uiFont: null })}
              >
                Default
              </button>
              {UI_FONTS.map(f => (
                <button
                  key={f.name}
                  className={`${styles.fontBtn} ${c.uiFont === f.name ? styles.fontActive : ''} ${f.mono ? styles.fontMono : ''}`}
                  onMouseEnter={() => preloadFont(f.name)}
                  onFocus={() => preloadFont(f.name)}
                  onClick={() => update({ uiFont: f.name })}
                  style={fontsLoaded.current.has(f.name) ? { fontFamily: `"${f.name}", ${f.mono ? 'monospace' : 'sans-serif'}` } : undefined}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div className={styles.subsection}>
            <div className={styles.sectionHead}>
              <h3 className={styles.subsectionLabel}>Font Size</h3>
              <span className={styles.sizeValue}>{c.fontSize}px</span>
            </div>
            <div className={styles.sliderWrapper}>
              <span className={styles.sliderMark}>11</span>
              <input
                type="range"
                min={11}
                max={18}
                step={1}
                value={c.fontSize}
                onChange={e => update({ fontSize: Number(e.target.value) })}
                className={styles.slider}
              />
              <span className={styles.sliderMark}>18</span>
            </div>
            <div className={styles.sizePreview} style={{ fontSize: `${c.fontSize}px` }}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>

          {/* Font Style */}
          <div className={styles.subsection}>
            <h3 className={styles.subsectionLabel}>Font Style</h3>
            <div className={styles.styleRow}>
              <button
                className={`${styles.styleBtn} ${c.fontBold ? styles.styleActive : ''}`}
                onClick={() => update({ fontBold: !c.fontBold })}
              >
                <strong className={styles.styleLetter}>B</strong>
                <span>Bold</span>
              </button>
              <button
                className={`${styles.styleBtn} ${c.fontItalic ? styles.styleActive : ''}`}
                onClick={() => update({ fontItalic: !c.fontItalic })}
              >
                <em className={styles.styleLetter}>I</em>
                <span>Italic</span>
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
