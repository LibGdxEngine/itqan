import { Clock } from "lucide-react";
const backgroundImage = "../../../2213787.jpg";

export default function CourseHeader({
  title,
  shortDescription,
  duration,
  price,
}) {
  return (
    <div className="relative text-white">
      {/* Actual image */}
      <img
        src={backgroundImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content on top */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Title and description */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-right">
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
