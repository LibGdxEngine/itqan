const stats = [
    { number: "5000+", label: "طالب مسجل" },
    { number: "50+", label: "دورة متاحة" },
    { number: "100+", label: "ساعة محتوى" },
    { number: "95%", label: "رضا الطلاب" },
];

export default function Stats() {
    return (
        <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-500 relative">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center relative z-10">
                {stats.map((s, i) => (
                    <div
                        key={i}
                        className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white hover:bg-white/20 transition"
                    >
                        <div className="text-3xl md:text-4xl font-bold mb-2">{s.number}</div>
                        <div className="text-sm md:text-base opacity-90">{s.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
