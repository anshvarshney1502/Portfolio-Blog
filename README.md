<div align="center">

# Ansh Varshney — Portfolio

### A Visual Studio Code themed developer portfolio built with Next.js, TypeScript, and CSS Modules.

[![Live Site](https://img.shields.io/badge/Live-Portfolio-blue?style=for-the-badge&logo=vercel)](https://anshvarshneyportfolio-blog.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**🌐 Live Site:** [anshvarshneyportfolio-blog.vercel.app](https://anshvarshneyportfolio-blog.vercel.app/)

</div>

---

## ✨ Overview

Portfolio of **Ansh Varshney** — Data Science student at **IIT Madras**, Summer Intern at **IIT Ropar (VLED Lab)**, **OSCI 2026 Open Source Contributor**, and **Founder** of the Technical Innovations Forum.

This site reimagines a personal portfolio as a full **Visual Studio Code** experience — with an activity bar, explorer, tabs, status bar, and a working command palette — bringing the developer's daily workflow into a live, interactive resume.

---

## 🎨 Features

### 🖥️ VS Code Themed Interface
- Fully recreated **VS Code UI** with activity bar, sidebar explorer, tab bar, and status bar
- Files in the explorer represent **actual pages** — `home.tsx`, `about.html`, `projects.js`, `contact.css`, `github.md`, `articles.json`, `settings.json`, `notes.md`
- Realistic **tab behavior** with open/close, active states, and file icons

### 🎭 Multiple Themes
- 🌌 **Night Owl** *(default)*
- 🐙 **GitHub Dark**
- 🧛 **Dracula**
- 🌅 **Ayu**
- ❄️ **Nord**

Switch themes instantly through the settings panel — every color, syntax highlight, and UI accent updates seamlessly.

### 🎯 Command Palette (`Ctrl / Cmd + K`)
- Navigate anywhere with keyboard shortcuts
- Search across pages, themes, and quick actions — just like the real VS Code

### 💻 Interactive Terminal
- A working custom **terminal emulator** with commands: `help`, `about`, `projects`, `contact`, `clear`, `whoami`, and more
- Type commands to explore the portfolio the way a developer actually would

### 👤 About Page
- Complete professional profile with **experience timeline**, education, skills, certifications, volunteering, and organizations
- Sourced from LinkedIn and GitHub for accuracy

### 📁 Projects Showcase
- Curated timeline of featured GitHub projects with descriptions and repo links
- Currently showcasing: **PYBE**, **Portfolio-Blog**, **Crowd-Source FAQ**, **Memori**, **CS9 FAQ Portal**

### 📊 GitHub Integration
- Live **GitHub contribution calendar** powered by [`react-github-calendar`](https://github.com/grubersjoe/react-github-calendar)
- Real-time contribution stats streamed straight from GitHub

### 📝 Blogs *(Coming Soon)*
> ✍️ A full **technical blog engine** is in the works — with MDX support, syntax-highlighted code snippets, tags, reading time, and article filtering. Stay tuned!

### ✉️ Contact Page
- Direct email link and social handles (GitHub, LinkedIn) all reachable in one click

### ⚡ Performance & DX
- Built on **Next.js 16 App Router** with **React 19 Server Components**
- **TypeScript-first** throughout — fully typed data models, props, and utilities
- **CSS Modules** for scoped, maintainable styles — no global leakage
- Optimized fonts via `next/font` and images via `next/image`
- Deployed on **Vercel** with automatic previews on every push

---

## 🛠️ Tech Stack

| Layer          | Technology                                      |
| -------------- | ----------------------------------------------- |
| **Framework**  | Next.js 16 (App Router)                         |
| **Language**   | TypeScript 5                                    |
| **UI**         | React 19, CSS Modules                           |
| **Icons**      | react-icons (VSCode icon set)                   |
| **GitHub API** | react-github-calendar                           |
| **AI SDK**     | @anthropic-ai/sdk                               |
| **Deployment** | Vercel                                          |
| **Linting**    | ESLint 9 + eslint-config-next                   |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm, pnpm, yarn, or bun

### 1. Clone the repository
```bash
git clone https://github.com/anshvarshney1502/Portfolio-Blog.git
cd Portfolio-Blog
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_GITHUB_USERNAME=anshvarshney1502
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the portfolio live. Edits reload automatically via **Next.js hot module replacement**.

---

## 📜 Available Scripts

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start the local dev server on port 3000  |
| `npm run build` | Build for production                     |
| `npm run start` | Start the production build               |
| `npm run lint`  | Lint the codebase using ESLint           |

---

## 🌐 Deployment

This site is deployed on **Vercel** with continuous deployment from the `main` branch of this repo.

Every push automatically:
- ✅ Runs typecheck & build
- ✅ Deploys a preview URL for pull requests
- ✅ Promotes to production on merge to `main`

**Production URL:** [https://anshvarshneyportfolio-blog.vercel.app/](https://anshvarshneyportfolio-blog.vercel.app/)

---

## 📂 Project Structure

```
Portfolio-Blog/
├── app/                    # Next.js App Router pages
│   ├── about/              # About page
│   ├── articles/           # Articles / blog listing (blogs coming soon)
│   ├── contact/            # Contact page
│   ├── projects/           # Projects showcase
│   └── page.tsx            # Home page
├── components/             # Reusable UI components
├── data/                   # Static data (projects, articles, etc.)
├── lib/                    # Utility functions & helpers
├── public/                 # Static assets (logos, images)
└── styles/                 # CSS Modules & global styles
```

---

## 🤝 Contributing

This is a personal portfolio, but bug reports, feature ideas, and pull requests are always welcome!

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/awesome-idea`)
3. Commit your changes (`git commit -m "feat: add awesome idea"`)
4. Push to the branch (`git push origin feature/awesome-idea`)
5. Open a Pull Request

Please read the [Code of Conduct](./CODE_OF_CONDUCT.md) before contributing.

---

## 📬 Connect with Me

- 🌐 **Portfolio:** [anshvarshneyportfolio-blog.vercel.app](https://anshvarshneyportfolio-blog.vercel.app/)
- 💼 **LinkedIn:** [linkedin.com/in/anshvarshneyy](https://www.linkedin.com/in/anshvarshneyy/)
- 🐙 **GitHub:** [@anshvarshney1502](https://github.com/anshvarshney1502)
- 📧 **Email:** [anshvarshney1502@gmail.com](mailto:anshvarshney1502@gmail.com)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

**Built with ❤️ and lots of ☕ by [Ansh Varshney](https://github.com/anshvarshney1502)**

⭐ Star this repo if you find it useful!

</div>
