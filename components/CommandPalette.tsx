'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  VscGoToFile, VscSymbolColor, VscTerminal, VscGear, VscColorMode,
  VscHome, VscAccount, VscCode, VscBook, VscMail, VscGithubAlt,
} from 'react-icons/vsc';

import { useIDE } from '@/components/ide/IDEProvider';
import { ALL_THEMES as THEMES } from '@/lib/themes';
import { IDE_FILES } from '@/lib/ide/files';
import { fuzzyRank, highlightRuns } from '@/lib/ide/fuzzy';
import { PROFILE } from '@/lib/ide/profile';
import styles from '@/styles/CommandPalette.module.css';

interface Command {
  id: string;
  label: string;
  detail?: string;
  category: string;
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
}

function HighlightedText({ text, indices }: { text: string; indices: number[] }) {
  const runs = highlightRuns(text, indices);
  return (
    <>
      {runs.map((r, i) =>
        r.match ? (
          <mark key={i} style={{ background: 'transparent', color: 'var(--accent-color)', fontWeight: 600 }}>
            {r.text}
          </mark>
        ) : (
          <span key={i}>{r.text}</span>
        )
      )}
    </>
  );
}

export default function CommandPalette() {
  const router = useRouter();
  const ide = useIDE();
  const { paletteOpen, paletteMode, closePalette } = ide;

  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [showThemes, setShowThemes] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  /* Commands list */
  const allCommands = useMemo<Command[]>(() => [
    { id: 'go-home', label: 'Go to Home', detail: 'home.tsx', category: 'Navigation', shortcut: 'G H', icon: <VscHome size={15} />, action: () => router.push('/') },
    { id: 'go-about', label: 'Go to About', detail: 'about.html', category: 'Navigation', shortcut: 'G A', icon: <VscAccount size={15} />, action: () => router.push('/about') },
    { id: 'go-projects', label: 'Go to Projects', detail: 'projects.js', category: 'Navigation', shortcut: 'G P', icon: <VscCode size={15} />, action: () => router.push('/projects') },
    { id: 'go-articles', label: 'Go to Articles', detail: 'articles.json', category: 'Navigation', shortcut: 'G R', icon: <VscBook size={15} />, action: () => router.push('/articles') },
    { id: 'go-contact', label: 'Go to Contact', detail: 'contact.css', category: 'Navigation', shortcut: 'G C', icon: <VscMail size={15} />, action: () => router.push('/contact') },
    { id: 'go-github', label: 'Go to GitHub', detail: 'github.md', category: 'Navigation', shortcut: 'G G', icon: <VscGithubAlt size={15} />, action: () => router.push('/github') },
    { id: 'go-settings', label: 'Go to Settings', detail: 'settings', category: 'Navigation', shortcut: 'G S', icon: <VscGear size={15} />, action: () => router.push('/settings') },
    { id: 'go-blog', label: "Go to Coders' High Python", detail: 'blog', category: 'Navigation', icon: <VscBook size={15} />, action: () => router.push('/blogs/CodersHighPython') },
    {
      id: 'toggle-terminal', label: ide.terminalOpen ? 'Close Terminal' : 'Open Terminal',
      category: 'Terminal', shortcut: 'Ctrl+`', icon: <VscTerminal size={15} />, action: ide.toggleTerminal,
    },
    { id: 'change-theme', label: 'Change Color Theme', category: 'Preferences', shortcut: 'K T', icon: <VscSymbolColor size={15} />, action: () => setShowThemes(true) },
    { id: 'toggle-explorer', label: ide.explorerVisible ? 'Hide Explorer' : 'Show Explorer', category: 'View', shortcut: 'Ctrl+B', icon: <VscGoToFile size={15} />, action: ide.toggleExplorer },
    { id: 'toggle-sidebar', label: ide.sidebarVisible ? 'Hide Activity Bar' : 'Show Activity Bar', category: 'View', icon: <VscGear size={15} />, action: ide.toggleSidebar },
    { id: 'zen-mode', label: 'Toggle Zen Mode', category: 'View', shortcut: 'K Z', icon: <VscCode size={15} />, action: ide.toggleZen },
    { id: 'copy-email', label: 'Copy Email Address', detail: PROFILE.email, category: 'Contact', icon: <VscMail size={15} />, action: () => ide.copyToClipboard(PROFILE.email, 'email') },
    { id: 'copy-github', label: 'Copy GitHub URL', detail: PROFILE.github, category: 'Contact', icon: <VscGithubAlt size={15} />, action: () => ide.copyToClipboard(PROFILE.github, 'GitHub URL') },
    { id: 'copy-linkedin', label: 'Copy LinkedIn URL', detail: PROFILE.linkedin, category: 'Contact', icon: <VscAccount size={15} />, action: () => ide.copyToClipboard(PROFILE.linkedin, 'LinkedIn URL') },
    { id: 'sound-toggle', label: ide.soundEnabled ? 'Disable UI Sounds' : 'Enable UI Sounds', category: 'Preferences', icon: <VscGear size={15} />, action: ide.toggleSound },
  ], [router, ide]);

  /* Files list for file mode */
  const allFiles = IDE_FILES;

  const isFileMode = paletteMode === 'files';

  const rankedCommands = useMemo(
    () => fuzzyRank(query, allCommands, c => c.label, c => [c.category, c.detail ?? '']),
    [query, allCommands]
  );
  const rankedFiles = useMemo(
    () => fuzzyRank(query, allFiles, f => f.name, f => [f.label, f.language]),
    [query, allFiles]
  );
  const rankedThemes = useMemo(
    () => fuzzyRank(query, THEMES, t => t.name, t => [t.publisher]),
    [query]
  );

  const items = showThemes ? rankedThemes : isFileMode ? rankedFiles : rankedCommands;
  const count = items.length;

  const run = useCallback(
    (idx: number) => {
      const item = items[idx];
      if (!item) return;

      if (showThemes) {
        const t = rankedThemes[idx].item;
        document.documentElement.setAttribute('data-theme', t.theme);
        localStorage.setItem('theme', t.theme);
        localStorage.setItem('user_selected_theme', t.theme);
        closePalette();
        return;
      }

      if (isFileMode) {
        const f = rankedFiles[idx].item;
        router.push(f.path);
        closePalette();
        return;
      }

      const cmd = rankedCommands[idx].item;
      if (cmd.id === 'change-theme') { setShowThemes(true); return; }
      cmd.action();
      closePalette();
    },
    [items, showThemes, isFileMode, rankedThemes, rankedFiles, rankedCommands, closePalette, router]
  );

  useEffect(() => {
    if (!paletteOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showThemes) { setShowThemes(false); setQuery(''); } else closePalette();
        return;
      }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx(i => (i + 1) % count); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIdx(i => (i - 1 + count) % count); }
      if (e.key === 'Enter') { e.preventDefault(); run(selectedIdx); }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [paletteOpen, showThemes, count, selectedIdx, run, closePalette]);

  useEffect(() => {
    if (paletteOpen) {
      setQuery('');
      setSelectedIdx(0);
      setShowThemes(false);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [paletteOpen]);

  useEffect(() => setSelectedIdx(0), [query, showThemes]);

  /* Scroll selected into view */
  useEffect(() => {
    const el = listRef.current?.children[selectedIdx] as HTMLElement | undefined;
    el?.scrollIntoView({ block: 'nearest' });
  }, [selectedIdx]);

  if (!paletteOpen) return null;

  const placeholder = showThemes
    ? 'Select color theme…'
    : isFileMode
    ? 'Type a filename…'
    : 'Type a command or search…';

  return (
    <div className={styles.overlay} onMouseDown={closePalette}>
      <div className={styles.container} onMouseDown={e => e.stopPropagation()}>
        {/* Input */}
        <div className={styles.inputRow}>
          <VscGoToFile size={17} className={styles.searchIcon} />
          <input
            ref={inputRef}
            className={styles.input}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={placeholder}
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button className={styles.clearBtn} onClick={() => { setQuery(''); inputRef.current?.focus(); }}>
              ×
            </button>
          )}
        </div>

        {/* Results */}
        <div className={styles.results} ref={listRef}>
          {showThemes ? (
            rankedThemes.length === 0 ? (
              <div className={styles.empty}>No matching themes</div>
            ) : (
              <>
                <div className={styles.category}>Color Theme</div>
                {rankedThemes.map(({ item: t, indices }, i) => (
                  <button
                    key={t.theme}
                    type="button"
                    className={`${styles.item} ${selectedIdx === i ? styles.selected : ''}`}
                    onClick={() => { setSelectedIdx(i); run(i); }}
                    onMouseEnter={() => setSelectedIdx(i)}
                  >
                    <span className={styles.itemIcon}><VscColorMode size={15} /></span>
                    <span className={styles.itemLabel}>
                      <HighlightedText text={t.name} indices={indices} />
                    </span>
                    <span className={styles.itemDetail}>{t.publisher}</span>
                  </button>
                ))}
              </>
            )
          ) : isFileMode ? (
            rankedFiles.length === 0 ? (
              <div className={styles.empty}>No matching files</div>
            ) : (
              rankedFiles.map(({ item: f, indices }, i) => (
                <button
                  key={f.path}
                  type="button"
                  className={`${styles.item} ${selectedIdx === i ? styles.selected : ''}`}
                  onClick={() => run(i)}
                  onMouseEnter={() => setSelectedIdx(i)}
                >
                  <span className={styles.itemIcon}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.icon} alt="" width={15} height={15} />
                  </span>
                  <span className={styles.itemLabel}>
                    <HighlightedText text={f.name} indices={indices} />
                  </span>
                  <span className={styles.itemDetail}>{f.language}</span>
                </button>
              ))
            )
          ) : rankedCommands.length === 0 ? (
            <div className={styles.empty}>No matching commands</div>
          ) : (
            (() => {
              let lastCat = '';
              return rankedCommands.map(({ item: cmd, indices }, i) => {
                const showCat = cmd.category !== lastCat;
                lastCat = cmd.category;
                return (
                  <div key={cmd.id}>
                    {showCat && <div className={styles.category}>{cmd.category}</div>}
                    <button
                      type="button"
                      className={`${styles.item} ${selectedIdx === i ? styles.selected : ''}`}
                      onClick={() => run(i)}
                      onMouseEnter={() => setSelectedIdx(i)}
                    >
                      <span className={styles.itemIcon}>{cmd.icon}</span>
                      <span className={styles.itemLabel}>
                        <HighlightedText text={cmd.label} indices={indices} />
                      </span>
                      {cmd.shortcut && (
                        <span className={styles.shortcut}>
                          {cmd.shortcut.split(' ').map((k, ki) => (
                            <kbd key={ki} className={styles.key}>{k}</kbd>
                          ))}
                        </span>
                      )}
                    </button>
                  </div>
                );
              });
            })()
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <span className={styles.footerHint}><kbd className={styles.key}>↑↓</kbd> navigate</span>
          <span className={styles.footerHint}><kbd className={styles.key}>↵</kbd> select</span>
          <span className={styles.footerHint}><kbd className={styles.key}>esc</kbd> close</span>
          {isFileMode && <span className={styles.footerMode}>FILE MODE</span>}
        </div>
      </div>
    </div>
  );
}
