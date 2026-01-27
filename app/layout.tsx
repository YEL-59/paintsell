import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Artis - Digital Art Gallery",
  description: "Discover timeless art and creativity",
};

import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${lato.variable} font-serif antialiased`}
      >
        <SmoothScroll>{children}</SmoothScroll>
        <Toaster 
          position="top-center" 
          richColors 
          closeButton
          toastOptions={{
            style: {
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(0, 29, 53, 0.1)',
              borderRadius: '16px',
              padding: '16px 20px',
              color: '#001D35',
              fontFamily: 'var(--font-lato)',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            },
            className: "premium-toast",
          }}
        />
      </body>
    </html>
  );
}



