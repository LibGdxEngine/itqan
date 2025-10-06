import { Clock } from "lucide-react";
import Image from "next/image";

export default function CourseHeader({
  title,
  shortDescription,
    cover_photo
}) {
    console.log(cover_photo)
  return (
    <div className="relative text-white">
      {/* Actual image */}
      <Image
        src={cover_photo}
        alt=""
        width={1000}
        height={1000}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content on top */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Title and description */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-right">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 text-right leading-relaxed">
              {shortDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
