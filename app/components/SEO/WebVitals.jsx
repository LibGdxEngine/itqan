'use client';

import { useEffect } from 'react';

export function reportWebVitals(metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
      });
    }

    // Example: Send to custom analytics endpoint
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metric),
    }).catch(console.error);
  }
}

const WebVitals = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadLinks = [
      '/fonts/noto-kufi-arabic.woff2',
      '/images/hero-bg.webp',
    ];

    preloadLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = href.includes('font') ? 'font' : 'image';
      if (href.includes('font')) {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    });

    // Optimize images loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));

    return () => {
      imageObserver.disconnect();
    };
  }, []);

  return null;
};

export default WebVitals;
