import {BookOpen, ChevronDown, CheckCircle} from "lucide-react";
import Link from "next/link";
import {toast} from "react-toastify";

export default function ModulesSection({
                                           modules,
                                           expandedModule,
                                           toggleModule,
                                           courseId,
                                           is_unlocked = false,
                                           is_authenticated = false,
                                       }) {

    const handleClickWhenNotAuthOrLocked = (e) => {
        e.preventDefault();
      if (!is_authenticated) {
          toast.success('قم بتسجيل الدخول أولا');
      }
        if (!is_unlocked) {
            toast.success('لم تقم بشراء هذه الدورة بعد');
        }
    }
    return (
        <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-right flex items-center">
                <BookOpen className="ml-3 h-6 w-6 text-blue-600"/> محتوى الدورة
            </h2>
            <div className="space-y-4">
                {modules.map((module, index) => (
                    <div
                        key={module.id}
                        className="border border-gray-200 rounded-xl overflow-hidden"
                    >
                        <button
                            onClick={() => toggleModule(index)}
                            className="w-full px-6 py-4 text-right bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                        >
                            <div className="text-right">
                                <h3 className="font-semibold text-gray-900">
                                    الوحدة {module.title}: {module.content}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {module.length} دروس
                                </p>
                            </div>
                            <ChevronDown
                                className={`h-5 w-5 text-gray-600 transform transition-transform duration-200 ${
                                    expandedModule === index ? "rotate-180" : ""
                                }`}
                            />
                        </button>
                        {expandedModule === index && (
                            <div className="px-6 py-4 bg-white border-t border-gray-100">
                                <ul className="space-y-3">
                                    {module.lessons.map((lesson) => (
                                        <li
                                            key={lesson.id}
                                            className="flex items-center justify-start text-right"
                                        >
                                            <CheckCircle className="ml-3 h-4 w-4 text-green-500 flex-shrink-0"/>
                                            {is_unlocked && is_authenticated ? <Link

                                                href={`/courses/${courseId}/learn/`}
                                                className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors"
                                            >
                                                {lesson.title}
                                            </Link> : <span
                                                onClick={handleClickWhenNotAuthOrLocked}
                                                className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors">
                                                     {lesson.title}
                                            </span>}


                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
