import { Clock, BookOpen, CheckCircle } from "lucide-react";

export default function CourseSidebar({ price, duration, modulesCount }) {
  return (
    <div className="sticky top-8 space-y-8">
      {/* Enrollment Card */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-blue-100">
        <div className="text-center space-y-6">
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{price}</div>
            <p className="text-gray-600">سعر الدورة الكاملة</p>
          </div>

          <div className=" flex items-start flex-col space-y-4 text-right">
            <div className="flex items-center justify-end">
              <Clock className="ml-2 h-4 w-4 text-gray-500" />
              <span className="text-gray-700">المدة: {duration}</span>
            </div>
            <div className="flex items-center justify-end">
              <BookOpen className="ml-2 h-4 w-4 text-gray-500" />
              <span className="text-gray-700">
                {modulesCount} وحدات تعليمية
              </span>
            </div>
            <div className="flex items-center justify-end">
              <CheckCircle className="ml-2 h-4 w-4 text-gray-500" />
              <span className="text-gray-700">شهادة إتمام</span>
            </div>
          </div>

          <button className="w-full bg-gradient-to-l from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg">
            التسجيل الآن
          </button>

          <p className="text-sm text-gray-500 text-center">
            ضمان استرداد المبلغ خلال 7 أيام
          </p>
        </div>
      </div>

      {/* Benefits Card */}
      <div className="bg-gradient-to-l from-blue-50 to-blue-100 rounded-2xl p-6">
        <h3 className="font-bold text-gray-900 mb-4 text-right">
          ماذا ستحصل عليه؟
        </h3>
        <ul className="space-y-3 text-right">
          {[
            "وصول مدى الحياة للمحتوى",
            "تحديثات مجانية للمحتوى",
            "دعم فني مباشر",
            "مجتمع طلابي تفاعلي",
          ].map((benefit, idx) => (
            <li key={idx} className="flex items-center justify-start">
              <CheckCircle className="ml-2 h-4 w-4 text-green-600" />
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
