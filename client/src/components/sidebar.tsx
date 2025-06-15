import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Home, Search, Bookmark } from "lucide-react";
import type { Playlist } from "@shared/schema";

export function Sidebar() {
  const { data: playlists, isLoading } = useQuery<Playlist[]>({
    queryKey: ['/api/playlists'],
  });

  return (
    <div className="w-64 bg-[#191414] p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1DB954] flex items-center">
          <div className="mr-3 bg-gradient-to-br from-[#1DB954] to-[#FFD700] p-2 rounded-lg">
            <span className="text-black text-lg">💰</span>
          </div>
          FinanceFetish
        </h1>
        <p className="text-xs text-gray-400 mt-2 ml-12">Where Money Meets Melody</p>
      </div>

      {/* Navigation */}
      <nav className="mb-8">
        <ul className="space-y-2">
          <li>
            <Button variant="ghost" className="w-full justify-start text-white hover:text-[#1DB954] hover:bg-[#282828] rounded-lg">
              <Home className="w-5 h-5 mr-3" />
              Market Hub
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-[#1DB954] hover:bg-[#282828] rounded-lg">
              <Search className="w-5 h-5 mr-3" />
              Discover Trends
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-[#1DB954] hover:bg-[#282828] rounded-lg">
              <Bookmark className="w-5 h-5 mr-3" />
              My Portfolio
            </Button>
          </li>
        </ul>
      </nav>

      {/* Playlists */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
          Financial Playlists
        </h3>
        <div className="space-y-3">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-600 rounded mr-3" />
                  <div>
                    <div className="h-4 bg-gray-600 rounded w-24 mb-1" />
                    <div className="h-3 bg-gray-600 rounded w-16" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            playlists?.map((playlist) => (
              <Button
                key={playlist.id}
                variant="ghost"
                className="w-full justify-start p-2 h-auto hover:bg-[#282828] transition-colors"
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 bg-gradient-to-br ${playlist.gradient} rounded mr-3 flex items-center justify-center`}>
                    <i className={`${playlist.icon} text-sm`} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">{playlist.title}</p>
                    <p className="text-xs text-gray-400">{playlist.trackCount} tracks</p>
                  </div>
                </div>
              </Button>
            ))
          )}
        </div>
      </div>

      {/* Upgrade Card */}
      <div className="mt-8 bg-gradient-to-br from-[#FFD700] via-[#FF6B35] to-[#1DB954] p-5 rounded-xl text-black relative overflow-hidden">
        <div className="absolute top-2 right-2 opacity-20">
          <span className="text-2xl">🎵</span>
        </div>
        <div className="relative z-10">
          <h4 className="font-black text-sm mb-2">Premium Financial Beats</h4>
          <p className="text-xs mb-4 font-medium">Unlock exclusive wealth-building courses & ad-free financial streaming</p>
          <Button className="w-full bg-black text-white hover:bg-gray-800 text-xs font-bold py-2 rounded-lg">
            Go Premium
          </Button>
        </div>
      </div>
    </div>
  );
}
