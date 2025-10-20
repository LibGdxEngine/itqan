"use client";

import { useCourses } from "@/app/hooks/useCourses";
import Image from "next/image";
import Link from "next/link";

export default function Courses() {
    const { courses, loading, error } = useCourses();

    if (loading) return <p className="text-center py-10">جارٍ تحميل الدورات...</p>;
    if (error) return <p className="text-center py-10 text-red-500">خطأ في تحميل الدورات</p>;

    return (
        <section id="courses" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="font-amiri text-3xl text-center text-blue-900 mb-4">
                    الدورات المسجلة
                </h2>
                <p className="text-center text-gray-600 mb-12">
                    اختر من بين مجموعة متنوعة من الدورات المسجلة
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {courses.map((c) => (
                        <Link
                            key={c.id}
                            href={`/courses/${c.slug || c.id}`} // fallback to id if slug missing
                            className="group bg-white rounded-2xl shadow hover:shadow-xl border border-blue-100 overflow-hidden transition flex flex-col cursor-pointer"
                        >
                            {/* Cover Image */}
                            <div className="relative h-48 w-full">
                                <Image
                                    src={c.cover_image}
                                    alt={c.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {c.is_published ? (
                                    <span className="absolute top-4 right-4 bg-green-600 text-white text-sm px-3 py-1 rounded-full shadow">
                    متاح
                  </span>
                                ) : (
                                    <span className="absolute top-4 right-4 bg-gray-500 text-white text-sm px-3 py-1 rounded-full shadow">
                    قريباً
                  </span>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-6 flex flex-col">
                                <h3 className="font-amiri text-xl text-blue-900 mb-2 group-hover:text-blue-700 transition">
                                    {c.title}
                                </h3>

                                {/* Professors */}
                                {c.professors?.length > 0 && (
                                    <div className="flex items-center gap-3 mb-4">
                                        <Image
                                            src={c.professors[0].image}
                                            alt={c.professors[0].name}
                                            width={40}
                                            height={40}
                                            className="rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="text-sm font-semibold text-gray-700">
                                                {c.professors[0].name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {c.professors[0].description}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Duration + Level */}
                                <div className="flex justify-between text-sm text-gray-500 mb-3">
                                    <span>⏱ {c.duration} ساعة</span>
                                    <span>📘 المستوى: {c.level}</span>
                                </div>

                                {/* Price */}
                                <div className="flex justify-between items-center mt-auto border-t border-blue-100 pt-3">
                                    <span className="font-bold text-blue-600">{c.price} درهم</span>
                                    <span className="px-4 py-2 rounded-lg bg-gradient-to-br from-blue-900 to-blue-500 text-white font-bold group-hover:from-blue-500 group-hover:to-blue-400 transition">
                    التسجيل الآن
                  </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
