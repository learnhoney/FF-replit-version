import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Sidebar } from "@/components/sidebar";
import { PlayerBar } from "@/components/player-bar";
import { CourseCard } from "@/components/course-card";
import { Button } from "@/components/ui/button";
import { Play, Search, Home, Bookmark, ChevronLeft, ChevronRight, User, UserPlus } from "lucide-react";
import type { Course, Video } from "@shared/schema";

export default function HomePage() {
  const { data: courses, isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ['/api/courses'],
  });

  const { data: videos, isLoading: videosLoading } = useQuery<Video[]>({
    queryKey: ['/api/videos'],
  });

  const recentVideos = videos?.slice(0, 4) || [];

  return (
    <div className="flex h-screen bg-[#121212] text-white overflow-hidden">
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-[#282828] p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 bg-black/50 rounded-full hover:bg-black/70"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 bg-black/50 rounded-full hover:bg-black/70"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/signup">
              <Button className="bg-[#1DB954] text-black hover:bg-[#1ed760] font-medium">
                Sign up
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="text-gray-300 hover:text-white font-medium">
                Log in
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="relative bg-gradient-to-br from-[#1DB954] via-[#FFD700] to-[#FF6B35] p-12 rounded-2xl text-black overflow-hidden">
              <div className="absolute inset-0 bg-black/10 backdrop-blur-sm rounded-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                  <span className="text-sm font-medium opacity-70">Now Playing: Financial Freedom</span>
                </div>
                <h1 className="text-5xl font-black mb-6 leading-tight">
                  Drop the Beat on 
                  <br />Your Financial Future
                </h1>
                <p className="text-xl mb-8 max-w-2xl leading-relaxed">
                  Welcome to FinanceFetish – where money meets melody. Stream premium finance education, 
                  master market rhythms, and compose your wealth symphony. Your financial playlist starts here.
                </p>
                <div className="flex space-x-6">
                  <Button className="bg-black text-white hover:bg-gray-800 px-10 py-4 text-lg font-semibold rounded-full">
                    <Play className="w-5 h-5 mr-3" />
                    Hit Play on Wealth
                  </Button>
                  <Button variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white px-10 py-4 text-lg font-semibold rounded-full">
                    Browse the Charts
                  </Button>
                </div>
              </div>
              <div className="absolute right-12 top-1/2 transform -translate-y-1/2 opacity-20">
                <div className="text-[120px] animate-pulse">🎵</div>
              </div>
              <div className="absolute bottom-4 right-4 opacity-30">
                <div className="flex space-x-1">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1 bg-black rounded-full animate-pulse"
                      style={{ 
                        height: `${Math.random() * 40 + 10}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recently Played */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <div className="w-2 h-2 bg-[#1DB954] rounded-full mr-3 animate-pulse"></div>
                Recently Streamed
              </h2>
              <Button variant="link" className="text-gray-400 hover:text-white text-sm">
                View All Tracks
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videosLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-[#282828] p-4 rounded-lg animate-pulse">
                    <div className="w-full h-32 bg-gray-600 rounded mb-4" />
                    <div className="h-4 bg-gray-600 rounded mb-2" />
                    <div className="h-3 bg-gray-600 rounded w-3/4" />
                  </div>
                ))
              ) : (
                recentVideos.map((video) => (
                  <div
                    key={video.id}
                    className="bg-[#282828] p-4 rounded-lg hover:bg-[#535353] transition-colors cursor-pointer group"
                  >
                    <div className="relative mb-4">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-32 object-cover rounded"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          className="w-12 h-12 bg-[#1DB954] hover:bg-[#1ed760] text-black rounded-full"
                        >
                          <Play className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="font-semibold mb-1">{video.title}</h3>
                    <p className="text-sm text-gray-400">{video.description}</p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <span>{video.duration}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Premium Courses */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <div className="w-2 h-2 bg-[#FFD700] rounded-full mr-3 animate-pulse"></div>
                Premium Albums
                <div className="ml-2 bg-gradient-to-r from-[#FFD700] to-[#FF6B35] text-black px-2 py-1 rounded-full text-xs font-semibold">
                  EXCLUSIVE
                </div>
              </h2>
              <Button variant="link" className="text-gray-400 hover:text-white text-sm">
                Explore Collection
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {coursesLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-[#282828] rounded-lg overflow-hidden animate-pulse">
                    <div className="w-full h-40 bg-gray-600" />
                    <div className="p-6">
                      <div className="h-6 bg-gray-600 rounded mb-2" />
                      <div className="h-4 bg-gray-600 rounded mb-4" />
                      <div className="h-10 bg-gray-600 rounded" />
                    </div>
                  </div>
                ))
              ) : (
                courses?.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))
              )}
            </div>
          </section>


        </div>
      </div>

      {/* Right Sidebar - Queue */}
      <div className="w-80 bg-[#191414] p-6 border-l border-gray-700">
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <div className="w-2 h-2 bg-[#1DB954] rounded-full mr-3"></div>
            Next in Financial Queue
          </h3>
          <div className="space-y-4">
            {recentVideos.slice(0, 3).map((video) => (
              <div
                key={video.id}
                className="flex items-center space-x-3 hover:bg-[#282828] p-2 rounded cursor-pointer transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded flex items-center justify-center">
                  <Play className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{video.title}</h4>
                  <p className="text-xs text-gray-400">{video.description}</p>
                </div>
                <div className="text-xs text-gray-500">{video.duration}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <div className="w-2 h-2 bg-[#FFD700] rounded-full mr-3"></div>
            Curated for Your Portfolio
          </h3>
          <div className="space-y-4">
            {courses?.slice(0, 2).map((course) => (
              <div
                key={course.id}
                className="bg-[#282828] p-4 rounded-lg hover:bg-[#535353] transition-colors cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium mb-1">{course.title}</h4>
                    <p className="text-xs text-gray-400 mb-2">{course.instructor}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PlayerBar />
    </div>
  );
}
