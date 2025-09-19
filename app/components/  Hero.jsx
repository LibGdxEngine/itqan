"use client";
import { useState, useEffect } from "react";

export default function Hero() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section id="home" className="relative min-h-screen mt-16 bg-white overflow-hidden" dir="rtl">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Geometric Pattern */}
                <div className="absolute top-20 right-0 w-96 h-96 opacity-5">
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full transform rotate-45"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-80 h-80 opacity-5">
                    <div className="w-full h-full bg-gradient-to-tr from-blue-600 to-cyan-600 rounded-full"></div>
                </div>

                {/* Decorative Arabic Calligraphy Pattern (SVG) */}
                <svg className="absolute top-40 left-10 w-32 h-32 text-blue-100 opacity-30" viewBox="0 0 100 100">
                    <pattern id="islamic-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                        <polygon points="25,5 45,25 25,45 5,25" fill="currentColor" opacity="0.3"/>
                        <circle cx="25" cy="25" r="5" fill="currentColor" opacity="0.2"/>
                    </pattern>
                    <rect width="100" height="100" fill="url(#islamic-pattern)"/>
                </svg>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Content Section */}
                    <div className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full border border-blue-200">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            <span className="text-sm font-medium text-blue-700">التسجيل مفتوح الآن</span>
                        </div>

                        {/* Main Heading */}
                        <div className="space-y-4">
                            <h1 className="font-amiri text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                                <span className="text-gray-900">أتقن </span>
                                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">العلوم الشرعية</span>
                                <br />
                                <span className="text-gray-900">بمنهجية </span>
                                <span className="relative">
                                    <span className="text-gray-900">عصرية</span>
                                    <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8">
                                        <path d="M 0 6 Q 100 0 200 6" stroke="url(#gradient)" strokeWidth="3" fill="none"/>
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#3B82F6"/>
                                                <stop offset="100%" stopColor="#06B6D4"/>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </span>
                            </h1>
                        </div>

                        {/* Subtitle */}
                        <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                            انضم إلى <span className="font-bold text-gray-900">أكثر من 5000 طالب</span> في رحلة تعليمية متميزة
                            مع نخبة من العلماء والمشايخ المتخصصين في العلوم الإسلامية
                        </p>

                        {/* Features List */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <span className="text-gray-700">دورات مسجلة بجودة عالية HD</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <span className="text-gray-700">شهادات معتمدة عند إتمام الدورات</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <span className="text-gray-700">دعم مباشر من المدرسين</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex gap-4 flex-wrap pt-4">
                            <a href="#courses" className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                                <span>ابدأ رحلتك التعليمية</span>
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                                </svg>
                                {/* Button shine effect */}
                                <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                            </a>
                            <a href="#" className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 rounded-full font-bold hover:bg-gray-50 hover:border-gray-300 transform hover:scale-105 transition-all duration-300">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>شاهد الفيديو التعريفي</span>
                            </a>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex items-center gap-8 pt-6">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
                                        {i}
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm">
                                <div className="flex items-center gap-1 text-yellow-500">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-600 font-medium">4.9 من 5 (2,384 تقييم)</p>
                            </div>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
                        <div className="relative">
                            {/* Decorative Elements Behind Image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl transform rotate-3 scale-105"></div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-cyan-200 rounded-3xl transform -rotate-3 scale-95 opacity-50"></div>

                            {/* Main Image Container */}
                            <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                                {/* Replace this SVG with your PNG image */}
                                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-12 flex items-center justify-center">
                                    {/* Islamic Book/Study Illustration SVG */}
                                    <svg className="w-full h-full max-w-sm" viewBox="0 0 400 400">
                                        {/* Quran Book */}
                                        <rect x="100" y="150" width="200" height="150" rx="5" fill="#1E3A8A" opacity="0.9"/>
                                        <rect x="110" y="160" width="180" height="130" rx="3" fill="#3B82F6"/>
                                        <path d="M 200 180 L 200 270" stroke="white" strokeWidth="2" opacity="0.5"/>

                                        {/* Arabic Calligraphy decoration */}
                                        <text x="200" y="220" fontFamily="Arial" fontSize="24" fill="white" textAnchor="middle" opacity="0.9">
                                            بِسْمِ اللَّهِ
                                        </text>

                                        {/* Decorative Stars */}
                                        <g opacity="0.6">
                                            <circle cx="150" cy="120" r="3" fill="#F59E0B"/>
                                            <circle cx="250" cy="100" r="4" fill="#F59E0B"/>
                                            <circle cx="320" cy="140" r="3" fill="#F59E0B"/>
                                            <circle cx="80" cy="180" r="2" fill="#F59E0B"/>
                                        </g>

                                        {/* Light rays */}
                                        <g opacity="0.3">
                                            <path d="M 200 50 L 200 150" stroke="#F59E0B" strokeWidth="2"/>
                                            <path d="M 150 100 L 250 200" stroke="#F59E0B" strokeWidth="2"/>
                                            <path d="M 250 100 L 150 200" stroke="#F59E0B" strokeWidth="2"/>
                                        </g>

                                        {/* Pen/Quill */}
                                        <g transform="translate(280, 250) rotate(-45)">
                                            <rect width="80" height="8" rx="4" fill="#8B4513"/>
                                            <polygon points="80,2 80,6 88,4" fill="#8B4513"/>
                                        </g>

                                        {/* Decorative Crescents */}
                                        <path d="M 350 80 A 15 15 0 1 1 340 65 A 12 12 0 1 0 350 80" fill="#F59E0B" opacity="0.5"/>
                                    </svg>
                                </div>

                                {/* Floating Elements */}
                                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold animate-bounce">
                                    جديد
                                </div>

                                {/* Stats Card */}
                                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">50+</p>
                                            <p className="text-sm text-gray-600">دورة متاحة</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animated Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                </svg>
            </div>
        </section>
    );
}