const features = [
    { icon: "📚", title: "مناهج متقنة", desc: "مناهج علمية محكمة وضعها نخبة من العلماء المتخصصين في العلوم الشرعية" },
    { icon: "🎥", title: "دروس مسجلة بجودة عالية", desc: "محتوى مرئي احترافي يمكنك مشاهدته في أي وقت ومن أي مكان" },
    { icon: "🎓", title: "شهادات معتمدة", desc: "احصل على شهادات معتمدة عند إتمام الدورات بنجاح واجتياز الاختبارات" },
];

export default function Features() {
    return (
        <section id="features" className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="font-amiri text-3xl text-center text-blue-900 relative mb-6">لماذا اتقان؟</h2>
                <p className="text-center text-gray-600 mb-12">نوفر لك أفضل تجربة تعليمية في الدراسات الإسلامية</p>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow hover:shadow-xl p-8 text-center transition">
                            <div className="w-20 h-20 mx-auto flex items-center justify-center text-3xl rounded-xl bg-gradient-to-br from-blue-500 to-blue-300 text-white shadow-md mb-4">
                                {f.icon}
                            </div>
                            <h3 className="font-amiri text-xl text-blue-900 mb-2">{f.title}</h3>
                            <p className="text-gray-600">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
