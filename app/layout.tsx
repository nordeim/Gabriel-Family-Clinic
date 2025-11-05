import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Analytics, WebVitalsReporter } from "@/components/analytics";
import { StructuredData } from "@/components/seo/structured-data";

// Elder-friendly font configuration with display swap for performance
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Helvetica Neue",
    "sans-serif",
  ],
});

/**
 * Comprehensive SEO Metadata Configuration
 * Healthcare-specific with YMYL compliance and E-A-T signals
 */
export const metadata: Metadata = {
  // Basic metadata
  metadataBase: new URL('https://gabrielfamilyclinic.com'),
  title: {
    default: "Gabriel Family Clinic - Compassionate Healthcare for All Ages",
    template: "%s | Gabriel Family Clinic",
  },
  description: "Trusted family medicine with 35+ years of experience. Board-certified physicians providing comprehensive healthcare services across San Francisco, Oakland, and San Jose. Accessible, compassionate care for all ages.",
  
  // Healthcare keywords for SEO
  keywords: [
    "Gabriel Family Clinic",
    "family medicine",
    "primary care physician",
    "healthcare services",
    "family doctor",
    "medical clinic",
    "preventive care",
    "chronic disease management",
    "emergency medical care",
    "San Francisco healthcare",
    "Oakland medical clinic",
    "San Jose family medicine",
    "board certified physicians",
    "accessible healthcare",
    "senior care",
    "pediatric care",
    "wellness programs",
    "health screenings",
  ],
  
  // Author and publisher information (E-A-T signals)
  authors: [
    { 
      name: "Gabriel Family Clinic",
      url: "https://gabrielfamilyclinic.com",
    }
  ],
  creator: "Gabriel Family Clinic",
  publisher: "Gabriel Family Clinic",
  
  // Format detection
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  
  // OpenGraph metadata for social sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gabrielfamilyclinic.com",
    title: "Gabriel Family Clinic - Compassionate Healthcare for All Ages",
    description: "Trusted family medicine with 35+ years of experience. Board-certified physicians providing comprehensive healthcare services. Accessible care for all ages.",
    siteName: "Gabriel Family Clinic",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gabriel Family Clinic - Compassionate Healthcare",
        type: "image/png",
      },
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Family Clinic - Compassionate Healthcare for All Ages",
    description: "Trusted family medicine with 35+ years of experience. Board-certified physicians providing comprehensive healthcare services.",
    images: ["/og-image.png"],
    creator: "@gabrielclinic", // Add when Twitter account is created
    site: "@gabrielclinic",
  },
  
  // Robots directives
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Canonical URL
  alternates: {
    canonical: "https://gabrielfamilyclinic.com",
  },
  
  // Search engine verification codes
  verification: {
    google: "your-google-verification-code", // Add when available
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  
  // Additional metadata
  category: "Healthcare",
  classification: "Medical Services",
  
  // Other metadata
  other: {
    // Healthcare-specific metadata
    "medical-specialty": "Family Medicine, Primary Care",
    "service-area": "San Francisco, Oakland, San Jose",
    "years-experience": "35+",
    "accreditation": "Board Certified Physicians",
    // YMYL compliance
    "content-type": "Healthcare Information",
    "medical-disclaimer": "This website provides general information about healthcare services. Always consult with a qualified healthcare provider for medical advice.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Healthcare-specific meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Gabriel Clinic" />
        <meta name="theme-color" content="#0066cc" />
        
        {/* Accessibility metadata */}
        <meta name="accessibility" content="WCAG AAA compliant" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Structured Data - JSON-LD Schemas */}
        <StructuredData />
      </head>
      <body className="font-sans antialiased">
        {children}
        {/* Analytics and Performance Monitoring */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <WebVitalsReporter />
      </body>
    </html>
  );
}
