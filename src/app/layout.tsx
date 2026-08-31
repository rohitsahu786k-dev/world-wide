import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { LanguageProvider } from "@/context/LanguageContext";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Worldwide Supply 28 SL | Luxury Wholesale & International Distribution",
    template: "%s | Worldwide Supply 28 SL",
  },
  description: "Your trusted partner in luxury perfumery, cosmetics, skincare, fine wines & spirits, and lifestyle products. Based in Valencia, Spain with global distribution.",
  alternates: { canonical: site.url },
  openGraph: {
    title: "Worldwide Supply 28 SL | Luxury Wholesale & International Distribution",
    description: "Your trusted partner in luxury perfumery, cosmetics, skincare, fine wines & spirits, and lifestyle products. Based in Valencia, Spain with global distribution.",
    url: site.url,
    siteName: site.name,
    images: [{ url: "/images/hero-luxury-unbranded-banner.jpg", width: 1200, height: 630, alt: "Worldwide Supply 28 SL international luxury wholesale" }],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full bg-white text-[#0B192C]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <LanguageProvider>
          <ScrollProgress />
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
