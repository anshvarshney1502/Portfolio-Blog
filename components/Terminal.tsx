'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { VscTerminal, VscClose, VscAdd, VscSplitHorizontal } from 'react-icons/vsc';

import { useIDE } from '@/components/ide/IDEProvider';
import { onTerminalAction } from '@/lib/ide/terminalBus';
import { THEME_KEYS } from '@/lib/themes';
import {
  PROFILE,
  EXPERIENCE,
  EDUCATION,
  CERTIFICATIONS,
  SKILLS,
  OPEN_SOURCE,
  ASCII_LOGO,
} from '@/lib/ide/profile';
import styles from '@/styles/Terminal.module.css';

type LineType = 'input' | 'output' | 'error' | 'info' | 'success' | 'dim' | 'ascii';

interface TermLine {
  type: LineType;
  content: string;
}

/* ---------------------------------------------------------------- commands */

function buildCommands(onThemeChange?: () => void): Record<string, (args: string[]) => TermLine[]> {
  return {
    help: () => [
      { type: 'info', content: 'Portfolio Terminal — type a command and press Enter' },
      { type: 'output', content: '' },
      { type: 'dim', content: '  Navigation' },
      { type: 'output', content: '  home         Go to home page' },
      { type: 'output', content: '  about        Go to about page' },
      { type: 'output', content: '  projects     View my projects' },
      { type: 'output', content: '  contact      Go to contact' },
      { type: 'output', content: '  github       GitHub activity' },
      { type: 'output', content: '  articles     Articles & writing' },
      { type: 'output', content: '' },
      { type: 'dim', content: '  Profile' },
      { type: 'output', content: '  whoami       Who am I?' },
      { type: 'output', content: '  skills       Technical skills' },
      { type: 'output', content: '  experience   Work experience' },
      { type: 'output', content: '  education    Academic background' },
      { type: 'output', content: '  certifications  Certifications' },
      { type: 'output', content: '  opensource   Open source contributions' },
      { type: 'output', content: '  resume       Print / export resume' },
      { type: 'output', content: '' },
      { type: 'dim', content: '  Contact' },
      { type: 'output', content: '  linkedin     LinkedIn profile' },
      { type: 'output', content: '  github       GitHub profile' },
      { type: 'output', content: '  email        Email address' },
      { type: 'output', content: '' },
      { type: 'dim', content: '  System' },
      { type: 'output', content: '  theme <name> Change color theme' },
      { type: 'output', content: '  themes       List all themes' },
      { type: 'output', content: '  date / time  Show current date & time' },
      { type: 'output', content: '  history      Command history' },
      { type: 'output', content: '  build        Simulate build' },
      { type: 'output', content: '  deploy       Simulate deploy' },
      { type: 'output', content: '  logo         Show ASCII logo' },
      { type: 'output', content: '  ls           List sections' },
      { type: 'output', content: '  pwd          Current directory' },
      { type: 'output', content: '  echo <text>  Echo text' },
      { type: 'output', content: '  clear        Clear terminal' },
      { type: 'output', content: '' },
      { type: 'success', content: '  sudo hire-ansh   🚀 Make an offer' },
    ],

    whoami: () => [
      { type: 'success', content: `${PROFILE.name}` },
      { type: 'output', content: PROFILE.tagline },
      { type: 'output', content: `📍 ${PROFILE.location}` },
      { type: 'output', content: '' },
      { type: 'output', content: 'Building intelligent software with data, AI, and open source.' },
    ],

    skills: () => [
      { type: 'info', content: 'Technical & Leadership Skills' },
      { type: 'output', content: '' },
      ...Object.entries(SKILLS).flatMap(([category, items]) => [
        { type: 'dim' as LineType, content: `  ${category}` },
        { type: 'output' as LineType, content: `  ${items.join('  ·  ')}` },
        { type: 'output' as LineType, content: '' },
      ]),
    ],

    experience: () => [
      { type: 'info', content: 'Work Experience' },
      { type: 'output', content: '' },
      ...EXPERIENCE.flatMap(job => [
        { type: 'success' as LineType, content: `  ${job.role}` },
        { type: 'output' as LineType, content: `  ${job.company}  ·  ${job.period}` },
        ...job.points.map(p => ({ type: 'dim' as LineType, content: `    → ${p}` })),
        { type: 'output' as LineType, content: '' },
      ]),
    ],

    education: () => [
      { type: 'info', content: 'Education' },
      { type: 'output', content: '' },
      ...EDUCATION.flatMap(e => [
        { type: 'success' as LineType, content: `  ${e.degree}` },
        { type: 'output' as LineType, content: `  ${e.school}  ·  ${e.period}` },
        { type: 'output' as LineType, content: '' },
      ]),
    ],

    certifications: () => [
      { type: 'info', content: 'Certifications' },
      { type: 'output', content: '' },
      ...CERTIFICATIONS.map(c => ({
        type: 'output' as LineType,
        content: `  ✓  ${c.name} — ${c.issuer}`,
      })),
    ],

    opensource: () => [
      { type: 'info', content: 'Open Source Contributions' },
      { type: 'output', content: '' },
      ...OPEN_SOURCE.map(item => ({ type: 'output' as LineType, content: `  ◆  ${item}` })),
    ],

    contact: () => [
      { type: 'info', content: 'Contact' },
      { type: 'output', content: '' },
      { type: 'output', content: `  Email     ${PROFILE.email}` },
      { type: 'output', content: `  GitHub    ${PROFILE.github}` },
      { type: 'output', content: `  LinkedIn  ${PROFILE.linkedin}` },
    ],

    linkedin: () => [
      { type: 'info', content: `Opening LinkedIn...` },
      { type: 'output', content: PROFILE.linkedin },
    ],

    email: () => [
      { type: 'success', content: PROFILE.email },
    ],

    resume: () => [
      { type: 'info', content: 'Opening resume...' },
      { type: 'output', content: 'Tip: use Ctrl+P → File → Download Resume to save as PDF' },
    ],

    themes: () => [
      { type: 'info', content: 'Available themes:' },
      ...THEME_KEYS.map((t, i) => ({
        type: 'output' as LineType,
        content: `  ${t}${i === 0 ? '  (current default)' : ''}`,
      })),
      { type: 'output', content: '' },
      { type: 'dim', content: 'Usage: theme <name>' },
    ],

    date: () => [{ type: 'output', content: new Date().toDateString() }],
    time: () => [{ type: 'output', content: new Date().toLocaleTimeString() }],

    logo: () => [
      ...ASCII_LOGO.map(line => ({ type: 'ascii' as LineType, content: line })),
      { type: 'output', content: '' },
      { type: 'info', content: `v${PROFILE.version}  —  ${PROFILE.tagline}` },
    ],

    ls: () => [
      { type: 'output', content: 'home/  about/  projects/  contact/  github/  articles/  settings/  blogs/' },
    ],
    pwd: () => [{ type: 'output', content: '/home/visitor/portfolio' }],

    build: () => [], // handled async below
    deploy: () => [], // handled async below
  };
}

/* Fake async command with spinner steps */
async function fakeRun(
  steps: { label: string; ms: number }[],
  final: { type: LineType; content: string }[],
  append: (lines: TermLine[]) => void
): Promise<void> {
  for (const step of steps) {
    append([{ type: 'dim', content: `  ⠋ ${step.label}` }]);
    await new Promise(r => setTimeout(r, step.ms));
  }
  append(final);
}

/* ---------------------------------------------------------------- component */

const BOOT_LINES: TermLine[] = [
  ...ASCII_LOGO.map(line => ({ type: 'ascii' as LineType, content: line })),
  { type: 'output', content: '' },
  { type: 'info', content: `Welcome, visitor! Type "help" to see available commands.` },
  { type: 'output', content: '' },
];

export default function Terminal() {
  const ide = useIDE();
  const [lines, setLines] = useState<TermLine[]>(BOOT_LINES);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [sugIdx, setSugIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const router = { push: (path: string) => { ide.openFile(path); } };

  const allCommands = Object.keys(buildCommands());

  const append = useCallback((newLines: TermLine[]) => {
    setLines(prev => [...prev, ...newLines]);
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  /* Focus input whenever the terminal becomes visible */
  useEffect(() => {
    if (ide.terminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [ide.terminalOpen]);

  /* Listen for terminal bus actions (from menus) */
  useEffect(() => {
    return onTerminalAction(action => {
      if (action.kind === 'clear') { setLines([]); return; }
      if (action.kind === 'run') { runCommand(action.command); return; }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  /* Autocomplete suggestions */
  useEffect(() => {
    if (!input.trim()) { setSuggestions([]); return; }
    const q = input.toLowerCase();
    setSuggestions(allCommands.filter(c => c.startsWith(q) && c !== q).slice(0, 5));
    setSugIdx(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const runCommand = useCallback(async (raw: string) => {
    const trimmed = raw.trim();
    const [cmd, ...args] = trimmed.split(/\s+/);
    const cmdLower = cmd.toLowerCase();

    const inputLine: TermLine = { type: 'input', content: `$ ${trimmed}` };

    if (!trimmed) return;

    if (cmdLower === 'clear') { setLines([]); return; }

    if (cmdLower === 'history') {
      append([
        inputLine,
        { type: 'info', content: 'Command history:' },
        ...history.map((h, i) => ({ type: 'output' as LineType, content: `  ${i + 1}  ${h}` })),
      ]);
      return;
    }

    /* Navigation shorthands */
    const navRoutes: Record<string, string> = {
      home: '/', about: '/about', projects: '/projects',
      contact: '/contact', github: '/github', articles: '/articles',
    };
    if (navRoutes[cmdLower]) {
      append([inputLine, { type: 'success', content: `Navigating to ${cmdLower}...` }]);
      setTimeout(() => router.push(navRoutes[cmdLower]), 300);
      return;
    }

    /* Theme change */
    if (cmdLower === 'theme') {
      if (args[0] && (THEME_KEYS as string[]).includes(args[0])) {
        document.documentElement.setAttribute('data-theme', args[0]);
        localStorage.setItem('theme', args[0]);
        localStorage.setItem('user_selected_theme', args[0]);
        append([inputLine, { type: 'success', content: `Theme changed to ${args[0]}` }]);
      } else if (!args[0]) {
        append([inputLine, { type: 'error', content: 'Usage: theme <name>   Try "themes" for the list.' }]);
      } else {
        append([inputLine, { type: 'error', content: `Unknown theme: ${args[0]}` }]);
      }
      return;
    }

    if (cmdLower === 'echo') {
      append([inputLine, { type: 'output', content: args.join(' ') }]);
      return;
    }

    if (cmdLower === 'resume') {
      append([inputLine, { type: 'info', content: 'Opening About page for PDF export...' }]);
      setTimeout(() => { router.push('/about'); window.print(); }, 400);
      return;
    }

    if (cmdLower === 'linkedin') {
      append([inputLine, { type: 'info', content: `Opening ${PROFILE.linkedin}` }]);
      setTimeout(() => window.open(PROFILE.linkedin, '_blank', 'noopener'), 300);
      return;
    }

    if (cmdLower === 'sudo' && args[0] === 'hire-ansh') {
      append([
        inputLine,
        { type: 'ascii', content: '' },
        { type: 'success', content: '  🚀 Excellent choice! Here is how to reach Ansh:' },
        { type: 'output', content: '' },
        { type: 'output', content: `  Email:    ${PROFILE.email}` },
        { type: 'output', content: `  LinkedIn: ${PROFILE.linkedin}` },
        { type: 'output', content: `  GitHub:   ${PROFILE.github}` },
        { type: 'output', content: '' },
        { type: 'info', content: '  Looking forward to hearing from you!' },
      ]);
      return;
    }

    if (cmdLower === 'build') {
      append([inputLine]);
      await fakeRun(
        [
          { label: 'Resolving dependencies…', ms: 500 },
          { label: 'Compiling TypeScript…', ms: 700 },
          { label: 'Bundling assets…', ms: 600 },
          { label: 'Optimizing…', ms: 400 },
        ],
        [
          { type: 'success', content: '  ✓ Build complete' },
          { type: 'output', content: '  Ready in 2.2s' },
        ],
        append
      );
      return;
    }

    if (cmdLower === 'deploy') {
      append([inputLine]);
      await fakeRun(
        [
          { label: 'Building…', ms: 800 },
          { label: 'Uploading to Vercel…', ms: 900 },
          { label: 'Assigning domain…', ms: 400 },
          { label: 'Purging CDN cache…', ms: 300 },
        ],
        [
          { type: 'success', content: '  ✓ Deployed to production' },
          { type: 'output', content: `  ${window.location.origin}` },
        ],
        append
      );
      return;
    }

    const commands = buildCommands();
    if (commands[cmdLower]) {
      append([inputLine, ...commands[cmdLower](args)]);
    } else {
      append([
        inputLine,
        { type: 'error', content: `Command not found: ${cmd}. Try "help".` },
      ]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [append, history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const trimmed = input.trim();
    if (trimmed) setHistory(prev => [...prev, trimmed]);
    setHistIdx(-1);
    setSuggestions([]);
    runCommand(trimmed);
    setInput('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const next = Math.min(histIdx + 1, history.length - 1);
        setHistIdx(next);
        setInput(history[history.length - 1 - next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx > 0) {
        const next = histIdx - 1;
        setHistIdx(next);
        setInput(history[history.length - 1 - next]);
      } else {
        setHistIdx(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[sugIdx]);
        setSuggestions([]);
      }
    } else if (e.key === 'ArrowRight' && suggestions.length > 0 && e.ctrlKey) {
      setSugIdx(i => (i + 1) % suggestions.length);
    }
  };

  return (
    <div className={styles.terminal}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <VscTerminal size={14} className={styles.terminalIcon} />
          <span>Terminal</span>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.headerBtn} title="New Terminal" onClick={() => setLines(BOOT_LINES)}>
            <VscAdd size={13} />
          </button>
          <button className={styles.headerBtn} title="Split" onClick={() => ide.notify('Split terminal coming soon')}>
            <VscSplitHorizontal size={13} />
          </button>
          <button className={styles.headerBtn} title="Close" onClick={() => ide.setTerminalOpen(false)}>
            <VscClose size={13} />
          </button>
        </div>
      </div>

      <div
        ref={bodyRef}
        className={styles.body}
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <div key={i} className={`${styles.line} ${styles[line.type] ?? ''}`}>
            {line.content}
          </div>
        ))}

        <form onSubmit={handleSubmit} className={styles.inputRow}>
          <span className={styles.prompt}>{PROFILE.handle}@portfolio:~$</span>
          <div className={styles.inputWrap}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.inputField}
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
            {suggestions.length > 0 && (
              <span className={styles.suggestion}>
                {suggestions[sugIdx].slice(input.length)}
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
