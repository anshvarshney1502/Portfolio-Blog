/*
 * Profile facts used by the terminal, the menus and the command palette.
 *
 * The About page remains the canonical presentation of this material; this is
 * the machine-readable copy so `experience` in the terminal and "Copy Email" in
 * the Edit menu can't drift from what the page says.
 */

export const PROFILE = {
  name: 'Ansh Varshney',
  handle: 'anshvarshney1502',
  title: 'Data Science @ IIT Madras',
  tagline:
    'Data Science @ IIT Madras | Summer Intern @ IIT Ropar | Open Source Contributor @ ECSoC',
  location: 'Aligarh, Uttar Pradesh, India',
  email: 'anshvarshney1502@gmail.com',
  github: 'https://github.com/anshvarshney1502',
  linkedin: 'https://www.linkedin.com/in/anshvarshneyy',
  instagram: 'https://instagram.com/_anshhit_',
  repo: 'https://github.com/anshvarshney1502/vscode-portfolio',
  version: '2.0.0',
} as const;

export interface Role {
  period: string;
  role: string;
  company: string;
  points: string[];
}

export const EXPERIENCE: Role[] = [
  {
    period: 'July 2026 - Present',
    role: 'Open Source Contributor',
    company: 'Elite Coders (ECSoC)',
    points: [
      'Actively contributing to open-source software projects through Elite Coders Summer of Code',
      'Collaborating with developers on core features, optimizations, and bug fixes',
    ],
  },
  {
    period: 'July 2026 - Present',
    role: 'Founder & Community Lead',
    company: 'Technical Innovations Forum',
    points: [
      'Founded and lead a technical community with 50+ active members',
      'Curate and share AI tools, GitHub repos, developer resources, and free learning opportunities',
      'Facilitate engaging discussions on AI, open source, and emerging technologies',
    ],
  },
  {
    period: 'May 2026 - July 2026',
    role: 'Summer Intern, AI & Open Source',
    company: 'Indian Institute of Technology, Ropar',
    points: [
      'Selected for Summer Internship 2026 at VLED Lab, IIT Ropar',
      'Worked on India-centric AI and open-source projects (such as the CS9 crowdsourced FAQ portal)',
    ],
  },
  {
    period: 'August 2025 - November 2025',
    role: 'Campus Partner',
    company: 'Perplexity',
    points: [
      'Selected as a 2025 Perplexity Campus Partner to drive AI adoption',
      'Promoted Comet browser and modern AI workflows among student communities',
    ],
  },
];

export const EDUCATION = [
  {
    period: '2024 - Present',
    degree: 'BS in Data Science and Applications',
    school: 'Indian Institute of Technology, Madras',
  },
];

export const CERTIFICATIONS = [
  {
    name: '5-Day AI Agents: Intensive Vibe Coding Course',
    issuer: 'Google',
  },
];

export const SKILLS = {
  Technical: [
    'Python',
    'JavaScript / TypeScript',
    'Data Science',
    'Artificial Intelligence',
    'Machine Learning',
    'Git / GitHub',
  ],
  Leadership: ['Community Management', 'Leadership', 'Technical Curation'],
  Languages: ['Hindi (Native/Bilingual)', 'English (Professional Working)'],
};

export const OPEN_SOURCE = [
  'Elite Coders Summer of Code (ECSoC) — active contributor',
  'CS9 FAQ Portal — crowdsourced FAQ solution built at VLED, IIT Ropar',
  'Memori — agent-native memory infrastructure, LLM-agnostic',
  'vscode-portfolio — this portfolio, built with Next.js and CSS Modules',
];

/** ASCII banner printed by the terminal on boot and by `logo`. */
export const ASCII_LOGO = [
  '    ___    _   _ ____  _   _ ',
  '   / _ \\  | \\ | / ___|| | | |',
  '  | |_| | |  \\| \\___ \\| |_| |',
  '  |  _  | | |\\  |___) |  _  |',
  '  |_| |_| |_| \\_|____/|_| |_|',
];
