import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

// next.js will automatically add the title and metadata to the application
export const metadata: Metadata = {
  title: {
    // %s will be replaced with the specific page title (for example, Invoices title
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard'
  },
  description: 'The official Next.js Course Dashboard, build with App Router',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
}

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
