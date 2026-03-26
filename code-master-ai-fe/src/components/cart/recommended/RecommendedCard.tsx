import React from "react";
import { RecommendedCourse } from "./RecommendedSection";

interface RecommendedCardProps {
  course: RecommendedCourse;
}

export default function RecommendedCard({ course }: RecommendedCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-50 group cursor-pointer shadow-[0_4px_15px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all">
      <div
        className="h-32 w-full bg-cover bg-center"
        style={{ backgroundImage: `url('${course.image}')` }}
      />

      <div className="p-4">
        <h4 className="font-bold text-sm text-slate-800 line-clamp-2 mb-2 group-hover:text-[#4a5d4e] transition-colors">
          {course.title}
        </h4>
        <p className="text-slate-600 font-semibold text-sm">{course.price}</p>
      </div>
    </div>
  );
}
