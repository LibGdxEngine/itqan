'use client';

import StructuredData from './StructuredData';

const CourseSchema = ({ course }) => {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course?.title || "دورة تدريبية",
    "description": course?.description || "دورة تدريبية عالية الجودة",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "إتقان - منصة التعلم الإلكتروني",
      "url": "https://إتقان.com"
    },
    "instructor": {
      "@type": "Person",
      "name": course?.instructor?.name || "مدرب محترف",
      "description": course?.instructor?.bio || "مدرب محترف في المجال التقني"
    },
    "courseMode": "online",
    "educationalLevel": "beginner",
    "inLanguage": "ar",
    "isAccessibleForFree": course?.isFree || false,
    "offers": {
      "@type": "Offer",
      "price": course?.price || "0",
      "priceCurrency": "SAR",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": course?.rating ? {
      "@type": "AggregateRating",
      "ratingValue": course.rating,
      "ratingCount": course.ratingCount || 1
    } : undefined,
    "image": course?.image || "https://إتقان.com/default-course.jpg",
    "url": `https://إتقان.com/courses/${course?.slug || 'course'}`
  };

  // Remove undefined properties
  const cleanSchema = Object.fromEntries(
    Object.entries(courseSchema).filter(([_, value]) => value !== undefined)
  );

  return <StructuredData data={cleanSchema} />;
};

export default CourseSchema;
