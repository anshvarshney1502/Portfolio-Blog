export interface Project {
  title: string;
  description: string;
  logo: string;
  link: string;
  slug: string;
}

export const projects: Project[] = [
  {
    title: 'PYBE',
    description:
      'PyBe is a scenario-driven Python learning prototype built from the supplied PRD and breakdown document. Interactive coding practice for beginners.',
    logo: '/logos/vsc.svg',
    link: 'https://github.com/anshvarshney1502/PYBE',
    slug: 'pybe-python-learning',
  },
  {
    title: 'Portfolio-Blog',
    description:
      'Technical writing and blogging platform built with Next.js & TypeScript, deployed on Vercel.',
    logo: '/logos/coolify.svg',
    link: 'https://github.com/anshvarshney1502/Portfolio-Blog',
    slug: 'portfolio-blog',
  },
  {
    title: 'Crowd-Source FAQ',
    description:
      'Full-stack FAQ portal with semantic vector search, AI-powered community moderation, and an expert promotion layer. Built to handle 1 million registered users.',
    logo: '/logos/driwwwle.svg',
    link: 'https://github.com/anshvarshney1502/crowd-source-faq',
    slug: 'crowd-source-faq',
  },
  {
    title: 'Memori',
    description:
      'Agent-native memory infrastructure. LLM-agnostic layer turning agent execution and conversation into structured, persistent state for production systems.',
    logo: '/logos/driwwwle.svg',
    link: 'https://github.com/anshvarshney1502/Memori',
    slug: 'memori-agent-memory',
  },
  {
    title: 'CS9 FAQ Portal',
    description:
      'A crowdsourced FAQ solution portal developed by the VINS interns of VLED, IIT Ropar - Summer 2026.',
    logo: '/logos/subtrackt.svg',
    link: 'https://github.com/anshvarshney1502/cs9',
    slug: 'cs9-faq-portal',
  },
];
