'use client';

import Head from 'next/head';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  canonical, 
  ogImage, 
  ogType = 'website',
  noindex = false 
}) => {
  const fullTitle = title ? `${title} | إتقان - منصة التعلم الإلكتروني` : 'إتقان - منصة التعلم الإلكتروني';
  const fullDescription = description || 'منصة إتقان للتعلم الإلكتروني - دورات تدريبية عالية الجودة في البرمجة والتقنية';
  const fullCanonical = canonical || 'https://إتقان.com';
  const fullOgImage = ogImage || 'https://إتقان.com/og-image.jpg';

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="إتقان" />
      <meta property="og:locale" content="ar_SA" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Additional SEO */}
      <meta name="author" content="إتقان للتعلم الإلكتروني" />
      <meta name="publisher" content="إتقان" />
      <meta name="copyright" content="إتقان للتعلم الإلكتروني" />
      <meta name="language" content="Arabic" />
      <meta name="geo.region" content="EG" />
      <meta name="geo.placename" content="مصر" />
    </Head>
  );
};

export default SEOHead;
