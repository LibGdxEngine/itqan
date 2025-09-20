import { ChevronDown } from "lucide-react";

export default function FAQSection({ faqs, expandedFaq, toggleFaq }) {
  return (
    <section className="bg-white rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-right">
        الأسئلة الشائعة
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full px-6 py-4 text-right bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
            >
              <h3 className="font-semibold text-gray-900 text-right">
                {faq.question}
              </h3>
              <ChevronDown
                className={`h-5 w-5 text-gray-600 transform transition-transform duration-200 ${
                  expandedFaq === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedFaq === index && (
              <div className="px-6 py-4 bg-white border-t border-gray-100">
                <p className="text-gray-700 text-right leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
