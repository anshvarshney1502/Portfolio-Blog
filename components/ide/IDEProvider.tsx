'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';

import {
  DEFAULT_OPEN_TABS,
  getFile,
  normalizePath,
  type IDEFile,
} from '@/lib/ide/files';
import { playSound, setSoundEnabled } from '@/lib/ide/sound';

/*
 * The IDE shell's shared state.
 *
 * Tabs, panel visibility and preferences were previously scattered across the
 * components that rendered them, which made anything cross-cutting — a menu
 * item that closes the terminal, a command that pins a file — impossible to
 * write. Everything that more than one piece of chrome needs to agree on lives
 * here.
 */

export type PaletteMode = 'commands' | 'files';

export interface Toast {
  id: number;
  message: string;
  detail?: string;
  tone: 'info' | 'success' | 'error';
}

interface IDEContextValue {
  // ---- tabs ----
  tabs: string[];
  pinned: string[];
  activePath: string;
  activeFile: IDEFile | undefined;
  openFile: (path: string) => void;
  closeTab: (path: string) => void;
  closeOtherTabs: (path: string) => void;
  closeAllTabs: () => void;
  togglePin: (path: string) => void;
  isPinned: (path: string) => boolean;
  reopenDefaults: () => void;

  // ---- recents ----
  recent: string[];
  /** Every file opened at least once, so chrome can mark what's unseen. */
  visited: string[];

  // ---- panels ----
  explorerVisible: boolean;
  sidebarVisible: boolean;
  statusbarVisible: boolean;
  minimapVisible: boolean;
  terminalOpen: boolean;
  toggleExplorer: () => void;
  toggleSidebar: () => void;
  toggleStatusbar: () => void;
  toggleMinimap: () => void;
  toggleTerminal: () => void;
  setTerminalOpen: (open: boolean) => void;

  // ---- modes ----
  zenMode: boolean;
  presentationMode: boolean;
  toggleZen: () => void;
  togglePresentation: () => void;

  // ---- overlays ----
  paletteOpen: boolean;
  paletteMode: PaletteMode;
  openPalette: (mode?: PaletteMode) => void;
  closePalette: () => void;
  shortcutsOpen: boolean;
  setShortcutsOpen: (open: boolean) => void;
  aboutOpen: boolean;
  setAboutOpen: (open: boolean) => void;

  // ---- feedback ----
  toasts: Toast[];
  notify: (message: string, opts?: { detail?: string; tone?: Toast['tone'] }) => void;
  dismissToast: (id: number) => void;
  copyToClipboard: (text: string, label: string) => void;

  // ---- preferences ----
  soundEnabled: boolean;
  toggleSound: () => void;

  // ---- misc ----
  playUISound: typeof playSound;
}

const IDEContext = createContext<IDEContextValue | null>(null);

export function useIDE() {
  const ctx = useContext(IDEContext);
  if (!ctx) throw new Error('useIDE must be used inside <IDEProvider>');
  return ctx;
}

const STORAGE_KEY = 'ide_workspace_v1';

interface PersistedState {
  tabs?: string[];
  pinned?: string[];
  recent?: string[];
  visited?: string[];
  sound?: boolean;
  explorer?: boolean;
  sidebar?: boolean;
  statusbar?: boolean;
  minimap?: boolean;
}

export function IDEProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const activePath = normalizePath(pathname);

  const [tabs, setTabs] = useState<string[]>(DEFAULT_OPEN_TABS);
  const [pinned, setPinned] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [visited, setVisited] = useState<string[]>([]);

  const [explorerVisible, setExplorerVisible] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [statusbarVisible, setStatusbarVisible] = useState(true);
  const [minimapVisible, setMinimapVisible] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  const [zenMode, setZenMode] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteMode, setPaletteMode] = useState<PaletteMode>('commands');
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [soundEnabled, setSoundState] = useState(false);

  const toastId = useRef(0);
  const hydrated = useRef(false);

  /* ------------------------------------------------------------ storage -- */
  // Reading localStorage during render would mismatch the server HTML, so the
  // first paint always uses defaults and this fills in immediately after.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: PersistedState = JSON.parse(raw);
        if (saved.tabs?.length) setTabs(saved.tabs);
        if (saved.pinned) setPinned(saved.pinned);
        if (saved.recent) setRecent(saved.recent);
        if (saved.visited) setVisited(saved.visited);
        if (typeof saved.sound === 'boolean') {
          setSoundState(saved.sound);
          setSoundEnabled(saved.sound);
        }
        if (typeof saved.explorer === 'boolean') setExplorerVisible(saved.explorer);
        if (typeof saved.sidebar === 'boolean') setSidebarVisible(saved.sidebar);
        if (typeof saved.statusbar === 'boolean') setStatusbarVisible(saved.statusbar);
        if (typeof saved.minimap === 'boolean') setMinimapVisible(saved.minimap);
      }
    } catch {
      /* corrupted or unavailable storage just means defaults */
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    const payload: PersistedState = {
      tabs,
      pinned,
      recent,
      visited,
      sound: soundEnabled,
      explorer: explorerVisible,
      sidebar: sidebarVisible,
      statusbar: statusbarVisible,
      minimap: minimapVisible,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* private mode — preferences just won't persist */
    }
  }, [
    tabs,
    pinned,
    recent,
    visited,
    soundEnabled,
    explorerVisible,
    sidebarVisible,
    statusbarVisible,
    minimapVisible,
  ]);

  /* -------------------------------------------------------------- tabs -- */

  // Landing directly on a URL whose tab was closed should reopen it rather
  // than leave the tab bar disagreeing with the editor.
  useEffect(() => {
    if (!getFile(activePath)) return;
    setTabs((prev) => (prev.includes(activePath) ? prev : [...prev, activePath]));
    setRecent((prev) => [activePath, ...prev.filter((p) => p !== activePath)].slice(0, 6));
    setVisited((prev) => (prev.includes(activePath) ? prev : [...prev, activePath]));
  }, [activePath]);

  const openFile = useCallback(
    (path: string) => {
      playSound('click');
      router.push(path);
    },
    [router]
  );

  const closeTab = useCallback(
    (path: string) => {
      setTabs((prev) => {
        const index = prev.indexOf(path);
        if (index === -1) return prev;
        const next = prev.filter((p) => p !== path);

        // Closing the tab you are looking at should land you on its neighbour,
        // the way an editor does — not on a blank screen.
        if (path === activePath && next.length) {
          const fallback = next[Math.min(index, next.length - 1)];
          router.push(fallback);
        }
        return next;
      });
      setPinned((prev) => prev.filter((p) => p !== path));
      playSound('close');
    },
    [activePath, router]
  );

  const closeOtherTabs = useCallback(
    (path: string) => {
      setTabs((prev) => prev.filter((p) => p === path || pinned.includes(p)));
      if (activePath !== path) router.push(path);
      playSound('close');
    },
    [activePath, pinned, router]
  );

  const closeAllTabs = useCallback(() => {
    setTabs((prev) => prev.filter((p) => pinned.includes(p)));
    playSound('close');
  }, [pinned]);

  const togglePin = useCallback((path: string) => {
    setPinned((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
    playSound('click');
  }, []);

  const isPinned = useCallback((path: string) => pinned.includes(path), [pinned]);

  const reopenDefaults = useCallback(() => {
    setTabs(DEFAULT_OPEN_TABS);
    playSound('open');
  }, []);

  /* ------------------------------------------------------------ panels -- */

  const toggleExplorer = useCallback(() => {
    setExplorerVisible((v) => !v);
    playSound('click');
  }, []);
  const toggleSidebar = useCallback(() => {
    setSidebarVisible((v) => !v);
    playSound('click');
  }, []);
  const toggleStatusbar = useCallback(() => setStatusbarVisible((v) => !v), []);
  const toggleMinimap = useCallback(() => setMinimapVisible((v) => !v), []);
  const toggleTerminal = useCallback(() => {
    setTerminalOpen((v) => {
      playSound(v ? 'close' : 'open');
      return !v;
    });
  }, []);

  const toggleZen = useCallback(() => {
    setZenMode((v) => {
      const next = !v;
      if (!next) setPresentationMode(false);
      playSound(next ? 'open' : 'close');
      return next;
    });
  }, []);

  const togglePresentation = useCallback(() => {
    setPresentationMode((v) => {
      const next = !v;
      setZenMode(next);
      playSound(next ? 'open' : 'close');
      return next;
    });
  }, []);

  /* ---------------------------------------------------------- overlays -- */

  const openPalette = useCallback((mode: PaletteMode = 'commands') => {
    setPaletteMode(mode);
    setPaletteOpen(true);
    playSound('open');
  }, []);

  const closePalette = useCallback(() => {
    setPaletteOpen(false);
    playSound('close');
  }, []);

  /* ---------------------------------------------------------- feedback -- */

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    (message: string, opts?: { detail?: string; tone?: Toast['tone'] }) => {
      const id = ++toastId.current;
      const tone = opts?.tone ?? 'info';
      setToasts((prev) => [...prev, { id, message, detail: opts?.detail, tone }]);
      playSound(tone === 'error' ? 'error' : 'notify');
      window.setTimeout(() => dismissToast(id), 4000);
    },
    [dismissToast]
  );

  const copyToClipboard = useCallback(
    (text: string, label: string) => {
      const done = () => notify(`Copied ${label}`, { detail: text, tone: 'success' });
      const fail = () => notify(`Could not copy ${label}`, { tone: 'error' });

      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(fail);
        return;
      }
      // Clipboard API needs a secure context; this keeps copy working when the
      // portfolio is opened over plain http on a local network.
      try {
        const el = document.createElement('textarea');
        el.value = text;
        el.style.position = 'fixed';
        el.style.opacity = '0';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        done();
      } catch {
        fail();
      }
    },
    [notify]
  );

  const toggleSound = useCallback(() => {
    setSoundState((v) => {
      const next = !v;
      setSoundEnabled(next);
      if (next) playSound('notify');
      return next;
    });
  }, []);

  /* ------------------------------------------------------------- modes -- */

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('ide-zen', zenMode);
    root.classList.toggle('ide-presentation', presentationMode);
  }, [zenMode, presentationMode]);

  const activeFile = getFile(activePath);

  const value = useMemo<IDEContextValue>(
    () => ({
      tabs,
      pinned,
      activePath,
      activeFile,
      openFile,
      closeTab,
      closeOtherTabs,
      closeAllTabs,
      togglePin,
      isPinned,
      reopenDefaults,
      recent,
      visited,
      explorerVisible,
      sidebarVisible,
      statusbarVisible,
      minimapVisible,
      terminalOpen,
      toggleExplorer,
      toggleSidebar,
      toggleStatusbar,
      toggleMinimap,
      toggleTerminal,
      setTerminalOpen,
      zenMode,
      presentationMode,
      toggleZen,
      togglePresentation,
      paletteOpen,
      paletteMode,
      openPalette,
      closePalette,
      shortcutsOpen,
      setShortcutsOpen,
      aboutOpen,
      setAboutOpen,
      toasts,
      notify,
      dismissToast,
      copyToClipboard,
      soundEnabled,
      toggleSound,
      playUISound: playSound,
    }),
    [
      tabs,
      pinned,
      activePath,
      activeFile,
      openFile,
      closeTab,
      closeOtherTabs,
      closeAllTabs,
      togglePin,
      isPinned,
      reopenDefaults,
      recent,
      visited,
      explorerVisible,
      sidebarVisible,
      statusbarVisible,
      minimapVisible,
      terminalOpen,
      toggleExplorer,
      toggleSidebar,
      toggleStatusbar,
      toggleMinimap,
      toggleTerminal,
      zenMode,
      presentationMode,
      toggleZen,
      togglePresentation,
      paletteOpen,
      paletteMode,
      openPalette,
      closePalette,
      shortcutsOpen,
      aboutOpen,
      toasts,
      notify,
      dismissToast,
      copyToClipboard,
      soundEnabled,
      toggleSound,
    ]
  );

  return <IDEContext.Provider value={value}>{children}</IDEContext.Provider>;
}
