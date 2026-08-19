import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

import Layout from '@/components/Layout';

import '@/styles/globals.css';
import '@/styles/themes.css';
import '@/styles/tokens.css';

/*
 * Inter carries the chrome (menus, tabs, status bar) — it is the face modern
 * desktop apps are set in and it holds up at 11-13px where Source Sans Pro
 * starts to blur. JetBrains Mono stays on everything that is meant to read as
 * code: the editor body and the terminal.
 */
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ui',
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Ansh Varshney | Portfolio',
    template: 'Ansh Varshney | %s',
  },
  description:
    'Building intelligent software with data, AI, and open source. BS in Data Science @ IIT Madras | Summer Intern @ IIT Ropar | Open Source Contributor @ ECSoC.',
  keywords: [
    'Ansh Varshney',
    'anshvarshney1502',
    'Ansh',
    'Varshney',
    'IIT Madras',
    'IIT Ropar',
    'Data Science',
    'AI',
    'Machine Learning',
    'Open Source',
    'ECSoC',
    'Ansh Varshney Portfolio',
    'vscode-portfolio',
  ],
  openGraph: {
    title: "Ansh Varshney's Portfolio",
    description:
      'Building intelligent software with data, AI, and open source.',
    images: ['https://imgur.com/4zi5KkQ.png'],
    url: 'https://anshvarshneyportfolio-blog.vercel.app/',
    type: 'website',
  },
  metadataBase: new URL('https://anshvarshneyportfolio-blog.vercel.app'),
  twitter: {
    card: 'summary_large_image',
  },
};

const themeScript = `
  (function() {
    try {
      var userTheme = localStorage.getItem('user_selected_theme');
      if (userTheme) {
        document.documentElement.setAttribute('data-theme', userTheme);
      } else {
        document.documentElement.setAttribute('data-theme', 'night-owl');
        localStorage.setItem('theme', 'night-owl');
      }
    } catch(e) {
      document.documentElement.setAttribute('data-theme', 'night-owl');
    }
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="night-owl"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
