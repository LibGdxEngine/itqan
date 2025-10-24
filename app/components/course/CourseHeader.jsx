"use client";

import { useState } from "react";
import SafeImage from "../SafeImage";

export default function CourseHeader({
  title,
  shortDescription,
  cover_photo
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Default background gradient when no image is provided
  const defaultBackground = "bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800";
  
  return (
    <div className="relative text-white min-h-[400px]">
      {/* Background image or gradient */}
      {cover_photo ? (
        <SafeImage
          src={cover_photo}
          alt={title || "Course cover"}
          width={1000}
          height={1000}
          className="absolute inset-0 w-full h-full object-cover"
          unoptimized
        />
      ) : (
        <div className={`absolute inset-0 w-full h-full ${defaultBackground}`} />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content on top */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Title and description */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-right">
              {title || "عنوان الدورة"}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 text-right leading-relaxed">
              {shortDescription || "وصف مختصر للدورة"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
