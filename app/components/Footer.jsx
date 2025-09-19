export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white py-10">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <div className="flex justify-center gap-4 mb-6">
                    <a
                        href="#"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-400 transition"
                    >
                        📘
                    </a>
                    <a
                        href="#"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-400 transition"
                    >
                        🐦
                    </a>
                    <a
                        href="#"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-400 transition"
                    >
                        📷
                    </a>
                    <a
                        href="#"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-400 transition"
                    >
                        📱
                    </a>
                </div>
                <p className="text-gray-300">
                    © 2025 اتقان للدراسات الإسلامية - جميع الحقوق محفوظة
                </p>
            </div>
        </footer>
    );
}
