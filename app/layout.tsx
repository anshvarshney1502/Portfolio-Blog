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
        document.documentElement.setAttribute('data-theme', 'dark-hc');
        localStorage.setItem('theme', 'dark-hc');
      }
    } catch(e) {
      document.documentElement.setAttribute('data-theme', 'dark-hc');
    }
    try {
      var c = JSON.parse(localStorage.getItem('ide_customization_v1') || '{}');
      var root = document.documentElement;
      if (c.accentColor) {
        root.style.setProperty('--accent-color', c.accentColor);
        var hex = c.accentColor.replace('#','');
        var r=parseInt(hex.slice(0,2),16), g=parseInt(hex.slice(2,4),16), b=parseInt(hex.slice(4,6),16);
        root.style.setProperty('--accent-color-rgb', r+', '+g+', '+b);
        var lum=(0.299*r+0.587*g+0.114*b)/255;
        root.style.setProperty('--button-text', lum>0.55?'#000000':'#ffffff');
        root.style.setProperty('--button-bg', c.accentColor);
      }
      if (c.textColor) root.style.setProperty('--text-color', c.textColor);
      if (c.fontSize && c.fontSize !== 16) {
        root.style.fontSize = c.fontSize + 'px';
      }
      if (c.fontBold) root.style.fontWeight = '600';
      if (c.fontItalic) root.style.fontStyle = 'italic';
      if (c.uiFont) {
        var link=document.createElement('link');
        link.rel='stylesheet';
        link.href='https://fonts.googleapis.com/css2?family='+encodeURIComponent(c.uiFont)+':wght@300;400;500;600;700&display=swap';
        document.head.appendChild(link);
        root.style.setProperty('--font-ui','"'+c.uiFont+'", system-ui, -apple-system, sans-serif');
      }
    } catch(e2) {}
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
      data-theme="dark-hc"
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
