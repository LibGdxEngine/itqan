"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import apiClient from "@/app/lib/api/client";
import CourseHeader from "@/app/components/course/CourseHeader";
import InstructorSection from "@/app/components/course/InstructorSection";
import ModulesSection from "@/app/components/course/ModulesSection";
import FAQSection from "@/app/components/course/FAQSection";
import CourseSidebar from "@/app/components/course/CourseSidebar";

export default function CourseDetail() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [expandedFaq, setExpandedFaq] = useState(null);
    const [expandedModule, setExpandedModule] = useState(null);

    useEffect(() => {
        async function fetchCourse() {
            try {
                const res = await apiClient.get(`/courses/${id}/`);
                setCourse(res.data);
            } catch (err) {
                console.error("Failed to fetch course:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchCourse();
    }, [id]);

    if (loading) return <p className="text-center py-20">جارٍ التحميل...</p>;
    if (error) return <p className="text-center py-20 text-red-500">حدث خطأ أثناء تحميل الدورة</p>;
    if (!course) return <p className="text-center py-20">لم يتم العثور على الدورة</p>;
    console.log(course)
    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">

            <CourseHeader
                title={course.title}
                shortDescription={course.short_description}
                cover_photo={course.cover_image}
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <InstructorSection instructor={course.professors[0]} />

                        <ModulesSection
                            modules={course.modules}
                            expandedModule={expandedModule}
                            toggleModule={(i) =>
                                setExpandedModule(expandedModule === i ? null : i)
                            }
                            courseId={course.id}
                        />

                        <FAQSection
                            faqs={course.faqs}
                            expandedFaq={expandedFaq}
                            toggleFaq={(i) => setExpandedFaq(expandedFaq === i ? null : i)}
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
