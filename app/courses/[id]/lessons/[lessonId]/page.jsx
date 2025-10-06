"use client";

import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import apiClient from "@/app/lib/api/client";
import {PlayCircle, BookOpen, Clock} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import VideoPlayer from "@/app/components/course/VideoPlayer";

export default function LessonDetail() {
    const {id, lessonId} = useParams(); // url: /courses/[id]/lessons/[lessonId]
    const router = useRouter();

    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchLesson() {
            try {
                const res = await apiClient.get(
                    `/courses/${id}/lessons/${lessonId}/`
                );
                setLesson(res.data);
            } catch (err) {
                console.error("Error fetching lesson:", err);
                setError("تعذر تحميل الدرس");
            } finally {
                setLoading(false);
            }
        }

        if (id && lessonId) fetchLesson();
    }, [id, lessonId]);

    if (loading) return <p className="text-center py-20">جارٍ التحميل...</p>;
    if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
    if (!lesson) return <p className="text-center py-20">لم يتم العثور على الدرس</p>;


    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            <Navbar />
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
                {/* Main Content */}
                <div className="flex-1 p-6 lg:p-10">
                    <h1 className="text-2xl font-bold mb-4 text-gray-900">
                        {lesson.title}
                    </h1>

                    {/* Video Player */}
                    <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg mb-6 bg-black">
                        <VideoPlayer url={lesson.video_url} />
                    </div>

                    {/* Metadata */}
                    <div className="space-y-4 text-gray-700">
                        <p>{lesson.content}</p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4"/> الترتيب: {lesson.order}
              </span>
                            <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4"/>
                                {lesson.is_preview ? "معاينة مجانية" : "محتوى كامل"}
              </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
