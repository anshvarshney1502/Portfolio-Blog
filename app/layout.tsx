import type { Metadata } from 'next';

import Layout from '@/components/Layout';

import '@/styles/globals.css';
import '@/styles/themes.css';

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
    url: 'https://github.com/anshvarshney1502/vscode-portfolio',
  },
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
    <html lang="en" data-theme="night-owl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
