'use client';

import StructuredData from './StructuredData';

const WebsiteSchema = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "إتقان - منصة التعلم الإلكتروني",
    "alternateName": "Itqan Learning Platform",
    "description": "منصة إتقان للتعلم الإلكتروني - دورات تدريبية عالية الجودة في البرمجة والتقنية",
    "url": "https://إتقان.com",
    "logo": "https://إتقان.com/itqan_logo.png",
    "image": "https://إتقان.com/og-image.jpg",
    "sameAs": [
      "https://www.facebook.com/إتقان",
      "https://www.twitter.com/إتقان",
      "https://www.linkedin.com/company/إتقان"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+201061987462",
      "contactType": "customer service",
      "availableLanguage": ["Arabic", "English"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SA",
      "addressLocality": "الرياض"
    },
    "offers": {
      "@type": "Offer",
      "category": "Online Courses",
      "description": "دورات تدريبية في البرمجة والتقنية"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "دورات إتقان",
      "itemListElement": [
        {
          "@type": "Course",
          "name": "دورات البرمجة",
          "description": "دورات شاملة في البرمجة والتطوير"
        },
        {
          "@type": "Course", 
          "name": "دورات التقنية",
          "description": "دورات في التقنيات الحديثة"
        }
      ]
    }
  };

  return <StructuredData data={websiteSchema} />;
};

export default WebsiteSchema;
