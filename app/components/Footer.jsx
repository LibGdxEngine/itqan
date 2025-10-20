"use client";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-t from-blue-900 to-blue-700 text-white">
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight mb-3">إتقان</h2>
                        <p className="text-sm text-blue-100 leading-6">
                            منصة تعليمية تهدف إلى تمكين المتعلمين في الدراسات الإسلامية،
                            بأسلوب حديث يجمع بين الأصالة والمعاصرة.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">روابط سريعة</h3>
                        <ul className="space-y-2 text-blue-100 text-sm">
                            <li><a href="/" className="hover:text-white transition">الرئيسية</a></li>
                            <li><a href="#courses" className="hover:text-white transition">الدورات</a></li>
                            <li><a href="#about" className="hover:text-white transition">من نحن</a></li>
                            <li><a href="#contact" className="hover:text-white transition">اتصل بنا</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">موارد</h3>
                        <ul className="space-y-2 text-blue-100 text-sm">
                            <li><a href="/faq" className="hover:text-white transition">الأسئلة الشائعة</a></li>
                            <li><a href="/blog" className="hover:text-white transition">المدونة</a></li>
                            <li><a href="/privacy" className="hover:text-white transition">سياسة الخصوصية</a></li>
                            <li><a href="/terms" className="hover:text-white transition">الشروط والأحكام</a></li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-blue-600 my-8" />

                {/* Bottom */}
                <div className="flex flex-col md:flex-row items-center justify-between text-sm text-blue-200">
                    <p>© {new Date().getFullYear()} إتقان للدراسات الإسلامية. جميع الحقوق محفوظة.</p>
                    <div className="flex gap-4 mt-2 md:mt-0">
                        <a href="#" aria-label="Twitter" className="hover:text-white transition">
                            <i className="ri-twitter-fill"></i>
                        </a>
                        <a href="#" aria-label="Facebook" className="hover:text-white transition">
                            <i className="ri-facebook-fill"></i>
                        </a>
                        <a href="#" aria-label="YouTube" className="hover:text-white transition">
                            <i className="ri-youtube-fill"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
