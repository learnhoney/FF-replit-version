import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import type { Course } from "@shared/schema";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-[#282828] rounded-lg overflow-hidden hover:bg-[#535353] transition-colors course-card">
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-40 object-cover"
        />
        {course.isPremium && (
          <Badge className="absolute top-4 left-4 bg-[#FFD700] text-black font-semibold">
            PREMIUM
          </Badge>
        )}
        <div className="absolute bottom-4 right-4 bg-black/75 text-white px-2 py-1 rounded text-xs">
          {course.duration}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Star className="w-4 h-4 text-[#FFD700] fill-current mr-1" />
            <span>{course.rating} ({course.reviewCount.toLocaleString()} reviews)</span>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-[#FFD700]">${course.price}</div>
            {course.originalPrice && (
              <div className="text-xs text-gray-500 line-through">${course.originalPrice}</div>
            )}
          </div>
        </div>
        <Link href={`/course/${course.id}`}>
          <Button className="w-full bg-[#1DB954] text-black hover:bg-[#1ed760] font-medium">
            View Course
          </Button>
        </Link>
      </div>
    </div>
  );
}
