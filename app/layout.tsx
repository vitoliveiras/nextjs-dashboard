import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

// Any UI added to to the RootLayout will be shared across all pages in the application, and RootLayout can be used to modify html and body tags, in addition to adding metadata
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
