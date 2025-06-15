import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Heart,
  Volume2,
  List,
  Monitor,
  Maximize2
} from "lucide-react";

export function PlayerBar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState([33]);
  const [volume, setVolume] = useState([75]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#282828] border-t border-gray-700 p-4">
      <div className="flex items-center justify-between">
        {/* Currently Playing */}
        <div className="flex items-center space-x-4 flex-1">
          <img
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80"
            alt="Current lesson"
            className="w-14 h-14 rounded"
          />
          <div>
            <h4 className="text-sm font-medium">Investment Fundamentals</h4>
            <p className="text-xs text-gray-400">Market Maestro Series</p>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              className="w-10 h-10 bg-white text-black rounded-full hover:scale-105 transition-transform"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <SkipForward className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Repeat className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2 w-full max-w-md">
            <span className="text-xs text-gray-400">2:34</span>
            <Slider
              value={progress}
              onValueChange={setProgress}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-xs text-gray-400">8:42</span>
          </div>
        </div>

        {/* Volume & Controls */}
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <List className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Monitor className="w-4 h-4" />
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Volume2 className="w-4 h-4" />
            </Button>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-20"
            />
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
