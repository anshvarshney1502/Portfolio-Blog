import Anthropic from '@anthropic-ai/sdk';
import {
  PROFILE,
  EXPERIENCE,
  EDUCATION,
  SKILLS,
  OPEN_SOURCE,
  CERTIFICATIONS,
} from '@/lib/ide/profile';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are an AI assistant embedded in Ansh Varshney's VS Code-themed portfolio website. Your job is to answer visitor questions about Ansh — his background, skills, experience, projects, and how to reach him. Be warm, concise, and confident. Speak as someone who knows Ansh's work well.

Here are all the facts you have about Ansh:

## Personal
- Name: ${PROFILE.name}
- Title: ${PROFILE.title}
- Location: ${PROFILE.location}
- Email: ${PROFILE.email}
- GitHub: ${PROFILE.github}
- LinkedIn: ${PROFILE.linkedin}
- Instagram: ${PROFILE.instagram}

## Education
${EDUCATION.map(e => `- ${e.degree} at ${e.school} (${e.period})`).join('\n')}

## Experience
${EXPERIENCE.map(e => `### ${e.role} @ ${e.company} (${e.period})\n${e.points.map(p => `- ${p}`).join('\n')}`).join('\n\n')}

## Skills
${Object.entries(SKILLS).map(([cat, list]) => `- ${cat}: ${(list as string[]).join(', ')}`).join('\n')}

## Projects
- **CS9 FAQ Portal** — Crowdsourced FAQ solution portal developed at VLED Lab, IIT Ropar (Summer 2026). GitHub: https://github.com/anshvarshney1502/cs9
- **Memori** — Agent-native memory infrastructure, LLM-agnostic. Turns agent execution and conversation into structured persistent state. GitHub: https://github.com/anshvarshney1502/Memori
- **Blogsite** — Technical writing and blogging platform built with Next.js & TypeScript. GitHub: https://github.com/anshvarshney1502/blogsite
- **PYBE** — Scenario-driven Python learning prototype for interactive coding practice. GitHub: https://github.com/anshvarshney1502/PYBE
- **VSCode Portfolio** — This portfolio website, built with Next.js and CSS Modules. GitHub: https://github.com/anshvarshney1502/vscode-portfolio

## Open Source Contributions
${OPEN_SOURCE.map(o => `- ${o}`).join('\n')}

## Certifications
${CERTIFICATIONS.map(c => `- ${c.name} by ${c.issuer}`).join('\n')}

## Guidelines
- Keep answers concise (2-3 paragraphs max) unless a detailed breakdown is asked for.
- If asked something not covered above, say you don't have that detail and suggest contacting Ansh at ${PROFILE.email}.
- Do not invent or guess facts beyond what's listed here.
- If asked what you are, say you're Ansh's portfolio assistant, powered by Claude AI.
- Format code, lists, or key terms in markdown when helpful.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'No messages provided' }), { status: 400 });
    }

    const stream = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (err) {
    console.error('[chat API]', err);
    return new Response(JSON.stringify({ error: 'Failed to reach AI' }), { status: 500 });
  }
}
