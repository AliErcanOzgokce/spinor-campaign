import type { Metadata } from "next";
import { Space_Grotesk, Syne } from 'next/font/google';
import "./globals.css";
import Navbar from '../components/Navbar';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
});

export const metadata: Metadata = {
  title: "spinor",
  description: "AI Yield Trading Agent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${syne.variable} font-sans antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
