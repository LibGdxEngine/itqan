"use client";

import {useMyCourses} from "@/app/hooks/useMyCourses";
import Image from "next/image";

export default function MyCourses() {
    const { courses, loading, error } = useMyCourses();
    if (loading)
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-500">جاري تحميل الدورات...</p>
            </div>
        );

    if (error)
        return (
            <div className="flex justify-center items-center h-64 text-red-500">
                حدث خطأ أثناء تحميل الدورات.
            </div>
        );

    if (!courses.length)
        return (
            <div className="flex justify-center items-center h-64 text-gray-500">
                لم تسجل في أي دورة بعد.
            </div>
        );

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((purchase) => {
                    const course = purchase.course;
                    const progress = purchase.progress || 0; // optional if your API includes it

                    return (
                        <div
                            key={purchase.id}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200"
                        >
                            <div className="relative">
                                <Image
                                    src={course.cover_image || "/placeholder.svg"}
                                    alt={course.title}
                                    width={600}
                                    height={600}
                                    className="w-full h-32 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>

                            <div className="p-4 space-y-4">
                                <h3 className="font-semibold text-lg leading-tight text-gray-900">
                                    {course.title}
                                </h3>

                                {/* Course Progress */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>التقدم</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={() =>
                                        window.location.assign(`/courses/${course.slug}`)
                                    }
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    متابعة
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
