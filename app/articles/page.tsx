import { Metadata } from 'next';
import { VscBook, VscLinkExternal, VscGlobe } from 'react-icons/vsc';

import ArticleCard from '@/components/ArticleCard';

import { Article } from '@/types';

import styles from '@/styles/ArticlesPage.module.css';

export const metadata: Metadata = {
  title: 'Articles',
};

export const revalidate = 60;

async function getArticles(): Promise<Article[]> {
  try {
    const apiKey = process.env.DEV_TO_API_KEY;
    const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;

    let res: Response;
    if (apiKey && apiKey.trim() !== '' && apiKey !== 'your-api-key') {
      res = await fetch('https://dev.to/api/articles/me/published?per_page=6', {
        headers: {
          'api-key': apiKey,
        },
      });
    } else {
      const url = username
        ? `https://dev.to/api/articles?username=${username}&per_page=6`
        : `https://dev.to/api/articles?per_page=6`;
      res = await fetch(url);
    }

    if (!res.ok) {
      return [];
    }

    return await res.json();
  } catch {
    return [];
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles();
  const totalViews = articles.reduce((sum, article) => sum + (article.page_views_count || 0), 0);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerMain}>
            <div className={styles.iconWrapper}>
              <VscBook className={styles.icon} size={24} />
            </div>
            
            <div className={styles.headerContent}>
              <div className={styles.headerTop}>
                <h1 className={styles.title}>Articles</h1>
                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <VscGlobe size={14} />
                    <span>{articles.length} posts</span>
                  </div>
                  <div className={styles.divider} />
                  <div className={styles.stat}>
                    <span>{totalViews.toLocaleString()} views</span>
                  </div>
                </div>
              </div>
              
              <p className={styles.subtitle}>
                Technical writing on web development, AI, and software engineering.
              </p>
            </div>
          </div>

          <a 
            href="https://github.com/anshvarshney1502"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.profileLink}
          >
            <span>GitHub Profile</span>
            <VscLinkExternal size={14} />
          </a>
        </header>

        <div className={styles.articlesList}>
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <ArticleCard 
                key={article.id} 
                article={article}
                index={index + 1}
              />
            ))
          ) : (
            <div style={{ color: 'rgba(255, 255, 255, 0.5)', padding: '24px 0', fontSize: '14px' }}>
              No published DEV.to articles found. Set up `DEV_TO_API_KEY` in `.env.local` to sync your posts.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
