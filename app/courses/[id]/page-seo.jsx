import { notFound } from 'next/navigation';
import { generateMetadata as generateSEOMetadata, generateCourseSchema, generateBreadcrumbSchema } from '@/app/lib/seo';
import CourseHeader from "@/app/components/course/CourseHeader";
import InstructorSection from "@/app/components/course/InstructorSection";
import ModulesSection from "@/app/components/course/ModulesSection";
import FAQSection from "@/app/components/course/FAQSection";
import CourseSidebar from "@/app/components/course/CourseSidebar";
import CourseSchema from "@/app/components/SEO/CourseSchema";
import BreadcrumbSchema from "@/app/components/SEO/BreadcrumbSchema";
import JsonLd from "@/app/components/SEO/JsonLd";

// This would be your API call function
async function getCourse(id) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/courses/${id}/`, {
      cache: 'force-cache', // Enable caching for better performance
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error('Course not found');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const course = await getCourse(params.id);
  
  if (!course) {
    return {
      title: 'دورة غير موجودة',
      description: 'الدورة المطلوبة غير موجودة',
    };
  }

  const breadcrumbItems = [
    { name: 'الرئيسية', url: 'https://إتقان.com' },
    { name: 'الدورات', url: 'https://إتقان.com/courses' },
    { name: course.title, url: `https://إتقان.com/courses/${params.id}` }
  ];

  return generateSEOMetadata({
    title: course.title,
    description: course.short_description || course.description,
    keywords: [
      course.title,
      'دورة تدريبية',
      'تعلم إلكتروني',
      course.category || 'تقنية',
      'إتقان'
    ],
    canonical: `https://إتقان.com/courses/${params.id}`,
    ogImage: course.cover_image,
    ogType: 'article',
  });
}

export default async function CourseDetail({ params }) {
  const course = await getCourse(params.id);
  
  if (!course) {
    notFound();
  }

  const breadcrumbItems = [
    { name: 'الرئيسية', url: 'https://إتقان.com' },
    { name: 'الدورات', url: 'https://إتقان.com/courses' },
    { name: course.title, url: `https://إتقان.com/courses/${params.id}` }
  ];

  const courseSchema = generateCourseSchema(course);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Structured Data */}
      <JsonLd data={courseSchema} />
      <JsonLd data={breadcrumbSchema} />
      
      <CourseHeader
        title={course.title}
        shortDescription={course.short_description}
        cover_photo={course.cover_image}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <InstructorSection instructor={course.professors[0]}/>

            <ModulesSection
              modules={course.modules}
              courseId={course.id}
            />

            <FAQSection
              faqs={course.faqs}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <CourseSidebar
              price={course.price}
              duration={course.duration}
              modulesCount={course.modules?.length || 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
