import './globals.css';
import StarfieldBackground from '@/components/StarfieldBackground';

export const metadata = {
  title: 'Yazid Denny Troya — Web & Mobile Developer',
  description: 'Full-stack developer building web applications with Laravel, React, Next.js, and Flutter.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="relative bg-ink text-paper antialiased">
        <StarfieldBackground />
        {children}
      </body>
    </html>
  );
}