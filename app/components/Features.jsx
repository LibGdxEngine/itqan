"use client";

import { motion } from "framer-motion";

const features = [
    {
        icon: "📚",
        title: "مناهج متقنة",
        desc: "مناهج علمية محكمة وضعها نخبة من العلماء المتخصصين في العلوم الشرعية",
    },
    {
        icon: "🎥",
        title: "دروس مسجلة بجودة عالية",
        desc: "محتوى مرئي احترافي يمكنك مشاهدته في أي وقت ومن أي مكان",
    },
    {
        icon: "🎓",
        title: "شهادات معتمدة",
        desc: "احصل على شهادات معتمدة عند إتمام الدورات بنجاح واجتياز الاختبارات",
    },
];

export default function Features() {
    return (
        <section
            id="features"
            className="py-24 relative overflow-hidden bg-gradient-to-b from-blue-50 to-white"
        >
            {/* background glow */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_70%)]" />

            <div className="max-w-6xl mx-auto px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="font-amiri text-4xl text-blue-900 mb-4 relative inline-block"
                >
                    لماذا <span className="text-blue-600">إتقان؟</span>
                    <span className="absolute -bottom-2 left-1/2 w-24 h-1 bg-blue-400 rounded-full transform -translate-x-1/2"></span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed"
                >
                    نوفر لك تجربة تعليمية متكاملة تجمع بين الأصالة والمعاصرة
                </motion.p>

                <div className="grid md:grid-cols-3 gap-10">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            className="group bg-white/70 backdrop-blur-lg border border-blue-100 rounded-3xl p-10 shadow-md hover:shadow-2xl transition-all duration-300 relative"
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-100/30 to-transparent rounded-3xl"></div>

                            <div className="relative z-10">
                                <div className="w-20 h-20 mx-auto flex items-center justify-center text-4xl rounded-2xl bg-gradient-to-br from-blue-500 to-blue-400 text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300 animate-pulse">
                                    {f.icon}
                                </div>

                                <h3 className="font-amiri text-2xl text-blue-900 mb-3">
                                    {f.title}
                                </h3>
                                <p className="text-gray-700 leading-relaxed">{f.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
