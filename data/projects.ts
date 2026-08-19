export interface Project {
  title: string;
  description: string;
  logo: string;
  link: string;
  slug: string;
}

export const projects: Project[] = [
  {
    title: 'CS9 FAQ Portal',
    description:
      'A crowdsourced FAQ solution portal developed by the VINS interns of VLED, IIT Ropar - Summer 2026.',
    logo: '/logos/subtrackt.svg',
    link: 'https://github.com/anshvarshney1502/cs9',
    slug: 'cs9-faq-portal',
  },
  {
    title: 'Memori',
    description:
      'Agent-native memory infrastructure. LLM-agnostic layer turning agent execution and conversation into structured, persistent state.',
    logo: '/logos/driwwwle.svg',
    link: 'https://github.com/anshvarshney1502/Memori',
    slug: 'memori-agent-memory',
  },
  {
    title: 'Blogsite',
    description:
      'Technical writing and blogging platform built with Next.js & TypeScript, deployed on Vercel.',
    logo: '/logos/coolify.svg',
    link: 'https://github.com/anshvarshney1502/blogsite',
    slug: 'blogsite',
  },
  {
    title: 'PYBE',
    description:
      'Scenario-driven Python learning prototype designed for interactive coding practice.',
    logo: '/logos/vsc.svg',
    link: 'https://github.com/anshvarshney1502/PYBE',
    slug: 'pybe-python-learning',
  },
  {
    title: 'VSCode Portfolio',
    description:
      'A Visual Studio Code themed developer portfolio built with Next.js and CSS Modules.',
    logo: '/logos/vsc.svg',
    link: 'https://github.com/anshvarshney1502/vscode-portfolio',
    slug: 'vscode-portfolio',
  },
];
