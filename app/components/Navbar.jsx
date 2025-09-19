"use client";

import {useState, useEffect} from "react";
import Link from "next/link";

const navLinks = [
    {href: "#home", label: "الرئيسية", labelEn: "Home"},
    {href: "#features", label: "المميزات", labelEn: "Features"},
    {href: "#courses", label: "الدورات", labelEn: "Courses"},
    {href: "#about", label: "من نحن", labelEn: "About"},
    {href: "#contact", label: "تواصل معنا", labelEn: "Contact"},
];

const languages = [
    {code: "ar", label: "العربية", flag: "🇦🇪"},
    {code: "en", label: "English", flag: "🇬🇧"},
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("home");
    const [lang, setLang] = useState("ar");
    const [showLangMenu, setShowLangMenu] = useState(false);

    // Detect scroll position
    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Detect active section
    useEffect(() => {
        const sections = navLinks.map((l) => l.href.replace("#", ""));
        const onScroll = () => {
            const pos = window.scrollY + 120;
            for (const id of sections) {
                const el = document.getElementById(id);
                if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
                    setActiveLink(id);
                    break;
                }
            }
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleScrollTo = (e, href) => {
        e.preventDefault();
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({behavior: "smooth"});
            setIsMobileOpen(false);
        }
    };

    return (
        <>
            {/* Navbar */}
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-500 ${
                    isScrolled
                        ? "bg-white/95 backdrop-blur-xl shadow-lg py-2"
                        : "bg-white/90 backdrop-blur-md py-4"
                }`}
                dir="rtl"
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
            <span
                className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-900 text-white shadow-md group-hover:scale-110 transition">
              إ
            </span>
                        <div className="flex flex-col">
              <span
                  className="font-amiri text-2xl font-bold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                اتقان
              </span>
                            <span className="text-xs text-gray-600">للدراسات الإسلامية</span>
                        </div>
                    </Link>

                    {/* Desktop nav */}
                    <ul className="hidden lg:flex items-center gap-4">
                        {navLinks.map((link) => {
                            const isActive = activeLink === link.href.replace("#", "");
                            return (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleScrollTo(e, link.href)}
                                        className={`relative px-5 py-2 rounded-full text-sm font-medium transition ${
                                            isActive
                                                ? "text-white bg-gradient-to-r from-blue-600 to-cyan-600 shadow-md"
                                                : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                                        }`}
                                    >
                                        {lang === "ar" ? link.label : link.labelEn}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {/* Language switch */}
                        {/*<div className="relative hidden md:block">*/}
                        {/*    <button*/}
                        {/*        onClick={() => setShowLangMenu(!showLangMenu)}*/}
                        {/*        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200"*/}
                        {/*    >*/}
                        {/*        <span>{languages.find((l) => l.code === lang)?.flag}</span>*/}
                        {/*        <span className="text-sm font-medium">*/}
                        {/*      {languages.find((l) => l.code === lang)?.label}*/}
                        {/*    </span>*/}
                        {/*    </button>*/}
                        {/*    {showLangMenu && (*/}
                        {/*        <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-lg border">*/}
                        {/*            {languages.map((l) => (*/}
                        {/*                <button*/}
                        {/*                    key={l.code}*/}
                        {/*                    onClick={() => {*/}
                        {/*                        setLang(l.code);*/}
                        {/*                        setShowLangMenu(false);*/}
                        {/*                    }}*/}
                        {/*                    className={`flex items-center gap-2 px-5 py-3 w-full text-sm transition ${*/}
                        {/*                        lang === l.code*/}
                        {/*                            ? "bg-blue-50 text-blue-600"*/}
                        {/*                            : "hover:bg-gray-50"*/}
                        {/*                    }`}*/}
                        {/*                >*/}
                        {/*                    <span>{l.flag}</span> {l.label}*/}
                        {/*                </button>*/}
                        {/*            ))}*/}
                        {/*        </div>*/}
                        {/*    )}*/}
                        {/*</div>*/}

                        {/* CTA */}
                        <button
                            className="hidden md:flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-md hover:scale-105 transition">
                            ابدأ الآن
                        </button>

                        {/* Mobile menu toggle */}
                        <button
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            aria-expanded={isMobileOpen}
                            aria-label="Toggle menu"
                            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100"
                        >
              <span
                  className={`block w-6 h-0.5 bg-gray-800 transition ${
                      isMobileOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
              />
                            <span
                                className={`block w-6 h-0.5 bg-gray-800 my-1 transition ${
                                    isMobileOpen ? "opacity-0" : ""
                                }`}
                            />
                            <span
                                className={`block w-6 h-0.5 bg-gray-800 transition ${
                                    isMobileOpen ? "-rotate-45 -translate-y-1.5" : ""
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Mobile menu */}
            <div
                className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-500 lg:hidden ${
                    isMobileOpen ? "translate-x-0" : "translate-x-full"
                }`}
                dir="rtl"
            >
                <div className="p-6">
                    <div className="flex justify-between mb-6">
                        <span className="font-amiri text-xl text-blue-900">اتقان</span>
                        <button onClick={() => setIsMobileOpen(false)}>✕</button>
                    </div>
                    <ul className="space-y-2">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    onClick={(e) => handleScrollTo(e, link.href)}
                                    className={`block px-4 py-3 rounded-lg transition ${
                                        activeLink === link.href.replace("#", "")
                                            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                                            : "text-gray-700 hover:bg-gray-100"
                                    }`}
                                >
                                    {lang === "ar" ? link.label : link.labelEn}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile language */}
                    <div className="mt-6 border-t pt-6">
                        <p className="text-sm text-gray-500 mb-2">اختر اللغة</p>
                        <div className="flex gap-2">
                            {languages.map((l) => (
                                <button
                                    key={l.code}
                                    onClick={() => setLang(l.code)}
                                    className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                                        lang === l.code
                                            ? "bg-blue-100 text-blue-600 border border-blue-300"
                                            : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                                >
                                    {l.flag} {l.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg shadow-md hover:scale-105 transition">
                        ابدأ رحلتك التعليمية
                    </button>
                </div>
            </div>
        </>
    );
}
