/*
 * Zero-API chatbot — answers questions about Ansh using command / keyword matching.
 * Responses use simple markdown (bold, bullets) rendered by ChatPanel.
 */

import {
  PROFILE,
  EXPERIENCE,
  EDUCATION,
  SKILLS,
  OPEN_SOURCE,
  CERTIFICATIONS,
} from '@/lib/ide/profile';

export interface BotMessage {
  role: 'user' | 'assistant';
  content: string;
}

/* ─── Canonical responses ──────────────────────────────────────────────── */

const R = {
  greeting:
    `Hey! 👋 I'm the AI assistant built into Ansh's portfolio.\n\nAsk me anything about his background, projects, or how to get in touch. Try **/help** to see all available commands.`,

  help:
    `**Commands you can use:**\n\n` +
    `/info — Full profile overview\n` +
    `/skills — Tech stack & tools\n` +
    `/projects — Featured projects\n` +
    `/experience — Work experience\n` +
    `/education — Academic background\n` +
    `/certifications — Certificates earned\n` +
    `/opensource — Open source work\n` +
    `/blog — Blog & writing\n` +
    `/contact — All contact links\n` +
    `/email — Email address\n` +
    `/linkedin — LinkedIn profile\n` +
    `/github — GitHub profile\n` +
    `/resume — Download résumé\n` +
    `/location — Where Ansh is based\n` +
    `/availability — Hiring / collab status\n\n` +
    `Or just type naturally — "what are his skills?", "how do I reach him?", etc.`,

  info:
    `**${PROFILE.name}**\n` +
    `${PROFILE.title}\n` +
    `📍 ${PROFILE.location}\n\n` +
    `**Currently:**\n` +
    EXPERIENCE.slice(0, 3).map(e => `• ${e.role} @ ${e.company}`).join('\n') + '\n\n' +
    `**Education:** BS Data Science & Applications, IIT Madras (2024–present)\n\n` +
    `**Certified:** ${CERTIFICATIONS[0].name} — ${CERTIFICATIONS[0].issuer}\n\n` +
    `He's passionate about AI, open source, and building software that creates real-world impact.`,

  skills:
    `**Tech Skills:**\n` +
    (SKILLS.Technical as string[]).map(s => `• ${s}`).join('\n') + '\n\n' +
    `**Leadership & Community:**\n` +
    (SKILLS.Leadership as string[]).map(s => `• ${s}`).join('\n') + '\n\n' +
    `**Languages spoken:**\n` +
    (SKILLS.Languages as string[]).map(s => `• ${s}`).join('\n'),

  projects:
    `**Featured Projects:**\n\n` +
    `🔹 **CS9 FAQ Portal** — Crowdsourced FAQ portal built at VLED Lab, IIT Ropar (Summer 2026)\n` +
    `🔹 **Memori** — Agent-native memory infrastructure, LLM-agnostic; turns agent execution into structured persistent state\n` +
    `🔹 **Blogsite** — Technical blogging platform (Next.js + TypeScript, deployed on Vercel)\n` +
    `🔹 **PYBE** — Scenario-driven Python learning prototype for interactive coding practice\n` +
    `🔹 **VSCode Portfolio** — This very portfolio you're looking at, built with Next.js & CSS Modules\n\n` +
    `Browse all at ${PROFILE.github}`,

  experience:
    EXPERIENCE.map(e =>
      `**${e.role}**\n` +
      `${e.company} · ${e.period}\n` +
      e.points.map(p => `• ${p}`).join('\n')
    ).join('\n\n'),

  education:
    `**${EDUCATION[0].degree}**\n` +
    `🏛 ${EDUCATION[0].school}\n` +
    `📅 ${EDUCATION[0].period}\n\n` +
    `IIT Madras is one of India's premier technical universities. Ansh is pursuing a BS in Data Science and Applications, covering machine learning, statistics, programming, and AI systems.`,

  certifications:
    `**Certifications:**\n\n` +
    CERTIFICATIONS.map(c => `• **${c.name}**\n  Issued by ${c.issuer}`).join('\n\n') + '\n\n' +
    `Ansh actively upskills through structured programs from top institutions and tech companies.`,

  opensource:
    `**Open Source Contributions:**\n\n` +
    OPEN_SOURCE.map(o => `• ${o}`).join('\n') + '\n\n' +
    `Ansh contributes through **Elite Coders Summer of Code (ECSoC)** and independent projects. He's built tools, fixed bugs, and collaborated with developers across multiple repos.`,

  blog:
    `**Blog & Writing:**\n\n` +
    `Ansh writes about Python, AI, and developer tools. His blog is hosted as part of this portfolio — check the **Articles** tab in the explorer for published posts.\n\n` +
    `He also curates AI tools, GitHub repos, and dev resources through the **Technical Innovations Forum**, a community he founded with 50+ active members.`,

  contact:
    `**Reach Ansh:**\n\n` +
    `📧 Email: ${PROFILE.email}\n` +
    `🔗 LinkedIn: ${PROFILE.linkedin}\n` +
    `🐙 GitHub: ${PROFILE.github}\n` +
    `📸 Instagram: ${PROFILE.instagram}\n\n` +
    `Or use the **Contact** page in this portfolio for a quick message.`,

  email:
    `📧 **Email:** ${PROFILE.email}\n\n` +
    `This is the best way to reach Ansh for internships, collaborations, or project inquiries.`,

  linkedin:
    `🔗 **LinkedIn:** ${PROFILE.linkedin}\n\n` +
    `Connect with Ansh for professional networking, collaboration opportunities, or just to say hi.`,

  github:
    `🐙 **GitHub:** ${PROFILE.github}\n\n` +
    `**Active projects:**\n` +
    OPEN_SOURCE.slice(0, 3).map(o => `• ${o}`).join('\n') + '\n\n' +
    `Ansh is an active open source contributor — check his repos for the latest work.`,

  resume:
    `📄 **Résumé:** [Download PDF](/resume.pdf)\n\n` +
    `Covers his education at IIT Madras, internship at IIT Ropar, open source contributions, and technical skills. For a full breakdown, visit the **About** page.`,

  location:
    `📍 **Location:** ${PROFILE.location}\n\n` +
    `Ansh is based in Aligarh, Uttar Pradesh, India, and is open to remote work and online collaborations globally.`,

  availability:
    `**Availability:**\n\n` +
    `Ansh is currently a full-time student at IIT Madras but is open to:\n` +
    `• Remote internships & research roles\n` +
    `• Open source collaborations\n` +
    `• Part-time / freelance projects\n` +
    `• Networking and mentorship conversations\n\n` +
    `Reach out at **${PROFILE.email}** to start a conversation.`,

  unknown:
    `I don't have specific info on that.\n\nTry **/help** to see what I can answer, or reach Ansh directly at **${PROFILE.email}**`,
};

/* ─── Command map ──────────────────────────────────────────────────────── */

const COMMANDS: Record<string, string> = {
  '/help': R.help,
  '/info': R.info,
  '/about': R.info,
  '/me': R.info,
  '/skills': R.skills,
  '/stack': R.skills,
  '/tech': R.skills,
  '/technologies': R.skills,
  '/projects': R.projects,
  '/work': R.projects,
  '/portfolio': R.projects,
  '/experience': R.experience,
  '/exp': R.experience,
  '/history': R.experience,
  '/education': R.education,
  '/edu': R.education,
  '/school': R.education,
  '/university': R.education,
  '/certifications': R.certifications,
  '/certs': R.certifications,
  '/cert': R.certifications,
  '/opensource': R.opensource,
  '/open-source': R.opensource,
  '/oss': R.opensource,
  '/contributions': R.opensource,
  '/blog': R.blog,
  '/blogs': R.blog,
  '/writing': R.blog,
  '/articles': R.blog,
  '/contact': R.contact,
  '/email': R.email,
  '/mail': R.email,
  '/linkedin': R.linkedin,
  '/github': R.github,
  '/gh': R.github,
  '/instagram': R.linkedin,
  '/resume': R.resume,
  '/cv': R.resume,
  '/location': R.location,
  '/where': R.location,
  '/availability': R.availability,
  '/hire': R.availability,
  '/hiring': R.availability,
  '/hello': R.greeting,
  '/hi': R.greeting,
};

/* ─── Keyword rules ────────────────────────────────────────────────────── */

interface KeywordRule {
  pattern: RegExp;
  response: string;
}

const KEYWORDS: KeywordRule[] = [
  { pattern: /\b(hi|hello|hey|howdy|greetings|sup|yo)\b/, response: R.greeting },
  { pattern: /\b(email|mail|inbox|write to|dm)\b/, response: R.email },
  { pattern: /\blinkedin\b/, response: R.linkedin },
  { pattern: /\b(github|repos?|code|git)\b/, response: R.github },
  { pattern: /\binstagram\b/, response: R.linkedin },
  { pattern: /\b(skills?|stack|tech|technologies|tools|languages|programming|know|use)\b/, response: R.skills },
  { pattern: /\b(projects?|built|created|apps?|software|portfolio|side\s?projects?)\b/, response: R.projects },
  { pattern: /\b(experience|intern|internship|worked|job|career|roles?|iit\s?ropar|vled)\b/, response: R.experience },
  { pattern: /\b(education|degree|university|iit|madras|college|study|studies|studying|academic|bs|bsc)\b/, response: R.education },
  { pattern: /\b(certif|certified|certificate|google|course)\b/, response: R.certifications },
  { pattern: /\b(open\s?source|oss|contrib|ecsoc|elite\s?coders)\b/, response: R.opensource },
  { pattern: /\b(blog|writ|articles?|posts?|publish)\b/, response: R.blog },
  { pattern: /\b(contact|reach|hire|available|connect|talk to|collab)\b/, response: R.contact },
  { pattern: /\b(resume|cv|curriculum)\b/, response: R.resume },
  { pattern: /\b(location|where|city|country|india|aligarh)\b/, response: R.location },
  { pattern: /\b(availab|open to work|freelan|intern|opportunit)\b/, response: R.availability },
  { pattern: /\b(who (are|is) (you|ansh)|about (you|ansh|yourself)|introduce|tell me|overview|summary)\b/, response: R.info },
  { pattern: /\b(commands?|help|what can you|capabilities)\b/, response: R.help },
];

/* ─── Public API ───────────────────────────────────────────────────────── */

export function getBotResponse(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return R.unknown;

  const cmd = trimmed.toLowerCase().split(/\s+/)[0];
  if (COMMANDS[cmd]) return COMMANDS[cmd];

  const lower = trimmed.toLowerCase();
  for (const rule of KEYWORDS) {
    if (rule.pattern.test(lower)) return rule.response;
  }

  return R.unknown;
}

export const SUGGESTIONS = [
  '/info',
  '/skills',
  '/projects',
  '/experience',
  '/contact',
];
