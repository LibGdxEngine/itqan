"use client";
import {useState, useEffect} from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
                    <div
                        className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full transform rotate-45"></div>
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
                    <div
                        className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
                        {/* Badge */}
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full border border-blue-200">
                            <span className="relative flex h-2 w-2">
                                <span
                                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            <span className="text-sm font-medium text-blue-700">التسجيل مفتوح الآن</span>
                        </div>

                        {/* Main Heading */}
                        <div className="space-y-4">
                            <h1 className="font-amiri text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                                <span className="text-gray-900">أتقن </span>
                                <span
                                    className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">العلوم الشرعية</span>
                                <br/>
                                <span className="text-gray-900">بمنهجية </span>
                                <span className="relative">
                                    <span className="text-gray-900">راسخة</span>
                                    <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8">
                                        <path d="M 0 6 Q 100 0 200 6" stroke="url(#gradient)" strokeWidth="3"
                                              fill="none"/>
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
                            انضم إلى <span className="font-bold text-gray-900">العديد من الطلاب</span> في رحلة تعليمية
                            متميزة
                            مع نخبة من العلماء والمشايخ المتخصصين في العلوم الإسلامية
                        </p>

                        {/* Features List */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd"
                                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <span className="text-gray-700">دورات مسجلة بجودة عالية HD</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd"
                                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <span className="text-gray-700">شهادات إتقان عند إتمام الدورات</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd"
                                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <span className="text-gray-700">دعم مباشر من المدرسين</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex gap-4 flex-wrap pt-4">
                            <a href="#courses"
                               className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                                <span>ابدأ رحلتك التعليمية</span>
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                                </svg>
                                {/* Button shine effect */}
                                <span
                                    className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                            </a>
                            <a href="#"
                               className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 rounded-full font-bold hover:bg-gray-50 hover:border-gray-300 transform hover:scale-105 transition-all duration-300">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>شاهد الفيديو التعريفي</span>
                            </a>
                        </div>

                    </div>

                    {/* Image Section */}
                    <div className="relative mt-12 md:mt-0 md:ml-8">
                        <motion.span
                            initial={{ opacity: 0, y: 20, filter: "blur(3px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 1.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="absolute top-[-1/8] left-1/2 -translate-x-1/2
      text-amber-700 text-3xl md:text-5xl font-extrabold
      drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]
      tracking-wide text-center whitespace-nowrap"
                            style={{
                                fontFamily: "Amiri, serif",
                                textShadow: "0 3px 8px rgba(0,0,0,0.4)",
                            }}
                        >
                            وَقُل رَّبِّ زِدْنِي عِلْمًا
                        </motion.span>

                        <Image
                            src="/photo_hero2 (1).png"
                            alt="Quran illustration"
                            width={1600}
                            height={900}
                            className="w-full h-auto object-cover"
                            priority
                        />
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