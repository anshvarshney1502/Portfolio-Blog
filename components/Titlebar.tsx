'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import MenuPanel, { type MenuItem } from '@/components/ide/MenuPanel';
import { useIDE } from '@/components/ide/IDEProvider';
import { IDE_FILES, getFile } from '@/lib/ide/files';
import { PROFILE } from '@/lib/ide/profile';
import { dispatchTerminal } from '@/lib/ide/terminalBus';
import styles from '@/styles/Titlebar.module.css';

/*
 * The menu bar.
 *
 * On most VS Code–themed portfolios these seven words are decoration. Making
 * them real is the single change that most convinces someone they are using an
 * application: the first thing a curious visitor does is click "File", and
 * either something happens or the illusion ends there.
 */

const MENUS = ['File', 'Edit', 'View', 'Go', 'Run', 'Terminal', 'Help'] as const;
type MenuName = (typeof MENUS)[number];

export default function Titlebar() {
  const router = useRouter();
  const ide = useIDE();
  const [open, setOpen] = useState<MenuName | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(null), []);

  /* Resume flows -------------------------------------------------------- */
  const downloadResume = useCallback(() => {
    const a = document.createElement('a');
    a.href = '/resume.pdf';
    a.download = 'Ansh_Varshney_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    ide.notify('Downloading resume…', { tone: 'success' });
  }, [ide]);

  const printResume = useCallback(() => {
    const win = window.open('/resume.pdf', '_blank');
    if (!win) ide.notify('Allow pop-ups to print', { tone: 'error' });
  }, [ide]);

  const sharePortfolio = useCallback(() => {
    const url = 'https://anshvarshneyportfolio-blog.vercel.app/';
    if (navigator.share) {
      navigator
        .share({ title: `${PROFILE.name} — Portfolio`, url })
        .catch(() => ide.copyToClipboard(url, 'portfolio link'));
    } else {
      ide.copyToClipboard(url, 'portfolio link');
    }
  }, [ide]);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void document.documentElement.requestFullscreen().catch(() => {
        ide.notify('Fullscreen was blocked by the browser', { tone: 'error' });
      });
    }
  }, [ide]);

  /* Menu definitions ---------------------------------------------------- */

  const menus = useMemo<Record<MenuName, MenuItem[]>>(() => {
    const recentItems: MenuItem[] =
      ide.recent.length > 0
        ? ide.recent.map((path) => ({
            label: getFile(path)?.name ?? path,
            onSelect: () => ide.openFile(path),
          }))
        : [{ label: 'No recent files', disabled: true }];

    return {
      File: [
        { label: 'Download Resume', shortcut: '⌘S', onSelect: downloadResume },
        { label: 'Print Resume', shortcut: '⌘P', onSelect: printResume },
        { label: 'Export as PDF', onSelect: downloadResume },
        { type: 'separator' },
        { label: 'Share Portfolio', onSelect: sharePortfolio },
        { label: 'Recent Files', submenu: recentItems },
        { type: 'separator' },
        { label: 'Settings', shortcut: 'G S', onSelect: () => ide.openFile('/settings') },
      ],
      Edit: [
        { label: 'Undo', shortcut: '⌘Z', onSelect: () => router.back() },
        { label: 'Redo', shortcut: '⇧⌘Z', onSelect: () => router.forward() },
        { type: 'separator' },
        {
          label: 'Copy Email',
          onSelect: () => ide.copyToClipboard(PROFILE.email, 'email'),
        },
        {
          label: 'Copy GitHub',
          onSelect: () => ide.copyToClipboard(PROFILE.github, 'GitHub URL'),
        },
        {
          label: 'Copy LinkedIn',
          onSelect: () => ide.copyToClipboard(PROFILE.linkedin, 'LinkedIn URL'),
        },
        { type: 'separator' },
        { label: 'Find File…', shortcut: '⌘P', onSelect: () => ide.openPalette('files') },
        // Nothing on the page is editable, so offering Replace would be a lie.
        // VS Code greys out inapplicable commands too.
        { label: 'Replace', disabled: true },
        { type: 'separator' },
        { label: 'Preferences', onSelect: () => ide.openFile('/settings') },
      ],
      View: [
        {
          label: 'Command Palette…',
          shortcut: '⇧⌘P',
          onSelect: () => ide.openPalette('commands'),
        },
        { type: 'separator' },
        { label: 'Zen Mode', shortcut: '⌘K Z', checked: ide.zenMode, onSelect: ide.toggleZen },
        {
          label: 'Presentation Mode',
          checked: ide.presentationMode,
          onSelect: ide.togglePresentation,
        },
        { label: 'Fullscreen', shortcut: 'F11', onSelect: toggleFullscreen },
        { type: 'separator' },
        {
          label: 'Show Activity Bar',
          checked: ide.sidebarVisible,
          onSelect: ide.toggleSidebar,
        },
        {
          label: 'Show Explorer',
          shortcut: '⌘B',
          checked: ide.explorerVisible,
          onSelect: ide.toggleExplorer,
        },
        { label: 'Show Minimap', checked: ide.minimapVisible, onSelect: ide.toggleMinimap },
        {
          label: 'Show Status Bar',
          checked: ide.statusbarVisible,
          onSelect: ide.toggleStatusbar,
        },
        {
          label: 'Show Terminal',
          shortcut: '⌘`',
          checked: ide.terminalOpen,
          onSelect: ide.toggleTerminal,
        },
      ],
      Go: IDE_FILES.map((file) => ({
        label: `Go to ${file.label}`,
        onSelect: () => ide.openFile(file.path),
      })),
      Run: [
        {
          label: 'Run Portfolio',
          shortcut: 'F5',
          onSelect: () => {
            ide.setTerminalOpen(true);
            dispatchTerminal({ kind: 'run', command: 'build' });
          },
        },
        { label: 'Preview Resume', onSelect: () => ide.openFile('/about') },
        { label: 'Launch Demo', onSelect: () => ide.openFile('/projects') },
        { type: 'separator' },
        {
          label: 'Simulate Deploy',
          onSelect: () => {
            ide.setTerminalOpen(true);
            dispatchTerminal({ kind: 'run', command: 'deploy' });
          },
        },
      ],
      Terminal: [
        {
          label: 'New Terminal',
          shortcut: '⌃⇧`',
          onSelect: () => {
            ide.setTerminalOpen(true);
            dispatchTerminal({ kind: 'new' });
          },
        },
        {
          label: 'Split Terminal',
          shortcut: '⌘\\',
          onSelect: () => {
            ide.setTerminalOpen(true);
            dispatchTerminal({ kind: 'split' });
          },
        },
        { type: 'separator' },
        {
          label: 'Clear Terminal',
          onSelect: () => {
            ide.setTerminalOpen(true);
            dispatchTerminal({ kind: 'clear' });
          },
        },
        {
          label: ide.terminalOpen ? 'Close Terminal' : 'Open Terminal',
          shortcut: '⌘`',
          onSelect: ide.toggleTerminal,
        },
      ],
      Help: [
        {
          label: 'Keyboard Shortcuts',
          shortcut: '⌘K ⌘S',
          onSelect: () => ide.setShortcutsOpen(true),
        },
        { label: `About ${PROFILE.name}`, onSelect: () => ide.setAboutOpen(true) },
        { label: `Version ${PROFILE.version}`, disabled: true },
        { type: 'separator' },
        {
          label: 'Credits',
          onSelect: () =>
            ide.notify('Built with Next.js, React and CSS Modules', {
              detail: 'Design inspired by Visual Studio Code',
            }),
        },
        {
          label: 'Report Issue',
          onSelect: () => window.open(`${PROFILE.repo}/issues/new`, '_blank', 'noopener'),
        },
        {
          label: 'View Source',
          onSelect: () => window.open(PROFILE.repo, '_blank', 'noopener'),
        },
      ],
    };
  }, [ide, router, downloadResume, printResume, sharePortfolio, toggleFullscreen]);

  /* Dismissal ----------------------------------------------------------- */

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (barRef.current?.contains(e.target as Node)) return;
      close();
    };
    window.addEventListener('mousedown', onDown);
    window.addEventListener('blur', close);
    return () => {
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('blur', close);
    };
  }, [open, close]);

  const activeName = ide.activeFile?.name;

  return (
    <section className={styles.titlebar}>
      <div className={styles.left}>
        <Image
          src="/logos/vscode_icon.svg"
          alt=""
          height={16}
          width={16}
          className={styles.icon}
          priority
        />
        <div className={styles.items} ref={barRef}>
          {MENUS.map((name) => (
            <div key={name} className={styles.menuHost}>
              <button
                type="button"
                className={`${styles.menuButton} ${open === name ? styles.menuOpen : ''}`}
                aria-haspopup="menu"
                aria-expanded={open === name}
                onClick={() => setOpen((prev) => (prev === name ? null : name))}
                // Once a menu is open, sliding across the bar should switch
                // menus without another click — that is how native menu bars
                // behave and its absence is immediately noticeable.
                onMouseEnter={() => open && setOpen(name)}
              >
                {name}
              </button>
              {open === name && <MenuPanel items={menus[name]} onClose={close} />}
            </div>
          ))}
        </div>
      </div>

      <p className={styles.title}>
        {activeName && <span className={styles.titleFile}>{activeName}</span>}
        {activeName && <span className={styles.titleSep}>—</span>}
        <span>{PROFILE.name}</span>
        <span className={styles.titleSep}>—</span>
        <span className={styles.titleApp}>Visual Studio Code</span>
      </p>

      <div className={styles.right}>
        <div className={styles.windowButtons}>
          <button
            className={`${styles.dot} ${styles.minimize}`}
            title="Zen Mode"
            aria-label="Toggle Zen Mode"
            onClick={ide.toggleZen}
          />
          <button
            className={`${styles.dot} ${styles.maximize}`}
            title="Toggle Fullscreen"
            aria-label="Toggle Fullscreen"
            onClick={toggleFullscreen}
          />
          <button
            className={`${styles.dot} ${styles.close}`}
            title="Close"
            aria-label="Close"
            onClick={() =>
              ide.notify('This window does not close', {
                detail: "Try 'sudo hire-ansh' in the terminal instead",
              })
            }
          />
        </div>
      </div>
    </section>
  );
}
