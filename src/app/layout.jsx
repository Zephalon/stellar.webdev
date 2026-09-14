import { Fira_Mono, Fira_Sans, Playfair_Display } from 'next/font/google';
import SolarSystem from '@/components/SolarSystem';
import { getAllContentHtml } from '@/lib/markdown';
import '@/styles/app.scss';

const fira_sans = Fira_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-text',
  display: 'swap'
});

const playfair_display = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-headline',
  display: 'swap'
});

const fira_mono = Fira_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-monospace',
  display: 'swap'
});

export const metadata = {
  title: {
    default: 'Portfolio von Fabian Prinz-Arnold',
    template: '%s – Portfolio von Fabian Prinz-Arnold'
  },
  description: 'Fullstack Webdev - Selbstdarstellung und Arbeitsbeispiele von Fabian Prinz-Arnold',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/android-chrome-192x192.png'
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000'
};

export default async function RootLayout({ children }) {
  // the markdown is rendered at build time, so the content ships inside the HTML
  const content_html = await getAllContentHtml();
  const font_variables = [fira_sans.variable, playfair_display.variable, fira_mono.variable].join(' ');

  return (
    <html lang="de" className={font_variables}>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div className="app">
          <SolarSystem content_html={content_html} />
          {children}
        </div>
      </body>
    </html>
  );
}
