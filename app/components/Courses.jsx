const courses = [
    {
        title: "دورة أصول الفقه",
        desc: "دورة شاملة في أصول الفقه الإسلامي تغطي القواعد الأساسية والمتقدمة مع التطبيقات العملية",
        duration: "⏱ 40 ساعة",
        price: "299 درهم",
        badge: "الأكثر مبيعاً",
    },
    {
        title: "علوم القرآن الكريم",
        desc: "تعرف على علوم القرآن من التفسير والتجويد وأسباب النزول والناسخ والمنسوخ",
        duration: "⏱ 35 ساعة",
        price: "249 درهم",
        badge: "جديد",
    },
    {
        title: "السيرة النبوية",
        desc: "دراسة شاملة ومفصلة لسيرة النبي محمد صلى الله عليه وسلم والدروس المستفادة منها",
        duration: "⏱ 25 ساعة",
        price: "199 درهم",
    },
];

export default function Courses() {
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
                    {courses.map((c, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl shadow hover:shadow-lg border border-blue-100 overflow-hidden transition"
                        >
                            <div className="relative h-48 bg-gradient-to-br from-blue-900 to-blue-500 flex items-center justify-center">
                                {c.badge && (
                                    <span className="absolute top-4 right-4 bg-amber-500 text-white text-sm px-3 py-1 rounded-full shadow">
                    {c.badge}
                  </span>
                                )}
                                <span className="text-5xl text-white/70">▶</span>
                            </div>
                            <div className="p-6">
                                <h3 className="font-amiri text-xl text-blue-900 mb-2">
                                    {c.title}
                                </h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">{c.desc}</p>
                                <div className="flex justify-between items-center border-t border-blue-100 pt-3">
                                    <span className="text-gray-500">{c.duration}</span>
                                    <span className="font-bold text-blue-500">{c.price}</span>
                                </div>
                                <button className="mt-4 w-full py-2 rounded-lg bg-gradient-to-br from-blue-900 to-blue-500 text-white font-bold hover:from-blue-500 hover:to-blue-400 transition">
                                    التسجيل الآن
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
