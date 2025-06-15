import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Star, Clock, Users, Play } from "lucide-react";
import type { Course } from "@shared/schema";

export default function CoursePage() {
  const { id } = useParams<{ id: string }>();
  
  const { data: course, isLoading } = useQuery<Course>({
    queryKey: [`/api/courses/${id}`],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-600 rounded w-32 mb-8" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-64 bg-gray-600 rounded-lg mb-6" />
                <div className="h-8 bg-gray-600 rounded mb-4" />
                <div className="h-4 bg-gray-600 rounded mb-2" />
                <div className="h-4 bg-gray-600 rounded w-3/4" />
              </div>
              <div>
                <div className="bg-[#282828] p-6 rounded-lg">
                  <div className="h-6 bg-gray-600 rounded mb-4" />
                  <div className="h-12 bg-gray-600 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="max-w-6xl mx-auto p-8">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-8 hover:bg-[#282828]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="mb-8">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              
              <div className="flex items-center gap-2 mb-4">
                {course.isPremium && (
                  <Badge className="bg-[#FFD700] text-black font-semibold">
                    PREMIUM
                  </Badge>
                )}
                <Badge variant="outline" className="border-gray-500">
                  {course.level}
                </Badge>
              </div>

              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-gray-300 mb-6">{course.description}</p>

              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-[#FFD700] fill-current" />
                  <span>{course.rating}</span>
                  <span>({course.reviewCount?.toLocaleString() || 0} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>By {course.instructor}</span>
                </div>
              </div>
            </div>

            {/* Course Content Preview */}
            <Card className="bg-[#282828] border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">What you'll learn</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#1DB954] mt-1">✓</span>
                    <span>Master fundamental investment principles and strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1DB954] mt-1">✓</span>
                    <span>Understand risk management and portfolio diversification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1DB954] mt-1">✓</span>
                    <span>Learn to analyze financial markets and economic indicators</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1DB954] mt-1">✓</span>
                    <span>Develop a personalized investment strategy</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Purchase */}
          <div>
            <Card className="bg-[#282828] border-gray-700 sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-[#FFD700]">
                      ${course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${course.originalPrice}
                      </span>
                    )}
                  </div>
                  {course.originalPrice && (
                    <p className="text-sm text-[#1DB954]">
                      Save ${(parseFloat(course.originalPrice) - parseFloat(course.price)).toFixed(2)}
                    </p>
                  )}
                </div>

                <Button className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold py-3 mb-4">
                  <Play className="w-4 h-4 mr-2" />
                  Start Learning
                </Button>

                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Level:</span>
                    <span>{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Students:</span>
                    <span>{course.reviewCount?.toLocaleString() || 0}+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Certificate:</span>
                    <span>Yes</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-600">
                  <h4 className="font-semibold mb-3">Course includes:</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Lifetime access</li>
                    <li>• Mobile and desktop access</li>
                    <li>• Certificate of completion</li>
                    <li>• 30-day money-back guarantee</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
