import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "../providers/query-provider";
import { Toaster } from 'sonner';
import { AuthProvider } from '@/features/auth/auth-provider';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'SupportIQ | AI Customer Support',
  description:
    'AI-powered customer support platform with intelligent knowledge retrieval, ticket management, and support automation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <html lang="en" className="dark">
      <body className="min-h-full flex flex-col">
  <QueryProvider>
    <AuthProvider>

      {children}

    </AuthProvider>
    <Toaster
      position="top-right"
      richColors
      closeButton
    />
  </QueryProvider>
</body>
    </html>
  );
}
