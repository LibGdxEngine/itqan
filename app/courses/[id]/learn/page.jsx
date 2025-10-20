"use client";
import {useMemo, useState, useEffect} from "react";
import {List, X, Search, PlayCircle, CheckCircle2, ChevronDown, ArrowLeft, ArrowRight} from "lucide-react";
import VideoPlayer from "@/app/components/course/VideoPlayer";
import apiClient from "@/app/lib/api/client";
import {useParams} from "next/navigation";
import {useRouter} from 'next/navigation';
import {useUser} from "@/app/hooks/useUser";

export default function CourseStudyPage() {
    const {id} = useParams();
    const {user, loading: userLoading, error: userError} = useUser();
    const router = useRouter();
    // ---- API data state ----
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ---- UI state ----
    const [query, setQuery] = useState("");
    const [openModules, setOpenModules] = useState(new Set());
    const [activeLesson, setActiveLesson] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false); // mobile drawer

    // Fetch course using user's snippet
    useEffect(() => {
        // 🕓 Wait for user to finish loading
        if (userLoading) return;

        // 🚫 If no user, redirect to sign in
        if (!user) {
            router.push("/login");
            return;
        }

        async function fetchCourse() {
            try {
                const res = await apiClient.get(`/courses/${id}/learn/`);
                setCourse(res.data);
            } catch (err) {
                console.error("Failed to fetch course:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        if (id) fetchCourse();
    }, [id, user]);

    // When course loads, open all modules and select the first lesson by default
    useEffect(() => {


        if (!course) return;

        const modules = Array.isArray(course.modules) ? course.modules : [];
        if (modules.length && openModules.size === 0) {
            setOpenModules(new Set(modules.map((m) => m.id)));
        }

        // pick first lesson if none is active yet
        if (!activeLesson) {
            const firstLesson = modules.flatMap((m) => m.lessons || [])[0];
            if (firstLesson) setActiveLesson(firstLesson);
        }
    }, [course]);

    const flatLessons = useMemo(
        () => (course?.modules || []).flatMap((m) => m.lessons || []),
        [course]
    );
    const activeIndex = useMemo(
        () => (activeLesson ? flatLessons.findIndex((l) => l.id === activeLesson.id) : -1),
        [flatLessons, activeLesson]
    );

    const goPrev = () => {
        if (activeIndex > 0) setActiveLesson(flatLessons[activeIndex - 1]);
    };
    const goNext = () => {
        if (activeIndex < flatLessons.length - 1) setActiveLesson(flatLessons[activeIndex + 1]);
    };

    useEffect(() => {
        if (!activeLesson || !course) return;
        // Close drawer when selecting a lesson on mobile for focus
        setDrawerOpen(false);
        // Ensure its module is open
        const module = (course.modules || []).find((m) => (m.lessons || []).some((l) => l.id === activeLesson.id));
        if (module && !openModules.has(module.id)) {
            setOpenModules((prev) => new Set(prev).add(module.id));
        }
    }, [activeLesson, course]);

    const toggleModule = (mid) => {
        setOpenModules((prev) => {
            const next = new Set(prev);
            next.has(mid) ? next.delete(mid) : next.add(mid);
            return next;
        });
    };

    const filteredModules = useMemo(() => {
        const modules = course?.modules || [];
        if (!query.trim()) return modules;
        const q = query.toLowerCase();
        return modules
            .map((m) => ({
                ...m,
                lessons: (m.lessons || []).filter((l) => (l.title || "").toLowerCase().includes(q)),
            }))
            .filter((m) => (m.lessons || []).length > 0);
    }, [course, query]);

    const activeModuleTitle = useMemo(() => {
        if (!course || !activeLesson) return "";
        const mod = (course.modules || []).find((m) => (m.lessons || []).some((l) => l.id === activeLesson.id));
        return mod?.title || "";
    }, [course, activeLesson]);


    return (
        <div className="flex h-[100dvh] w-full overflow-hidden bg-neutral-50 text-neutral-900">
            {/* Desktop sidebar */}
            <aside className="relative hidden w-[380px] shrink-0 border-r border-neutral-200 bg-white md:block">
                {loading ? (
                    <SidebarSkeleton/>
                ) : error ? (
                    <ErrorPanel error={error}/>
                ) : course ? (
                    <Sidebar
                        course={course}
                        modules={filteredModules}
                        openModules={openModules}
                        onToggleModule={toggleModule}
                        activeLesson={activeLesson}
                        onSelectLesson={setActiveLesson}
                        query={query}
                        onQuery={setQuery}
                    />
                ) : (
                    <EmptyState message="Course not found"/>
                )}
            </aside>

            {/* Main content */}
            <main className="flex-1 min-w-0 h-full overflow-y-auto">
                <header
                    className="sticky top-0 z-20 border-b border-neutral-200 bg-white/80 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/60 md:hidden">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setDrawerOpen(true)}
                            className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-3 py-2 text-white shadow-sm active:scale-[0.98]"
                        >
                            <List className="h-5 w-5"/>
                            Lessons
                        </button>
                        <div className="ml-auto text-sm text-neutral-600">{course?.title || ""}</div>
                    </div>
                </header>

                {/* Content area */}
                <div className="mx-auto max-w-5xl p-4 md:p-6">
                    {loading ? (
                        <ContentSkeleton/>
                    ) : error ? (
                        <ErrorPanel error={error}/>
                    ) : !course ? (
                        <EmptyState message="Course not found"/>
                    ) : !activeLesson ? (
                        <EmptyState message="No lessons available"/>
                    ) : (
                        <>
                            <VideoPlayer url={`/api/proxy/course/${course.id}/lesson/${activeLesson.id}`}/>
                            <br/>
                            <div className="mb-4 flex flex-wrap items-center gap-2">
                                <button onClick={goPrev} className={navBtn()} disabled={activeIndex <= 0}>
                                    <ArrowRight className="h-5 w-5"/>
                                    <span className="hidden sm:inline">السابق</span>
                                </button>
                                <button onClick={goNext} className={navBtn()}
                                        disabled={activeIndex >= flatLessons.length - 1}>
                                    <span className="hidden sm:inline">التالي</span>
                                    <ArrowLeft className="h-5 w-5"/>
                                </button>
                            </div>

                            <h1 className="mb-2 text-2xl font-bold tracking-tight">{activeLesson.title}</h1>
                            <p className="mb-6 text-sm text-neutral-600">فصل : {activeModuleTitle}</p>

                            {/* Lesson content placeholders */}
                            <section className="grid gap-6 md:grid-cols-5">
                                <article
                                    className="md:col-span-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                                    <h2 className="mb-2 font-semibold">المزيد عن هذا الدرس</h2>
                                    <p className="text-sm text-neutral-700 leading-6">
                                        {activeLesson.content || ""}
                                    </p>
                                    {/*<div className="mt-4 grid gap-3 sm:grid-cols-2">*/}
                                    {/*    <a className={resBtn()} href="#" onClick={(e) => e.preventDefault()}>*/}
                                    {/*        Slides (PDF)*/}
                                    {/*    </a>*/}
                                    {/*    <a className={resBtn()} href="#" onClick={(e) => e.preventDefault()}>*/}
                                    {/*        Source Code*/}
                                    {/*    </a>*/}
                                    {/*</div>*/}
                                </article>

                                {/*<aside*/}
                                {/*    className="md:col-span-2 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">*/}
                                {/*    <h3 className="mb-2 font-semibold">Transcript</h3>*/}
                                {/*    <div className="max-h-80 overflow-y-auto pr-2 text-sm text-neutral-700 leading-6">*/}
                                {/*        <p>*/}
                                {/*            Lorem ipsum transcript… (connect your real transcript here). Highlight*/}
                                {/*            search keywords and auto-scroll to the*/}
                                {/*            current sentence while the video plays.*/}
                                {/*        </p>*/}
                                {/*    </div>*/}
                                {/*</aside>*/}
                            </section>
                        </>
                    )}
                </div>
            </main>

            {/* Mobile Drawer (sidebar inside) */}
            {drawerOpen && (
                <div className="md:hidden">
                    <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setDrawerOpen(false)}/>
                    <div
                        className="fixed inset-y-0 left-0 z-50 w-[92%] max-w-[420px] overflow-y-auto border-r border-neutral-200 bg-white shadow-xl">
                        <div
                            className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-200 bg-white/90 px-3 py-2 backdrop-blur">
                            <div className="font-semibold">Lessons</div>
                            <button onClick={() => setDrawerOpen(false)}
                                    className="rounded-lg p-2 hover:bg-neutral-100">
                                <X className="h-5 w-5"/>
                            </button>
                        </div>
                        {loading ? (
                            <SidebarSkeleton/>
                        ) : error ? (
                            <ErrorPanel error={error}/>
                        ) : course ? (
                            <Sidebar
                                course={course}
                                modules={filteredModules}
                                openModules={openModules}
                                onToggleModule={toggleModule}
                                activeLesson={activeLesson}
                                onSelectLesson={setActiveLesson}
                                query={query}
                                onQuery={setQuery}
                                isMobile
                            />
                        ) : (
                            <EmptyState message="Course not found"/>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// ---- Sidebar component containing Video Player + Modules/Lessons ----
function Sidebar({
                     course,
                     modules,
                     openModules,
                     onToggleModule,
                     activeLesson,
                     onSelectLesson,
                     query,
                     onQuery,
                     isMobile
                 }) {
    return (
        <div className="flex h-full flex-col">
            {/* Search */}
            <div className="p-3">
                <div className="relative">
                    <Search
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"/>
                    <input
                        value={query}
                        onChange={(e) => onQuery(e.target.value)}
                        placeholder="البحث في الدروس"
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-9 pr-3 py-2 text-sm outline-none ring-0 focus:border-neutral-300"
                    />
                </div>
            </div>

            {/* Modules & Lessons */}
            <div className="min-h-0 flex-1 overflow-y-auto pb-6">
                {(modules || []).map((m) => (
                    <div key={m.id} className="border-b border-neutral-100">
                        <button
                            className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left hover:bg-neutral-50"
                            onClick={() => onToggleModule(m.id)}
                            aria-expanded={openModules.has(m.id)}
                        >
                            <div>
                                <div className="text-sm font-semibold text-neutral-900">{m.title}</div>
                                <div
                                    className="text-xs text-neutral-500">{(m.lessons || []).length} lesson{(m.lessons || []).length > 1 ? "s" : ""}</div>
                            </div>
                            <ChevronDown
                                className={`h-4 w-4 transition ${openModules.has(m.id) ? "rotate-180" : "rotate-0"}`}/>
                        </button>

                        {openModules.has(m.id) && (
                            <ul className="space-y-0.5 px-2 pb-3">
                                {(m.lessons || []).map((l) => (
                                    <li key={l.id}>
                                        <button
                                            onClick={() => onSelectLesson(l)}
                                            className={`group flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition hover:bg-neutral-50 ${
                                                activeLesson && l.id === activeLesson.id ? "bg-neutral-900 text-white hover:bg-neutral-900" : ""
                                            }`}
                                        >
                                            <div
                                                className={`grid h-8 w-8 place-items-center rounded-lg shadow-sm ring-1 ${
                                                    activeLesson && l.id === activeLesson.id ? "bg-white/10 ring-white/20" : "bg-white ring-neutral-200"
                                                }`}
                                            >
                                                {activeLesson && l.id === activeLesson.id ? (
                                                    <PlayCircle className="h-5 w-5"/>
                                                ) : (
                                                    <CheckCircle2
                                                        className="h-5 w-5 text-emerald-500 opacity-70 group-hover:opacity-100"/>
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div
                                                    className={`truncate text-sm ${activeLesson && l.id === activeLesson.id ? "font-semibold" : "font-medium text-neutral-900"}`}>{l.title}</div>
                                                <div
                                                    className={`text-xs ${activeLesson && l.id === activeLesson.id ? "text-white/80" : "text-neutral-500"}`}>{fmt(l.duration)}</div>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}

                {/* Padding for bottom safe-area on mobile */}
                {isMobile && <div className="h-12"/>}
            </div>

            {/* Footer (optional) */}
            <div className="border-t border-neutral-200 bg-white p-3 text-xs text-neutral-500">{course?.title || ""} ·
                Keep learning 🚀
            </div>
        </div>
    );
}

// ---- utils ----
function fmt(sec) {
    if (!Number.isFinite(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

const navBtn = () =>
    "inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50";

const resBtn = () =>
    "inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50";

// ---- simple skeletons / states ----
function SidebarSkeleton() {
    return (
        <div className="p-3 animate-pulse">
            <div className="h-9 w-full rounded-xl bg-neutral-100 mb-3"/>
            {Array.from({length: 4}).map((_, i) => (
                <div key={i} className="mb-3">
                    <div className="h-5 w-40 bg-neutral-100 rounded mb-2"/>
                    <div className="space-y-2">
                        <div className="h-8 bg-neutral-100 rounded"/>
                        <div className="h-8 bg-neutral-100 rounded"/>
                    </div>
                </div>
            ))}
        </div>
    );
}

function ContentSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="h-56 md:h-96 w-full bg-neutral-100 rounded-2xl mb-4"/>
            <div className="h-9 w-64 bg-neutral-100 rounded mb-2"/>
            <div className="h-4 w-40 bg-neutral-100 rounded mb-6"/>
            <div className="grid gap-6 md:grid-cols-5">
                <div className="md:col-span-3 space-y-3">
                    <div className="h-40 bg-neutral-100 rounded-2xl"/>
                    <div className="h-24 bg-neutral-100 rounded-2xl"/>
                </div>
                <div className="md:col-span-2 h-64 bg-neutral-100 rounded-2xl"/>
            </div>
        </div>
    );
}

function ErrorPanel({error}) {
    return (
        <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl m-3">
            Failed to load course. {error?.message || "Unknown error"}
        </div>
    );
}

function EmptyState({message}) {
    return <div className="p-4 text-sm text-neutral-600">{message}</div>;
}
