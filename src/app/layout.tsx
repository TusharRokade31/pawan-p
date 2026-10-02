import type { Metadata } from 'next';
import './portfolio.css';

export const metadata: Metadata = {
  title: 'Pawan Tetgure | Video Editor & Motion Graphics Designer',
  description:
    'Elevating stories through precision editing, dynamic motion graphics, and cinematic storytelling. Based in Mumbai, available worldwide.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
