"use client";

import {useEffect, useState} from "react";
import {useParams} from "next/navigation";

import apiClient from "@/app/lib/api/client";
import CourseHeader from "@/app/components/course/CourseHeader";
import InstructorSection from "@/app/components/course/InstructorSection";
import ModulesSection from "@/app/components/course/ModulesSection";
import FAQSection from "@/app/components/course/FAQSection";
import CourseSidebar from "@/app/components/course/CourseSidebar";
import ErrorBoundary from "@/app/components/ErrorBoundary";
import {useUser} from "@/app/hooks/useUser";
import Image from "next/image";

export default function CourseDetail() {
    const {id} = useParams();
    const {user} = useUser();
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

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">جارٍ التحميل...</p>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
                <div className="max-w-md mx-auto text-center px-4">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="text-red-500 text-6xl mb-4">❌</div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            حدث خطأ أثناء تحميل الدورة
                        </h1>
                        <p className="text-gray-600 mb-6">
                            يرجى المحاولة مرة أخرى أو التواصل مع الدعم الفني.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            إعادة المحاولة
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    
    if (!course) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
                <div className="max-w-md mx-auto text-center px-4">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="text-gray-500 text-6xl mb-4">🔍</div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            لم يتم العثور على الدورة
                        </h1>
                        <p className="text-gray-600 mb-6">
                            الدورة المطلوبة غير موجودة أو تم حذفها.
                        </p>
                        <a
                            href="/courses"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                        >
                            العودة إلى الدورات
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <ErrorBoundary>
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
                            {course.professors && course.professors.length > 0 && (
                                <InstructorSection instructor={course.professors[0]}/>
                            )}

                            <ModulesSection
                                modules={course.modules || []}
                                expandedModule={expandedModule}
                                toggleModule={(i) =>
                                    setExpandedModule(expandedModule === i ? null : i)
                                }
                                courseId={course.id}
                                is_unlocked={course.is_unlocked}
                                is_authenticated={user !== null}
                            />

                            <FAQSection
                                faqs={course.faqs || []}
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
        </ErrorBoundary>
    );
}
