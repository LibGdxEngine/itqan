"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {motion, AnimatePresence} from "framer-motion";
import {useUser} from "@/app/hooks/useUser";

const navLinks = [
    {href: "#home", label: "الرئيسية", labelEn: "Home"},
    {href: "#features", label: "المميزات", labelEn: "Features"},
    {href: "#courses", label: "الدورات", labelEn: "Courses"},
];

export default function Navbar() {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("home");
    const [lang, setLang] = useState("ar");

    const {user, loading} = useUser(); // ✅ get user state

    // scroll detection
    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // active section tracking
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
        if (el) el.scrollIntoView({behavior: "smooth"});
        setIsMobileOpen(false);
    };

    const handleStartNow = (e) => {
        e.preventDefault();
        router.push("/signup");
    };

    return (
        <>
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
                        <Image src="/itqan_logo.png" alt="itqan" width={40} height={40}/>
                    </Link>

                    {/* Desktop Nav */}
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
                    <AnimatePresence>
                        {isMobileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="lg:hidden absolute top-full right-0 w-full bg-white shadow-lg z-40"
                            >
                                <ul className="flex flex-col items-center py-4 space-y-3">
                                    {navLinks.map((link) => (
                                        <li key={link.href}>
                                            <a
                                                href={link.href}
                                                onClick={(e) => handleScrollTo(e, link.href)}
                                                className="block px-6 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-full transition"
                                            >
                                                {lang === "ar" ? link.label : link.labelEn}
                                            </a>
                                        </li>
                                    ))}

                                    {!loading && !user && (
                                        <button
                                            onClick={handleStartNow}
                                            className="mt-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-md hover:scale-105 transition"
                                        >
                                            ابدأ الآن
                                        </button>
                                    )}

                                    {!loading && user && (
                                        <button
                                            onClick={() => router.push("/profile")}
                                            className="mt-2 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition"
                                        >
                                            حسابي
                                        </button>
                                    )}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {!loading && !user && (
                            <button
                                onClick={handleStartNow}
                                className="cursor-pointer hidden md:flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-md hover:scale-105 transition"
                            >
                                ابدأ الآن
                            </button>
                        )}

                        {/* ✅ User Profile */}
                        {!loading && user && (
                            <div className="relative group">
                                <button
                                    onClick={()=> router.push("/profile")}
                                    className="cursor-pointer flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 transition">
                                    <Image
                                        src={user.avatar || "/default-avatar.png"}
                                        alt={user.full_name || "User"}
                                        width={32}
                                        height={32}
                                        className="rounded-full border border-gray-300"
                                    />
                                    <span className="text-sm font-medium text-gray-700 hidden md:inline">
                    {user.name?.split(" ")[0] || "حسابي"}
                  </span>
                                </button>


                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            aria-expanded={isMobileOpen}
                            aria-label="Toggle menu"
                            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center space-y-1 rounded-lg hover:bg-gray-100 transition"
                        >
              <span
                  className={`block w-6 h-0.5 bg-gray-800 rounded transition-transform duration-300 ${
                      isMobileOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
              />
                            <span
                                className={`block w-6 h-0.5 bg-gray-800 rounded transition-opacity duration-300 ${
                                    isMobileOpen ? "opacity-0" : ""
                                }`}
                            />
                            <span
                                className={`block w-6 h-0.5 bg-gray-800 rounded transition-transform duration-300 ${
                                    isMobileOpen ? "-rotate-45 -translate-y-1.5" : ""
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}
