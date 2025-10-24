"use client";

import { useState } from "react";
import { User } from "lucide-react";
import SafeImage from "../SafeImage";

export default function InstructorSection({ instructor }) {
  const [imageError, setImageError] = useState(false);
  
  if (!instructor) {
    return null;
  }

  return (
    <section className="bg-white rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-right flex items-center">
        <User className="ml-3 h-6 w-6 text-blue-600" /> المحاضر
      </h2>
      <div className="flex items-center space-x-reverse gap-5 space-x-6">
        <div className="flex-shrink-0">
          {instructor.image ? (
            <SafeImage
              className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
              src={instructor.image}
              alt={instructor.name || "المحاضر"}
              width={80}
              height={80}
              quality={100}
              loading="lazy"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 border-4 border-blue-100 flex items-center justify-center">
              <User className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>
        <div className="flex-1 text-right">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {instructor.name || "المحاضر"}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {instructor.description || "لا يوجد وصف متاح للمحاضر"}
          </p>
        </div>
      </div>
    </section>
  );
}
