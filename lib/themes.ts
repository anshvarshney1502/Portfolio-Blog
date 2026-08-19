export interface ThemeInfo {
  name: string;
  theme: string;
  publisher: string;
  bg: string;
  accent: string;
  text: string;
}

export const THEMES: ThemeInfo[] = [
  {
    name: 'Night Owl',
    theme: 'night-owl',
    publisher: 'sarah.drasner',
    bg: '#011627',
    accent: '#82aaff',
    text: '#d6deeb',
  },
  {
    name: 'GitHub Dark',
    theme: 'github-dark',
    publisher: 'GitHub',
    bg: '#24292e',
    accent: '#f9826c',
    text: '#efefef',
  },
  {
    name: 'Dracula',
    theme: 'dracula',
    publisher: 'Dracula Theme',
    bg: '#282a36',
    accent: '#bd93f9',
    text: '#f8f8f2',
  },
  {
    name: 'Ayu Dark',
    theme: 'ayu-dark',
    publisher: 'teabyii',
    bg: '#0a0e14',
    accent: '#e6b450',
    text: '#efefef',
  },
  {
    name: 'Ayu Mirage',
    theme: 'ayu-mirage',
    publisher: 'teabyii',
    bg: '#1f2430',
    accent: '#e6b450',
    text: '#efefef',
  },
  {
    name: 'Nord',
    theme: 'nord',
    publisher: 'arcticicestudio',
    bg: '#2e3440',
    accent: '#88c0d0',
    text: '#eceff4',
  },
];

export const CUSTOM_THEME: ThemeInfo = {
  name: 'Custom',
  theme: 'custom',
  publisher: 'You',
  bg: '#1e1e1e',
  accent: '#569cd6',
  text: '#cccccc',
};

export const ALL_THEMES = [...THEMES, CUSTOM_THEME];

export const THEME_KEYS = ALL_THEMES.map(t => t.theme) as [string, ...string[]];
