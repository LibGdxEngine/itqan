// SEO utility functions

export const generateMetadata = (pageData) => {
  const {
    title,
    description,
    keywords = [],
    canonical,
    ogImage,
    ogType = 'website',
    noindex = false
  } = pageData;

  const fullTitle = title ? `${title} | إتقان - منصة التعلم الإلكتروني` : 'إتقان - منصة التعلم الإلكتروني';
  const fullDescription = description || 'منصة إتقان للتعلم الإلكتروني - دورات تدريبية عالية الجودة في العلوم الشرعية';
  const fullCanonical = canonical || 'https://إتقان.com';
  const fullOgImage = ogImage || 'https://إتقان.com/og-image.jpg';

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
    canonical: fullCanonical,
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      type: ogType,
      url: fullCanonical,
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'ar_SA',
      siteName: 'إتقان',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [fullOgImage],
    },
    robots: noindex ? 'noindex,nofollow' : 'index,follow',
    alternates: {
      canonical: fullCanonical,
    },
  };
};

export const generateCourseSchema = (course) => {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title,
    "description": course.description,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "إتقان - منصة التعلم الإلكتروني",
      "url": "https://إتقان.com"
    },
    "instructor": {
      "@type": "Person",
      "name": course.instructor?.name || "مدرب محترف",
      "description": course.instructor?.bio || "مدرب محترف في المجال التقني"
    },
    "courseMode": "online",
    "educationalLevel": course.level || "beginner",
    "inLanguage": "ar",
    "isAccessibleForFree": course.isFree || false,
    "offers": {
      "@type": "Offer",
      "price": course.price || "0",
      "priceCurrency": "SAR",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": course.rating ? {
      "@type": "AggregateRating",
      "ratingValue": course.rating,
      "ratingCount": course.ratingCount || 1
    } : undefined,
    "image": course.image || "https://إتقان.com/default-course.jpg",
    "url": `https://إتقان.com/courses/${course.slug}`
  };
};

export const generateBreadcrumbSchema = (items) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "إتقان - منصة التعلم الإلكتروني",
    "alternateName": "Itqan Learning Platform",
    "description": "منصة إتقان للتعلم الإلكتروني - دورات تدريبية عالية الجودة في العلوم الشرعية",
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
    }
  };
};

// SEO-friendly URL generation
export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
};

// Meta description optimization
export const optimizeDescription = (description, maxLength = 160) => {
  if (description.length <= maxLength) return description;
  
  const truncated = description.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
};

// Title optimization
export const optimizeTitle = (title, maxLength = 60) => {
  if (title.length <= maxLength) return title;
  
  const truncated = title.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
};
