/*
 * Zero-API chatbot — answers questions about Ansh using command / keyword matching.
 * Every response is plain text with optional markdown (bold, lists).
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

/* ── Canned responses ──────────────────────────────────────────────────── */

const R = {
  greeting: `Hey! 👋 I'm Ansh's portfolio assistant.\nType a question or use a command — try **/help** to see what I know.`,

  help: `**Available commands:**

/info — Full profile overview
/email — Email address
/linkedin — LinkedIn profile
/github — GitHub profile
/skills — Tech stack & skills
/projects — Featured projects
/experience — Work experience
/education — Academic background
/opensource — Open source work
/contact — All contact links
/resume — Download resume`,

  info: `**${PROFILE.name}**
${PROFILE.title}
📍 ${PROFILE.location}

${EXPERIENCE[0].role} @ ${EXPERIENCE[0].company}
${EXPERIENCE[1].role} @ ${EXPERIENCE[1].company}
${EXPERIENCE[2].role} @ ${EXPERIENCE[2].company}

BS Data Science & Applications @ IIT Madras (2024 – Present)
Certified: ${CERTIFICATIONS[0].name} by ${CERTIFICATIONS[0].issuer}`,

  email: `📧 **Email:** ${PROFILE.email}

You can also reach Ansh via the [Contact](/contact) page.`,

  linkedin: `🔗 **LinkedIn:** ${PROFILE.linkedin}

Feel free to connect!`,

  github: `🐙 **GitHub:** ${PROFILE.github}

${OPEN_SOURCE.slice(0, 3).map(o => `• ${o}`).join('\n')}`,

  instagram: `📸 **Instagram:** ${PROFILE.instagram}`,

  skills: `**Tech Skills:**
${(SKILLS.Technical as string[]).map(s => `• ${s}`).join('\n')}

**Leadership:**
${(SKILLS.Leadership as string[]).map(s => `• ${s}`).join('\n')}

**Languages:**
${(SKILLS.Languages as string[]).map(s => `• ${s}`).join('\n')}`,

  projects: `**Featured Projects:**

🔹 **CS9 FAQ Portal** — Crowdsourced FAQ portal built at VLED Lab, IIT Ropar
🔹 **Memori** — Agent-native memory infrastructure, LLM-agnostic
🔹 **Blogsite** — Technical blogging platform (Next.js + TypeScript)
🔹 **PYBE** — Scenario-driven Python learning prototype
🔹 **VSCode Portfolio** — This site you're looking at!

See them at ${PROFILE.github}`,

  experience: EXPERIENCE.map(
    e => `**${e.role}** @ ${e.company}\n_${e.period}_\n${e.points.map(p => `• ${p}`).join('\n')}`
  ).join('\n\n'),

  education: `**${EDUCATION[0].degree}**
🏛 ${EDUCATION[0].school}
📅 ${EDUCATION[0].period}

**Certification:**
• ${CERTIFICATIONS[0].name} — ${CERTIFICATIONS[0].issuer}`,

  opensource: `**Open Source Contributions:**

${OPEN_SOURCE.map(o => `• ${o}`).join('\n')}

Active through **Elite Coders Summer of Code (ECSoC)** and independent projects.`,

  contact: `**Contact Ansh:**

📧 Email: ${PROFILE.email}
🔗 LinkedIn: ${PROFILE.linkedin}
🐙 GitHub: ${PROFILE.github}
📸 Instagram: ${PROFILE.instagram}

Or use the [Contact page](/contact) on this portfolio.`,

  resume: `📄 **Resume:** [Download PDF](/resume.pdf)

Or visit the [About page](/about) for full details.`,

  unknown: `Hmm, I don't have info on that.\n\nTry **/help** to see what I can answer, or contact Ansh directly at **${PROFILE.email}**`,
};

/* ── Command map ───────────────────────────────────────────────────────── */

const COMMANDS: Record<string, string> = {
  '/help': R.help,
  '/info': R.info,
  '/about': R.info,
  '/email': R.email,
  '/linkedin': R.linkedin,
  '/github': R.github,
  '/instagram': R.instagram,
  '/skills': R.skills,
  '/stack': R.skills,
  '/tech': R.skills,
  '/projects': R.projects,
  '/work': R.projects,
  '/experience': R.experience,
  '/exp': R.experience,
  '/education': R.education,
  '/edu': R.education,
  '/opensource': R.opensource,
  '/open-source': R.opensource,
  '/oss': R.opensource,
  '/contact': R.contact,
  '/resume': R.resume,
  '/cv': R.resume,
};

/* ── Keyword patterns (checked in order) ──────────────────────────────── */

interface KeywordRule {
  patterns: RegExp;
  response: string;
}

const KEYWORDS: KeywordRule[] = [
  { patterns: /\b(hi|hello|hey|greetings|howdy|sup)\b/, response: R.greeting },
  { patterns: /\b(email|mail|inbox|message you)\b/, response: R.email },
  { patterns: /\blinkedin\b/, response: R.linkedin },
  { patterns: /\b(github|git\s?hub|repos?|code)\b/, response: R.github },
  { patterns: /\binstagram\b/, response: R.instagram },
  { patterns: /\b(skills?|stack|tech|technologies|languages|tools|know|use|code in)\b/, response: R.skills },
  {
    patterns: /\b(projects?|built|created|portfolio|apps?|software|side\s?projects?)\b/,
    response: R.projects,
  },
  {
    patterns: /\b(experience|intern|internship|work|worked|job|career|roles?)\b/,
    response: R.experience,
  },
  {
    patterns: /\b(education|degree|university|iit|madras|college|study|studies|studying|academic)\b/,
    response: R.education,
  },
  {
    patterns: /\b(open\s?source|oss|contribute|contributions?|ecsoc)\b/,
    response: R.opensource,
  },
  { patterns: /\b(contact|reach|hire|available|connect|talk to)\b/, response: R.contact },
  { patterns: /\b(resume|cv|curriculum)\b/, response: R.resume },
  {
    patterns:
      /\b(who (are|is) (you|ansh)|about (you|ansh|yourself)|introduce|tell me about|what do you do|overview)\b/,
    response: R.info,
  },
  { patterns: /\b(help|commands?|what can you|capabilities)\b/, response: R.help },
];

/* ── Public API ─────────────────────────────────────────────────────────── */

export function getBotResponse(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return R.unknown;

  /* Exact command match (case-insensitive) */
  const cmd = trimmed.toLowerCase().split(/\s+/)[0];
  if (COMMANDS[cmd]) return COMMANDS[cmd];

  /* Keyword scan (full message, case-insensitive) */
  const lower = trimmed.toLowerCase();
  for (const rule of KEYWORDS) {
    if (rule.patterns.test(lower)) return rule.response;
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
