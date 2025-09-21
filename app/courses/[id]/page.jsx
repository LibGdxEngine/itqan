"use client";
import { useState } from "react";
import CourseHeader from "../../components/course/CourseHeader";
import InstructorSection from "../../components/course/InstructorSection";
import ModulesSection from "../../components/course/ModulesSection";
import FAQSection from "../../components/course/FAQSection";
import CourseSidebar from "../../components/course/CourseSidebar"; // your sidebar component
import osama from "../../../public/osama.jpg";

const courseData = {
  slug: "usul-al-fiqh",
  title: "دورة أصول الفقه",
  shortDescription:
    "تعلم القواعد الأساسية لفهم الأحكام الشرعية واستنباطها من مصادرها الأصلية",
  instructor: {
    name: "د. أسامة المراكبي",
    bio: "دكتوراه في الفقه وأصوله من جامعة الأزهر، له خبرة 15 عاماً في التدريس والبحث الشرعي",
    photo: osama.src,
  },
  duration: "24 ساعة",
  price: "299 ريال",
  modules: [
    {
      id: 1,
      title: "مقدمة في علم أصول الفقه",
      lessons: [
        "تعريف علم أصول الفقه",
        "نشأة علم الأصول",
        "أهمية دراسة الأصول",
      ],
    },
    {
      id: 2,
      title: "مصادر التشريع الإسلامي",
      lessons: ["القرآن الكريم", "السنة النبوية", "الإجماع", "القياس"],
    },
    {
      id: 3,
      title: "دلالات الألفاظ",
      lessons: [
        "الواضح والخفي",
        "العام والخاص",
        "المطلق والمقيد",
        "الناسخ والمنسوخ",
      ],
    },
    {
      id: 4,
      title: "الاجتهاد والتقليد",
      lessons: [
        "شروط الاجتهاد",
        "أنواع الاجتهاد",
        "التقليد وأحكامه",
        "الفتوى وآدابها",
      ],
    },
  ],
  faqs: [
    {
      question: "ما هي متطلبات الالتحاق بالدورة؟",
      answer:
        "معرفة أساسية باللغة العربية والعلوم الشرعية، ولا يشترط خبرة سابقة في أصول الفقه",
    },
    {
      question: "كيف يمكنني الوصول للدورة؟",
      answer:
        "بعد التسجيل والدفع، ستحصل على رابط الوصول للمنصة وبيانات الدخول عبر البريد الإلكتروني",
    },
    {
      question: "هل يمكنني استرداد المبلغ؟",
      answer:
        "يمكن استرداد المبلغ كاملاً خلال 7 أيام من تاريخ التسجيل في حالة عدم الرضا",
    },
  ],
};

export default function CourseDetail() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <CourseHeader
        title={courseData.title}
        shortDescription={courseData.shortDescription}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <InstructorSection instructor={courseData.instructor} />
            <ModulesSection
              modules={courseData.modules}
              expandedModule={expandedModule}
              toggleModule={(i) =>
                setExpandedModule(expandedModule === i ? null : i)
              }
            />
            <FAQSection
              faqs={courseData.faqs}
              expandedFaq={expandedFaq}
              toggleFaq={(i) => setExpandedFaq(expandedFaq === i ? null : i)}
            />
          </div>

          <div className="lg:col-span-1">
            <CourseSidebar
              price={courseData.price}
              duration={courseData.duration}
              modulesCount={courseData.modules.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
