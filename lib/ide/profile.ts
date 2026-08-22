/*
 * Profile facts used by the terminal, the menus, the chatbot, and the command palette.
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
    'Data Science @ IIT Madras | Summer Intern @ IIT Ropar | OSCI 2026 Contributor | Founder @ Technical Innovations Forum',
  location: 'Chennai, Tamil Nadu, India',
  email: 'anshvarshney1502@gmail.com',
  github: 'https://github.com/anshvarshney1502',
  linkedin: 'https://www.linkedin.com/in/anshvarshneyy',
  instagram: 'https://instagram.com/_anshhit_',
  repo: 'https://github.com/anshvarshney1502/Portfolio-Blog',
  site: 'https://anshvarshneyportfolio-blog.vercel.app/',
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
    period: 'Aug 2026 - Present',
    role: 'Open Source Contributor | OSCI 2026',
    company: 'Open Source Connect (Remote)',
    points: [
      'Selected as a contributor for the Open Source Contribution Initiative (OSCI) 2026',
      'Collaborating on real-world open-source projects with global maintainers',
    ],
  },
  {
    period: 'Jul 2026 - Present',
    role: 'Open Source Contributor',
    company: 'Indian Institute of Technology, Ropar (Remote)',
    points: [
      'Continuing open-source contributions at IIT Ropar post-internship',
      'Focused on Open-Source Development workflows and collaboration',
    ],
  },
  {
    period: 'Jul 2026 - Present',
    role: 'Founder & Community Lead',
    company: 'Technical Innovations Forum',
    points: [
      'Founded and lead a technical community of 50+ members',
      'Curate and share AI tools, GitHub repositories, developer resources, APIs, and free learning opportunities',
      'Facilitate discussions on AI, open source, software development, and emerging technologies',
    ],
  },
  {
    period: 'May 2026 - Jul 2026',
    role: 'Summer Intern – AI & Open Source',
    company: 'Indian Institute of Technology, Ropar (VLED Lab)',
    points: [
      'Summer Internship 2026 at Vicharanashala Lab for Education Design (VLED Lab), IIT Ropar',
      'CSFAQ: Contributed to a student-facing FAQ and query-resolution platform',
      'PyBe: Helped lead development of an interactive, case-based Python learning platform',
      'SPURTI Achievements: All-Time Rank 7, Cohort Rank 4, 1,621 SP, Level 16, Legend recognition, 3,600-Minute Club',
      'Invited to the Coders High Community during the internship',
    ],
  },
  {
    period: 'Aug 2025 - Nov 2025',
    role: 'Perplexity Campus Partner',
    company: 'Perplexity (Remote)',
    points: [
      'Selected as a 2025 Perplexity Campus Partner to drive AI adoption',
      'Promoted the Comet browser and modern AI workflows among student communities',
      'Created educational content and gathered user feedback for Perplexity products',
    ],
  },
  {
    period: 'Apr 2025 - Mar 2026',
    role: 'Tutor',
    company: 'Self-Employed',
    points: ['Taught and mentored students in academic subjects for one year'],
  },
  {
    period: 'Nov 2022 - Apr 2024',
    role: 'Content Creator, Video Editor & Social Media Manager',
    company: 'Self-Employed',
    points: [
      'Created content, edited videos, and managed social media for over 1.5 years',
      'Invited by MyGov India to participate in nomination for the National Creators Awards 2024',
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
    name: 'ML Summer School 2026',
    issuer: 'Cohere',
  },
  {
    name: 'Summer Analytics 2026 — Capstone Completion',
    issuer: 'Consulting & Analytics Club, IIT Guwahati',
  },
  {
    name: 'Summer Analytics 2026 — Merit & Participation',
    issuer: 'Consulting & Analytics Club, IIT Guwahati',
  },
  {
    name: 'Academic Process Mining Fundamentals',
    issuer: 'Celonis',
  },
  {
    name: '5-Day AI Agents: Intensive Vibe Coding Course',
    issuer: 'Google',
  },
];

export const SKILLS = {
  Technical: [
    'Python',
    'Machine Learning',
    'Open Science',
    'Open-Source Development',
    'MERN Stack',
    'GitHub',
    'Data Science',
    'Artificial Intelligence',
    'Problem Solving',
  ],
  Leadership: ['Community Management', 'Leadership', 'Teamwork', 'Teaching', 'Technical Curation'],
  Languages: ['Hindi (Native/Bilingual)', 'English (Professional Working)'],
};

export const OPEN_SOURCE = [
  'OSCI 2026 — active contributor via Open Source Connect',
  'PYBE — scenario-driven Python learning prototype (VLED Lab, IIT Ropar)',
  'CSFAQ / CS9 FAQ Portal — crowdsourced FAQ solution built at VLED, IIT Ropar',
  'Portfolio-Blog — this VS Code themed portfolio, built with Next.js 16 and TypeScript',
  'Memori — agent-native memory infrastructure, LLM-agnostic',
  'Crowd-Source FAQ — full-stack FAQ portal with semantic vector search & AI moderation',
];

export const ORGANIZATIONS = [
  {
    name: 'Cohere Labs Open Science Community',
    period: 'Aug 2026 - Present',
    role: 'Open Science Community Member',
  },
  {
    name: 'Coders High (associated with IIT Ropar)',
    period: 'Jun 2026 - Present',
    role: 'Community Member',
  },
];

/** ASCII banner printed by the terminal on boot and by `logo`. */
export const ASCII_LOGO = [
  '    ___    _   _ ____  _   _ ',
  '   / _ \\  | \\ | / ___|| | | |',
  '  | |_| | |  \\| \\___ \\| |_| |',
  '  |  _  | | |\\  |___) |  _  |',
  '  |_| |_| |_| \\_|____/|_| |_|',
];
