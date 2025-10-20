import { Geist, Geist_Mono, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import NProgressProvider from "./providers/NProgressProvider";

const notoKufi = Noto_Kufi_Arabic({
    subsets: ["arabic"],
    weight: ["400", "500", "600", "700"], // choose weights you need
    variable: "--font-noto-kufi",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "إتقان - منصة التعلم الإلكتروني",
    template: "%s | إتقان - منصة التعلم الإلكتروني"
  },
  description: "منصة إتقان للتعلم الإلكتروني - دورات تدريبية عالية الجودة في البرمجة والتقنية. تعلم مع أفضل المدربين واحصل على شهادات معتمدة.",
  keywords: ["تعلم إلكتروني", "دورات تدريبية", "برمجة", "تقنية", "شهادات", "إتقان", "تعليم أونلاين"],
  authors: [{ name: "إتقان للتعلم الإلكتروني" }],
  creator: "إتقان للتعلم الإلكتروني",
  publisher: "إتقان",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://إتقان.com'),
  alternates: {
    canonical: '/',
    languages: {
      'ar-SA': '/',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://إتقان.com',
    title: 'إتقان - منصة التعلم الإلكتروني',
    description: 'منصة إتقان للتعلم الإلكتروني - دورات تدريبية عالية الجودة في البرمجة والتقنية. تعلم مع أفضل المدربين واحصل على شهادات معتمدة.',
    siteName: 'إتقان',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'إتقان - منصة التعلم الإلكتروني',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'إتقان - منصة التعلم الإلكتروني',
    description: 'منصة إتقان للتعلم الإلكتروني - دورات تدريبية عالية الجودة في البرمجة والتقنية.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WhatsAppButton from './components/WhatsAppButton';
import WebsiteSchema from './components/SEO/WebsiteSchema';

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir={`rtl`}>
      <body
        className={`${notoKufi.variable} ${notoKufi.variable} antialiased`}
      >
      <NProgressProvider />
        <WebsiteSchema />
        {children}
        <WhatsAppButton />
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
      </body>
    </html>
  );
}
