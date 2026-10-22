import './globals.css';

const title = 'Yazid Denny Troya — Web & Mobile Developer';
const description =
  'Full-stack developer building web applications with Laravel, React, Next.js, and Flutter.';

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title,
    description,
  },
};

export const viewport = {
  themeColor: '#121010',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative bg-ink text-paper antialiased">
        {children}
      </body>
    </html>
  );
}
