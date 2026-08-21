import { Metadata } from 'next';
import Image from 'next/image';
import GitHubCalendar from 'react-github-calendar';
import { VscRepo, VscPerson, VscStarEmpty, VscRepoForked, VscLinkExternal, VscGithub } from 'react-icons/vsc';

import RepoCard from '@/components/RepoCard';
import { Repo, User } from '@/types';

import styles from '@/styles/GithubPage.module.css';

export const metadata: Metadata = {
  title: 'GitHub',
};

export const revalidate = 60; // Refresh live data every 60 seconds

const FALLBACK_USER: User = {
  login: 'anshvarshney1502',
  avatar_url: 'https://avatars.githubusercontent.com/u/269888487?v=4',
  public_repos: 4,
  followers: 2,
};

const FALLBACK_REPOS: Repo[] = [
  {
    id: 1308316279,
    name: 'Portfolio-Blog',
    html_url: 'https://github.com/anshvarshney1502/Portfolio-Blog',
    description: 'VS Code themed developer portfolio & blog built with Next.js and CSS Modules.',
    stargazers_count: 0,
    forks: 0,
    language: 'TypeScript',
    watchers: 0,
    homepage: 'https://github.com/anshvarshney1502/Portfolio-Blog',
  },
  {
    id: 1302854378,
    name: 'cs9',
    html_url: 'https://github.com/anshvarshney1502/cs9',
    description: 'A crowdsourced FAQ solution portal developed by VINS interns of VLED, IIT Ropar - Summer 2026.',
    stargazers_count: 0,
    forks: 0,
    language: 'TypeScript',
    watchers: 0,
    homepage: 'https://github.com/anshvarshney1502/cs9',
  },
  {
    id: 1302853765,
    name: 'Memori',
    html_url: 'https://github.com/anshvarshney1502/Memori',
    description: 'Agent-native memory infrastructure. LLM-agnostic layer turning agent execution into structured persistent state.',
    stargazers_count: 0,
    forks: 0,
    language: 'Python',
    watchers: 0,
    homepage: 'https://memorilabs.ai',
  },
  {
    id: 1302852840,
    name: 'PYBE',
    html_url: 'https://github.com/anshvarshney1502/PYBE',
    description: 'PyBe is a scenario-driven Python learning prototype built for interactive coding practice.',
    stargazers_count: 0,
    forks: 0,
    language: 'JavaScript',
    watchers: 0,
    homepage: 'https://github.com/anshvarshney1502/PYBE',
  },
];

async function getGithubData() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'anshvarshney1502';
  const token = process.env.GITHUB_API_KEY;
  const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const [userRes, repoRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        signal: controller.signal,
        next: { revalidate: 60 },
      }),
      fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=10`, {
        headers,
        signal: controller.signal,
        next: { revalidate: 60 },
      }),
    ]);

    clearTimeout(timeoutId);

    if (userRes.ok && repoRes.ok) {
      const user: User = await userRes.json();
      const repos: Repo[] = await repoRes.json();
      return { user, repos };
    }
  } catch (err) {
    console.warn('GitHub API live fetch fallback used:', err);
  }

  return { user: FALLBACK_USER, repos: FALLBACK_REPOS };
}

export default async function GithubPage() {
  const { user, repos } = await getGithubData();
  const username = user.login || 'anshvarshney1502';

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.profile}>
            <Image
              src={user.avatar_url || 'https://avatars.githubusercontent.com/u/269888487?v=4'}
              className={styles.avatar}
              alt={username}
              width={80}
              height={80}
              priority
            />
            <div className={styles.profileInfo}>
              <h1 className={styles.name}>{username}</h1>
              <span className={styles.handle}>@{username}</span>
            </div>
          </div>

          <a 
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.profileLink}
          >
            <VscGithub size={18} />
            <span>View Profile</span>
            <VscLinkExternal size={14} />
          </a>
        </header>

        {/* Contribution Graph */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Contribution Activity</h2>
          <div className={styles.contributions}>
            <GitHubCalendar
              username={username}
              colorScheme="dark"
              theme={{
                dark: ['#161B22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
              }}
              style={{ width: '100%', color: 'var(--text-secondary)' }}
              blockSize={9}
              blockMargin={2}
              fontSize={11}
            />
          </div>
        </section>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <VscRepo size={20} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{user.public_repos ?? 4}</span>
              <span className={styles.statLabel}>Repositories</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <VscPerson size={20} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{user.followers ?? 2}</span>
              <span className={styles.statLabel}>Followers</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <VscStarEmpty size={20} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>
                {repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0)}
              </span>
              <span className={styles.statLabel}>Total Stars</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <VscRepoForked size={20} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>
                {repos.reduce((acc, repo) => acc + (repo.forks || 0), 0)}
              </span>
              <span className={styles.statLabel}>Total Forks</span>
            </div>
          </div>
        </div>

        {/* Repositories */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Popular Repositories</h2>
            <a 
              href={`https://github.com/${username}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.viewAll}
            >
              View All
              <VscLinkExternal size={14} />
            </a>
          </div>
          
          <div className={styles.reposGrid}>
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
