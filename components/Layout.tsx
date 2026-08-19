'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { IDEProvider, useIDE } from '@/components/ide/IDEProvider';
import Titlebar from '@/components/Titlebar';
import Sidebar from '@/components/Sidebar';
import Explorer from '@/components/Explorer';
import Bottombar from '@/components/Bottombar';
import Tabsbar from '@/components/Tabsbar';
import Terminal from '@/components/Terminal';
import CommandPalette from '@/components/CommandPalette';
import ChatPanel from '@/components/ChatPanel';
import Toasts from '@/components/ide/Toasts';

import styles from '@/styles/Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

/* Inner shell — has access to IDEProvider context */
function IDEShell({ children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const ide = useIDE();

  /* Scroll-to-top on page change */
  useEffect(() => {
    const main = document.getElementById('main-editor');
    if (main) main.scrollTop = 0;
  }, [pathname]);

  /* Global keyboard shortcuts */
  useEffect(() => {
    const navigationRoutes: Record<string, string> = {
      h: '/',
      a: '/about',
      p: '/projects',
      r: '/articles',
      c: '/contact',
      g: '/github',
      s: '/settings',
    };

    let chordKey: string | null = null;
    let chordTimer: ReturnType<typeof setTimeout> | null = null;

    const clearChord = () => {
      chordKey = null;
      if (chordTimer) { clearTimeout(chordTimer); chordTimer = null; }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (ide.paletteOpen) return;
      const target = e.target as Element;
      const inInput = target.closest('input, textarea, [contenteditable]');

      /* Ctrl/Cmd shortcuts */
      if (e.ctrlKey || e.metaKey) {
        if (e.key === '`') { e.preventDefault(); ide.toggleTerminal(); return; }
        if (e.shiftKey && e.key.toLowerCase() === 'p') { e.preventDefault(); ide.openPalette('commands'); return; }
        if (!e.shiftKey && e.key.toLowerCase() === 'p') { e.preventDefault(); ide.openPalette('files'); return; }
        if (e.key.toLowerCase() === 'b') { e.preventDefault(); ide.toggleExplorer(); return; }
      }

      if (e.key === 'Escape' && ide.terminalOpen) { ide.setTerminalOpen(false); return; }
      if (e.key === 'F11') { e.preventDefault();
        if (document.fullscreenElement) void document.exitFullscreen();
        else void document.documentElement.requestFullscreen();
        return;
      }

      if (inInput) return;

      const key = e.key.toLowerCase();

      /* Two-key chord navigation: G → letter */
      if (chordKey === 'g') {
        if (navigationRoutes[key]) {
          e.preventDefault();
          router.push(navigationRoutes[key]);
          clearChord();
          return;
        }
        clearChord();
      }

      /* K → T opens command palette */
      if (chordKey === 'k') {
        if (key === 't') { e.preventDefault(); ide.openPalette('commands'); clearChord(); return; }
        if (key === 'z') { e.preventDefault(); ide.toggleZen(); clearChord(); return; }
        clearChord();
      }

      if (key === 'g' || key === 'k') {
        e.preventDefault();
        chordKey = key;
        chordTimer = setTimeout(clearChord, 2000);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (chordTimer) clearTimeout(chordTimer);
    };
  }, [ide, router]);

  const { zenMode, explorerVisible, sidebarVisible, statusbarVisible, terminalOpen, chatOpen } = ide;

  return (
    <div
      className={`${styles.layout} ${zenMode ? styles.zen : ''}`}
      data-sidebar={sidebarVisible ? 'visible' : 'hidden'}
      data-explorer={explorerVisible ? 'visible' : 'hidden'}
    >
      {!zenMode && <Titlebar />}
      <div className={styles.main}>
        {sidebarVisible && <Sidebar />}
        {explorerVisible && <Explorer />}
        <div className={styles.editorContainer} style={{ minWidth: 0, flex: 1 }}>
          {!zenMode && <Tabsbar />}
          <div className={styles.editorWithTerminal}>
            <main id="main-editor" className={styles.content}>
              <div key={pathname} className={styles.pageWrapper}>
                {children}
              </div>
            </main>
            {/* Keep terminal mounted to preserve history; CSS hides it when closed */}
            <div className={terminalOpen ? undefined : styles.terminalHidden}>
              <Terminal />
            </div>
          </div>
        </div>
        {chatOpen && !zenMode && <ChatPanel />}
      </div>
      {statusbarVisible && !zenMode && <Bottombar />}
      <CommandPalette />
      <Toasts />
    </div>
  );
}

/* Outer wrapper that provides the context */
export default function Layout({ children }: LayoutProps) {
  return (
    <IDEProvider>
      <IDEShell>{children}</IDEShell>
    </IDEProvider>
  );
}
