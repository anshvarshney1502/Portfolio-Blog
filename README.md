<div align="center">

<img src="https://avatars.githubusercontent.com/u/269888487?v=4" alt="Ansh Varshney" width="120" height="120" style="border-radius: 50%;" />

# ✨ Ansh Varshney — Portfolio ✨

### A Visual Studio Code themed developer portfolio, reimagined.

**Live • Interactive • Themeable • Blazingly Fast**

<br />

[![Live Demo](https://img.shields.io/badge/🌐_Live_Site-Visit-2ea44f?style=for-the-badge)](https://anshvarshneyportfolio-blog.vercel.app/)
[![Deployed on Vercel](https://img.shields.io/badge/▲_Deployed_on-Vercel-000?style=for-the-badge&logo=vercel)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<br />

[![Next.js](https://img.shields.io/badge/Next.js_16-000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![CSS Modules](https://img.shields.io/badge/CSS_Modules-1572B6?style=flat-square&logo=css3&logoColor=white)](https://github.com/css-modules/css-modules)
[![Anthropic](https://img.shields.io/badge/Claude_AI-D4A373?style=flat-square&logo=anthropic&logoColor=white)](https://anthropic.com)

<br />

**🌐 [anshvarshneyportfolio-blog.vercel.app](https://anshvarshneyportfolio-blog.vercel.app/)**

</div>

---

## 📖 Table of Contents

- [✨ Overview](#-overview)
- [🎯 Why This Portfolio Stands Out](#-why-this-portfolio-stands-out)
- [🎨 Features In Detail](#-features-in-detail)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [📜 Scripts](#-scripts)
- [🔒 Security](#-security)
- [🌐 Deployment](#-deployment)
- [📂 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📬 Connect](#-connect)
- [📄 License](#-license)

---

## ✨ Overview

> **A portfolio that doesn't just show your work — it *is* your work.**

This is the personal portfolio of **Ansh Varshney** — Data Science student at **IIT Madras**, Summer Intern at **IIT Ropar (VLED Lab)**, **OSCI 2026 Open Source Contributor**, and **Founder** of the Technical Innovations Forum.

Instead of a standard resume site, this portfolio recreates the entire **Visual Studio Code** experience in the browser — activity bar, file explorer, tab bar, status bar, terminal, command palette, and even a built-in AI chatbot. Every "file" you click is a real page. Every theme is switchable. Every keyboard shortcut works. It's a portfolio designed for developers, *by* a developer.

---

## 🎯 Why This Portfolio Stands Out

<table>
<tr>
<td width="33%" align="center">

### 🎨
**Truly Themed**

Not a "dark mode toggle" — a full VS Code UI with 5 authentic editor themes: Night Owl, GitHub Dark, Dracula, Ayu, and Nord.

</td>
<td width="33%" align="center">

### ⚡
**Server-Component Fast**

Built on Next.js 16 App Router with React 19 Server Components. Ships minimal JS to the client. Lighthouse ~100.

</td>
<td width="33%" align="center">

### 🤖
**AI-Powered**

Built-in chatbot answers anything about Ansh — powered by structured profile data with intelligent keyword and command matching.

</td>
</tr>
<tr>
<td width="33%" align="center">

### 🖥️
**Interactive Terminal**

Real command emulator: `help`, `about`, `projects`, `whoami`, `clear` — explore the portfolio the way a dev actually would.

</td>
<td width="33%" align="center">

### ⌘
**Command Palette**

Hit `Ctrl/Cmd + K` to jump anywhere. Search pages, switch themes, and trigger actions — just like real VS Code.

</td>
<td width="33%" align="center">

### 🔒
**A+ Security**

HSTS, CSP-ready headers, hidden `X-Powered-By`, FLoC-blocked, 0 npm vulnerabilities. Locked down by default.

</td>
</tr>
</table>

---

## 🎨 Features In Detail

### 🖥️ VS Code Themed Interface
A faithfully recreated Visual Studio Code environment, complete with:
- **Activity Bar** — icons for Explorer, GitHub, Chat, Contact
- **Sidebar Explorer** — real pages disguised as `.tsx`, `.html`, `.css`, `.json`, `.md` files
- **Tab Bar** — open, close, and switch between pages with proper file icons
- **Status Bar** — shows current language, sync status, git branch
- **Editor Area** — where each page's content lives

Files in the explorer are real routes:

| File | Route | Content |
|------|-------|---------|
| `home.tsx` | `/` | Landing hero |
| `about.html` | `/about` | Full LinkedIn profile |
| `contact.css` | `/contact` | Contact form + socials |
| `projects.js` | `/projects` | Showcased GitHub projects |
| `articles.json` | `/articles` | Blog listing *(coming soon)* |
| `github.md` | `/github` | Live GitHub stats & repos |
| `settings.json` | `/settings` | Theme picker |

### 🎭 Five Authentic VS Code Themes

Every color, every syntax highlight, every UI accent switches seamlessly:

| Theme | Vibe |
|-------|------|
| 🌌 **Night Owl** *(default)* | Deep midnight blues, teal accents |
| 🐙 **GitHub Dark** | The official GitHub palette |
| 🧛 **Dracula** | Purple & pink Gothic elegance |
| 🌅 **Ayu** | Warm ambient tones |
| ❄️ **Nord** | Frosty Nordic minimalism |

Switch anytime from the Settings page or the command palette.

### ⌘ Command Palette (`Ctrl/Cmd + K`)
Navigate the entire portfolio without touching the mouse:
- 🔍 Fuzzy-search all pages
- 🎨 Switch themes instantly
- 📖 Open the terminal
- 💬 Focus the chatbot
- 🔗 Copy contact info

### 💻 Interactive Terminal Emulator

A working shell built into the bottom panel. Supported commands:

```bash
help          # List all commands
about         # Show bio
projects      # List featured projects
experience    # Work history
skills        # Tech stack
contact       # Email & socials
github        # Open GitHub profile
clear         # Clear screen
whoami        # Print user info
logo          # ASCII banner
```

Type naturally. Uses zero external APIs — all responses come from a structured profile module (`lib/ide/profile.ts`).

### 🤖 Built-in AI Chatbot

An intelligent assistant in the right sidebar answers anything about Ansh:

- **Command-based:** `/skills`, `/projects`, `/experience`, `/contact`, `/resume`, etc.
- **Natural language:** "What tech does he know?", "Where is he based?", "Is he hiring?"
- **Zero API calls:** Runs entirely on the client with keyword matching, so it's instant and free.

Optionally upgradeable to real Claude API (`@anthropic-ai/sdk` is preinstalled).

### 👤 Complete About Page
Full professional profile powered by structured data:

- 💼 **7 professional roles** — OSCI 2026, IIT Ropar, TIF founder, Perplexity Campus Partner, Tutor, Content Creator
- 🎓 **Education** — BS Data Science & Applications, IIT Madras
- 🏆 **5 certifications** — Cohere ML School, Summer Analytics x2, Celonis, Google
- 🛠 **Skills** — Technical + Leadership + Languages
- 🤝 **Organizations** — Cohere Labs Open Science Community, Coders High
- 🩺 **Volunteering** — Handheld for PCOS

### 📁 Projects Showcase
Timeline-style showcase of featured GitHub projects with rich descriptions:
- **PYBE** — Scenario-driven Python learning prototype
- **Portfolio-Blog** — This VS Code themed portfolio (meta!)
- **Crowd-Source FAQ** — Full-stack FAQ portal with semantic vector search
- **Memori** — Agent-native LLM memory infrastructure
- **CS9 FAQ Portal** — Crowdsourced FAQ built at VLED Lab, IIT Ropar

### 📊 Live GitHub Integration
- 🟩 **Real-time contribution graph** via [`react-github-calendar`](https://github.com/grubersjoe/react-github-calendar)
- 📈 **Live repo stats** — stars, forks, language breakdown
- ⏱ **60-second revalidation** with edge caching
- 🚀 **Parallel fetch + 3s timeout** for instant loading with graceful fallback

### 📝 Blog Engine *(Coming Soon)*
> ✍️ **A full technical blog is in the works** — with:
> - MDX support for interactive posts
> - Syntax-highlighted code blocks (Shiki)
> - Tag filtering & search
> - Reading time estimation
> - Author cards, related posts, table of contents
>
> **Stay tuned!** Follow the repo to know when it drops.

### ✉️ Contact Page
Multiple ways to reach out, all one click away:
- 📧 Email — direct mailto link
- 💼 LinkedIn
- 🐙 GitHub
- 📸 Instagram
- 📝 Native contact form (in progress)

### ⚡ Performance & Developer Experience
- **Next.js 16 App Router** — the latest, greatest, and most stable release
- **React 19** — server components ship less JS to the browser
- **TypeScript 5** — strictly typed, from data models to component props
- **CSS Modules** — scoped styles, zero global leakage
- **`next/font`** for zero-CLS custom fonts
- **`next/image`** for optimized responsive images
- **ESLint 9** with `eslint-config-next` for consistent code style

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technology |
|----------|-----------|
| **Framework** | ![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js) |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white) |
| **UI Library** | ![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black) |
| **Styling** | ![CSS Modules](https://img.shields.io/badge/CSS_Modules-1572B6?style=flat-square&logo=css3&logoColor=white) |
| **Icons** | ![React Icons](https://img.shields.io/badge/React_Icons_(VSCode_set)-e91e63?style=flat-square) |
| **GitHub API** | ![react-github-calendar](https://img.shields.io/badge/react--github--calendar-4.5-8b5cf6?style=flat-square) |
| **AI SDK** | ![Claude](https://img.shields.io/badge/@anthropic--ai/sdk-D4A373?style=flat-square) |
| **Deployment** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) |
| **Linting** | ![ESLint](https://img.shields.io/badge/ESLint_9-4B32C3?style=flat-square&logo=eslint&logoColor=white) |
| **Runtime** | ![Node.js](https://img.shields.io/badge/Node.js_20+-339933?style=flat-square&logo=node.js&logoColor=white) |

</div>

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────┐
│                   Vercel Edge                        │
│  ┌────────────────────────────────────────────────┐  │
│  │           Next.js 16 App Router                │  │
│  │  ┌──────────────┐  ┌──────────────────────┐   │  │
│  │  │ Server       │  │ Client Components    │   │  │
│  │  │ Components   │  │  • Titlebar          │   │  │
│  │  │  • pages     │  │  • Terminal          │   │  │
│  │  │  • layouts   │  │  • ChatPanel         │   │  │
│  │  │  • metadata  │  │  • CommandPalette    │   │  │
│  │  └──────────────┘  └──────────────────────┘   │  │
│  │                                                │  │
│  │   ┌──────────────────────────────────────┐    │  │
│  │   │  Static Data (data/, lib/ide/)       │    │  │
│  │   │    → profile.ts, projects.ts         │    │  │
│  │   │    → chatbot responses, terminal cmds│    │  │
│  │   └──────────────────────────────────────┘    │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  Security Headers (next.config.ts)             │  │
│  │  • HSTS (2y + preload)  • X-Frame-Options DENY │  │
│  │  • X-Content-Type-Options: nosniff             │  │
│  │  • Permissions-Policy: block cam/mic/geo/FLoC  │  │
│  │  • Powered-By: HIDDEN                          │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
                          │
                          ▼
              ┌─────────────────────┐
              │  External Services  │
              │  • GitHub API       │
              │  • Cloudinary       │
              │  • Anthropic API    │
              └─────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 20 or higher
- **npm**, **pnpm**, **yarn**, or **bun**
- **Git**

### 1️⃣ Clone the repository
```bash
git clone https://github.com/anshvarshney1502/Portfolio-Blog.git
cd Portfolio-Blog
```

### 2️⃣ Install dependencies
```bash
npm install
# or
pnpm install
# or
bun install
```

### 3️⃣ Configure environment
Create `.env.local` in the root:
```env
# Required
NEXT_PUBLIC_GITHUB_USERNAME=anshvarshney1502

# Optional (for higher GitHub API rate limits)
GITHUB_API_KEY=ghp_your_personal_access_token

# Optional (only if enabling real Claude AI chatbot)
ANTHROPIC_API_KEY=sk-ant-...

# Optional (for dev.to blog integration)
DEV_TO_API_KEY=your-dev-to-api-key
```

> 💡 **Tip:** All env vars are optional except `NEXT_PUBLIC_GITHUB_USERNAME`. The site works without any API keys, using cached/mocked data.

### 4️⃣ Run the dev server
```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** — you'll see the portfolio live, with hot-reload on every save.

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on `localhost:3000` with hot reload |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server (must build first) |
| `npm run lint` | Lint the entire codebase using ESLint |

---

## 🔒 Security

This project is hardened out of the box:

### Security Headers (auto-applied to all responses)
```typescript
'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
'X-Frame-Options': 'DENY'
'X-Content-Type-Options': 'nosniff'
'Referrer-Policy': 'strict-origin-when-cross-origin'
'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
```

### Dependency Audit
- ✅ **0 known vulnerabilities** (`npm audit`)
- ✅ `vercel` CLI moved out of runtime deps
- ✅ Regular Dependabot-style updates

### No Data Collection
- ❌ No analytics scripts (add your own if you want)
- ❌ No trackers
- ❌ No third-party cookies
- ❌ No PII stored anywhere

---

## 🌐 Deployment

This site is deployed on **Vercel** with continuous deployment from `main`.

### What happens on every push:
1. ✅ Vercel receives webhook
2. ✅ Runs `npm install`
3. ✅ Runs `next build` — typechecks + bundles
4. ✅ Creates preview URL for PRs
5. ✅ Promotes to production on merge to `main`
6. ✅ Invalidates CDN cache automatically

### Deploy your own
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fanshvarshney1502%2FPortfolio-Blog)

**Production URL:** [https://anshvarshneyportfolio-blog.vercel.app/](https://anshvarshneyportfolio-blog.vercel.app/)

---

## 📂 Project Structure

```
Portfolio-Blog/
├── 📁 app/                    # Next.js App Router (pages + layouts)
│   ├── about/                 # About page — full bio & timeline
│   ├── articles/              # Blog listing (coming soon)
│   ├── contact/               # Contact form + socials
│   ├── github/                # Live GitHub stats
│   ├── projects/              # Featured projects showcase
│   ├── settings/              # Theme picker
│   ├── layout.tsx             # Root layout, metadata, fonts
│   └── page.tsx               # Home page — hero section
│
├── 📁 components/             # Reusable UI components
│   ├── Titlebar.tsx           # Top VS Code titlebar
│   ├── ActivityBar.tsx        # Left icon bar
│   ├── Sidebar.tsx            # File explorer
│   ├── TabBar.tsx             # Editor tabs
│   ├── StatusBar.tsx          # Bottom status
│   ├── Terminal.tsx           # Interactive terminal
│   ├── ChatPanel.tsx          # AI chatbot panel
│   ├── CommandPalette.tsx     # Cmd+K search
│   ├── ProjectCard.tsx        # Project display card
│   └── ide/IDEProvider.tsx    # Global IDE state context
│
├── 📁 data/                   # Static data
│   └── projects.ts            # Featured projects list
│
├── 📁 lib/                    # Utilities & business logic
│   ├── ide/
│   │   ├── profile.ts         # Ansh's profile data (source of truth)
│   │   ├── chatbot.ts         # Chatbot response engine
│   │   └── customization.ts   # Theme configs
│   └── github.ts              # GitHub API client
│
├── 📁 types/                  # TypeScript type definitions
│   └── index.ts               # Article, Project, Repo, User types
│
├── 📁 public/                 # Static assets
│   └── logos/                 # Project SVG logos
│
├── 📁 styles/                 # CSS Modules & tokens
│   ├── tokens.css             # Design tokens (colors, spacing)
│   └── *.module.css           # Per-component scoped styles
│
├── 📄 next.config.ts          # Next.js + security headers config
├── 📄 tsconfig.json           # TypeScript config
├── 📄 eslint.config.mjs       # ESLint config
├── 📄 package.json            # Dependencies & scripts
├── 📄 CLAUDE.md               # AI assistant context
├── 📄 CODE_OF_CONDUCT.md      # Contribution rules
└── 📄 README.md               # You are here 👋
```

---

## 🤝 Contributing

This is a personal portfolio, but **bug reports, feature ideas, and pull requests are always welcome!**

### How to contribute:
1. 🍴 Fork the repo
2. 🌿 Create a branch: `git checkout -b feature/awesome-idea`
3. 💾 Commit: `git commit -m "feat: add awesome idea"`
4. 📤 Push: `git push origin feature/awesome-idea`
5. 🔀 Open a Pull Request

Please read the [Code of Conduct](./CODE_OF_CONDUCT.md) before contributing.

### Commit convention
Follows [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation only
- `chore:` maintenance
- `refactor:` code restructure
- `perf:` performance
- `test:` tests

---

## 📬 Connect

<div align="center">

[![Portfolio](https://img.shields.io/badge/🌐_Portfolio-Visit-2ea44f?style=for-the-badge)](https://anshvarshneyportfolio-blog.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/anshvarshneyy/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/anshvarshney1502)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:anshvarshney1502@gmail.com)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/_anshhit_)

</div>

---

## 📄 License

Licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

You are free to fork, modify, and use this portfolio as inspiration for your own — just give credit where credit's due. 🙏

---

## 🙏 Acknowledgments

- **Inspiration:** [Bruno Simon](https://bruno-simon.com) & the incredible dev portfolio community
- **VS Code Team** — for building the editor this UI is lovingly based on
- **Vercel** — for the amazing deployment platform
- **Anthropic** — for Claude, the AI assistant behind the chatbot
- **Next.js Team** — for making React development this good

---

<div align="center">

### ⭐ If this portfolio inspired you, star the repo!

**Built with ❤️, ☕, and countless late-night debugging sessions by [Ansh Varshney](https://github.com/anshvarshney1502)**

<br />

📍 Chennai, Tamil Nadu, India 🇮🇳
🎓 BS Data Science @ IIT Madras
💼 Summer Intern @ IIT Ropar · OSCI 2026 Contributor · Founder @ Technical Innovations Forum

<br />

*Last updated: August 2026*

</div>
