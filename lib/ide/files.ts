/*
 * One registry for every "file" in the portfolio.
 *
 * Explorer, tabs, the command palette and the Go menu all used to keep their
 * own copy of this list, which meant adding a page took four edits and they
 * drifted apart. They now all read from here.
 */

export interface IDEFile {
  /** Route path — also the stable id used for tabs, pins and recents. */
  path: string;
  /** Filename as shown in the explorer and on the tab. */
  name: string;
  icon: string;
  /** Folder it lives under in the explorer. */
  folder: 'portfolio' | 'blogs';
  /** Shown in breadcrumbs and the status bar. */
  language: string;
  /** Human label used by the Go menu and palette. */
  label: string;
  /** Secondary line in the command palette. */
  description: string;
}

export const IDE_FILES: IDEFile[] = [
  {
    path: '/',
    name: 'home.tsx',
    icon: '/logos/react_icon.svg',
    folder: 'portfolio',
    language: 'TypeScript React',
    label: 'Home',
    description: 'Introduction and quick links',
  },
  {
    path: '/about',
    name: 'about.html',
    icon: '/logos/html_icon.svg',
    folder: 'portfolio',
    language: 'HTML',
    label: 'About',
    description: 'Background, experience and education',
  },
  {
    path: '/contact',
    name: 'contact.css',
    icon: '/logos/css_icon.svg',
    folder: 'portfolio',
    language: 'CSS',
    label: 'Contact',
    description: 'Email and social links',
  },
  {
    path: '/projects',
    name: 'projects.js',
    icon: '/logos/js_icon.svg',
    folder: 'portfolio',
    language: 'JavaScript',
    label: 'Projects',
    description: 'Featured work and repositories',
  },
  {
    path: '/articles',
    name: 'articles.json',
    icon: '/logos/json_icon.svg',
    folder: 'portfolio',
    language: 'JSON',
    label: 'Articles',
    description: 'Technical writing',
  },
  {
    path: '/github',
    name: 'github.md',
    icon: '/logos/markdown_icon.svg',
    folder: 'portfolio',
    language: 'Markdown',
    label: 'GitHub',
    description: 'Contribution activity and repos',
  },
  {
    path: '/settings',
    name: 'settings.json',
    icon: '/logos/json_icon.svg',
    folder: 'portfolio',
    language: 'JSON',
    label: 'Settings',
    description: 'Theme and appearance',
  },
  {
    path: '/blogs/CodersHighPython',
    name: "Coders'HighPython.tsx",
    icon: '/logos/react_icon.svg',
    folder: 'blogs',
    language: 'TypeScript React',
    label: "Coders' High Python",
    description: 'Blog post',
  },
  {
    path: '/edit',
    name: 'notes.md',
    icon: '/logos/markdown_icon.svg',
    folder: 'portfolio',
    language: 'Markdown',
    label: 'Notes',
    description: 'Editable profile notes',
  },
  {
    path: '/chat',
    name: 'chat.ai',
    icon: '/logos/react_icon.svg',
    folder: 'portfolio',
    language: 'AI Chat',
    label: 'Chat',
    description: 'Ask anything about Ansh',
  },
];

export const FOLDERS: { id: 'portfolio' | 'blogs'; label: string }[] = [
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'blogs', label: 'Blogs' },
];

/** Tabs that are open on a cold visit, in bar order. */
export const DEFAULT_OPEN_TABS = [
  '/',
  '/about',
  '/contact',
  '/projects',
  '/articles',
  '/github',
  '/blogs/CodersHighPython',
];

const byPath = new Map(IDE_FILES.map((f) => [f.path, f]));

export function getFile(path: string): IDEFile | undefined {
  return byPath.get(path);
}

export function filesInFolder(folder: 'portfolio' | 'blogs'): IDEFile[] {
  return IDE_FILES.filter((f) => f.folder === folder);
}

/**
 * Blog routes have a lowercase alias in the app directory. Normalising here
 * keeps a visit to either spelling pointing at the same tab.
 */
export function normalizePath(pathname: string): string {
  if (pathname === '/blogs/coders-high-python') return '/blogs/CodersHighPython';
  return pathname;
}
