import type { Metadata } from "next";
import type { ReactNode } from "react";
import { FloatingWhatsApp, Footer, Header } from "../components/site-chrome";
import { siteOrigin } from "../lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteOrigin ? new URL(siteOrigin) : undefined,
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <a className="skip-link" href="#main">Перейти к содержанию</a>
        <Header />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
