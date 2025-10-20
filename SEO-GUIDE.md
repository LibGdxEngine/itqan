# SEO Optimization Guide

This guide covers the comprehensive SEO optimizations implemented in the Next.js application.

## 🎯 SEO Features Implemented

### 1. **Metadata & Open Graph**
- ✅ Comprehensive meta tags
- ✅ Open Graph for social sharing
- ✅ Twitter Cards
- ✅ Canonical URLs
- ✅ Language and locale settings
- ✅ Search engine verification

### 2. **Structured Data (JSON-LD)**
- ✅ Organization schema
- ✅ Course schema
- ✅ Breadcrumb navigation
- ✅ Educational organization markup

### 3. **Technical SEO**
- ✅ Sitemap.xml generation
- ✅ Robots.txt configuration
- ✅ Performance optimizations
- ✅ Core Web Vitals monitoring
- ✅ Image optimization
- ✅ Caching strategies

### 4. **Content SEO**
- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy
- ✅ Alt text for images
- ✅ Internal linking structure
- ✅ URL optimization

## 📁 File Structure

```
app/
├── components/SEO/
│   ├── StructuredData.jsx      # JSON-LD wrapper
│   ├── WebsiteSchema.jsx       # Organization schema
│   ├── CourseSchema.jsx        # Course schema
│   ├── BreadcrumbSchema.jsx    # Breadcrumb schema
│   ├── SEOHead.jsx            # SEO head component
│   ├── JsonLd.jsx             # JSON-LD component
│   └── WebVitals.jsx          # Performance monitoring
├── lib/
│   └── seo.js                 # SEO utility functions
├── sitemap.js                 # Dynamic sitemap
├── robots.js                  # Robots.txt
└── layout.js                  # Root layout with metadata
```

## 🚀 Usage Examples

### Basic Page SEO
```jsx
import { generateMetadata } from '@/app/lib/seo';

export async function generateMetadata({ params }) {
  return generateMetadata({
    title: 'Page Title',
    description: 'Page description',
    keywords: ['keyword1', 'keyword2'],
    canonical: 'https://إتقان.com/page',
  });
}
```

### Course Page with Schema
```jsx
import CourseSchema from '@/app/components/SEO/CourseSchema';
import JsonLd from '@/app/components/SEO/JsonLd';

export default function CoursePage({ course }) {
  const courseSchema = generateCourseSchema(course);
  
  return (
    <>
      <JsonLd data={courseSchema} />
      {/* Your page content */}
    </>
  );
}
```

### Breadcrumb Navigation
```jsx
import BreadcrumbSchema from '@/app/components/SEO/BreadcrumbSchema';

const breadcrumbItems = [
  { name: 'الرئيسية', url: 'https://إتقان.com' },
  { name: 'الدورات', url: 'https://إتقان.com/courses' },
  { name: 'دورة البرمجة', url: 'https://إتقان.com/courses/programming' }
];

<BreadcrumbSchema items={breadcrumbItems} />
```

## 🔧 Configuration

### Environment Variables
```bash
# Add to .env
NEXT_PUBLIC_API_URL=https://إتقان.com
API_BASE_URL=https://api.إتقان.com
```

### Next.js Configuration
The `next.config.mjs` includes:
- Image optimization
- Compression
- Security headers
- Caching strategies
- Performance optimizations

## 📊 Performance Monitoring

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Monitoring Implementation
```jsx
import { reportWebVitals } from '@/app/components/SEO/WebVitals';

// In your _app.js or layout
export { reportWebVitals };
```

## 🎨 Image Optimization

### Next.js Image Component
```jsx
import Image from 'next/image';

<Image
  src="/course-image.jpg"
  alt="وصف الدورة التدريبية"
  width={800}
  height={600}
  priority={true} // For above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Lazy Loading
```jsx
<Image
  src="/image.jpg"
  alt="وصف الصورة"
  loading="lazy"
  className="lazy"
  data-src="/image.jpg"
/>
```

## 🔍 SEO Best Practices

### 1. **Content Structure**
- Use semantic HTML5 elements
- Proper heading hierarchy (H1 → H2 → H3)
- Descriptive alt text for images
- Internal linking between related content

### 2. **URL Structure**
- Clean, descriptive URLs
- Use hyphens instead of underscores
- Include relevant keywords
- Avoid deep nesting

### 3. **Page Speed**
- Optimize images (WebP, AVIF)
- Minimize CSS and JavaScript
- Use CDN for static assets
- Implement caching strategies

### 4. **Mobile Optimization**
- Responsive design
- Touch-friendly interface
- Fast loading on mobile
- Proper viewport configuration

## 📈 Analytics Integration

### Google Analytics 4
```jsx
// Add to layout.js
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

### Search Console
Add verification meta tag to layout.js:
```jsx
<meta name="google-site-verification" content="your-verification-code" />
```

## 🛠️ Tools & Testing

### SEO Testing Tools
- Google PageSpeed Insights
- Google Search Console
- Lighthouse (Chrome DevTools)
- GTmetrix
- Screaming Frog SEO Spider

### Local Testing
```bash
# Install lighthouse CLI
npm install -g lighthouse

# Run lighthouse audit
lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html
```

## 📋 Checklist

### On-Page SEO
- [ ] Title tags (50-60 characters)
- [ ] Meta descriptions (150-160 characters)
- [ ] Header tags (H1, H2, H3)
- [ ] Alt text for images
- [ ] Internal linking
- [ ] URL structure
- [ ] Page loading speed
- [ ] Mobile responsiveness

### Technical SEO
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Canonical URLs
- [ ] Structured data
- [ ] HTTPS implementation
- [ ] XML sitemap
- [ ] Schema markup
- [ ] Core Web Vitals

### Content SEO
- [ ] Keyword research
- [ ] Content quality
- [ ] Fresh content updates
- [ ] User engagement metrics
- [ ] Social sharing optimization
- [ ] Local SEO (if applicable)

## 🚀 Deployment Considerations

### Production Checklist
- [ ] SSL certificate installed
- [ ] CDN configured
- [ ] Caching enabled
- [ ] Compression enabled
- [ ] Analytics tracking
- [ ] Search Console verified
- [ ] Sitemap submitted
- [ ] Robots.txt accessible

### Monitoring
- [ ] Core Web Vitals tracking
- [ ] Search ranking monitoring
- [ ] Traffic analytics
- [ ] Error monitoring
- [ ] Performance monitoring

## 📞 Support

For SEO-related questions or optimizations, refer to:
- [Next.js SEO Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)
