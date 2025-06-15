import { 
  users, courses, playlists, videos, newsletters,
  type User, type InsertUser, type Course, type InsertCourse,
  type Playlist, type InsertPlaylist, type Video, type InsertVideo,
  type Newsletter, type InsertNewsletter
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  
  // Courses
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Playlists
  getPlaylists(): Promise<Playlist[]>;
  getPlaylist(id: number): Promise<Playlist | undefined>;
  createPlaylist(playlist: InsertPlaylist): Promise<Playlist>;
  
  // Videos
  getVideos(): Promise<Video[]>;
  getVideosByPlaylist(playlistId: number): Promise<Video[]>;
  createVideo(video: InsertVideo): Promise<Video>;
  
  // Newsletter
  subscribeNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private courses: Map<number, Course>;
  private playlists: Map<number, Playlist>;
  private videos: Map<number, Video>;
  private newsletters: Map<number, Newsletter>;
  private currentUserId: number;
  private currentCourseId: number;
  private currentPlaylistId: number;
  private currentVideoId: number;
  private currentNewsletterId: number;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.playlists = new Map();
    this.videos = new Map();
    this.newsletters = new Map();
    this.currentUserId = 1;
    this.currentCourseId = 1;
    this.currentPlaylistId = 1;
    this.currentVideoId = 1;
    this.currentNewsletterId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed playlists
    const playlistsData: Array<Omit<Playlist, 'id' | 'createdAt'>> = [
      {
        title: "Investing 101",
        description: "Essential investment concepts",
        icon: "fas fa-dollar-sign",
        gradient: "from-green-500 to-yellow-500",
        trackCount: 12
      },
      {
        title: "Budgeting Beats",
        description: "Master your money management",
        icon: "fas fa-piggy-bank",
        gradient: "from-yellow-500 to-orange-500",
        trackCount: 8
      },
      {
        title: "Crypto Chronicles",
        description: "Digital currency fundamentals",
        icon: "fas fa-chart-pie",
        gradient: "from-purple-500 to-pink-500",
        trackCount: 15
      },
      {
        title: "Real Estate Rhythms",
        description: "Property investment strategies",
        icon: "fas fa-building",
        gradient: "from-blue-500 to-cyan-500",
        trackCount: 10
      }
    ];

    playlistsData.forEach(playlist => {
      const id = this.currentPlaylistId++;
      this.playlists.set(id, {
        ...playlist,
        id,
        description: playlist.description || null,
        trackCount: playlist.trackCount || null,
        createdAt: new Date()
      });
    });

    // Seed courses
    const coursesData = [
      {
        title: "The Wealth Symphony",
        description: "Complete investment masterclass covering stocks, bonds, ETFs, and portfolio management strategies.",
        instructor: "Market Maestro Series",
        price: "99.00",
        originalPrice: "199.00",
        duration: "8 Hours",
        level: "Intermediate",
        thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        rating: "4.90",
        reviewCount: 2300,
        isPremium: true
      },
      {
        title: "Day Trading Drums",
        description: "Master the rhythm of day trading with technical analysis, risk management, and psychology.",
        instructor: "Trading Pro Academy",
        price: "149.00",
        originalPrice: "299.00",
        duration: "12 Hours",
        level: "Advanced",
        thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        rating: "4.70",
        reviewCount: 1800,
        isPremium: true
      },
      {
        title: "Startup Serenade",
        description: "From idea to IPO - complete guide to building and scaling your business venture.",
        instructor: "Entrepreneur Elite",
        price: "199.00",
        originalPrice: "399.00",
        duration: "15 Hours",
        level: "Advanced",
        thumbnail: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        rating: "4.80",
        reviewCount: 3100,
        isPremium: true
      }
    ];

    coursesData.forEach(course => {
      const id = this.currentCourseId++;
      this.courses.set(id, {
        ...course,
        id,
        originalPrice: course.originalPrice || null,
        rating: course.rating || null,
        reviewCount: course.reviewCount || null,
        isPremium: course.isPremium || null,
        createdAt: new Date()
      });
    });

    // Seed videos
    const videosData: Array<Omit<Video, 'id' | 'createdAt'>> = [
      {
        title: "Stock Market Symphony",
        description: "Understanding market patterns and trends",
        youtubeId: "dQw4w9WgXcQ",
        duration: "45 min",
        thumbnail: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        playlistId: 1
      },
      {
        title: "Crypto Bass Drop",
        description: "Digital currency fundamentals",
        youtubeId: "dQw4w9WgXcQ",
        duration: "32 min",
        thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        playlistId: 3
      },
      {
        title: "Budget Beats",
        description: "Master your monthly money flow",
        youtubeId: "dQw4w9WgXcQ",
        duration: "28 min",
        thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        playlistId: 2
      },
      {
        title: "Property Progression",
        description: "Real estate investment essentials",
        youtubeId: "dQw4w9WgXcQ",
        duration: "52 min",
        thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        playlistId: 4
      }
    ];

    videosData.forEach(video => {
      const id = this.currentVideoId++;
      this.videos.set(id, {
        ...video,
        id,
        description: video.description || null,
        playlistId: video.playlistId || null,
        createdAt: new Date()
      });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.currentCourseId++;
    const course: Course = { 
      ...insertCourse, 
      id,
      createdAt: new Date()
    };
    this.courses.set(id, course);
    return course;
  }

  async getPlaylists(): Promise<Playlist[]> {
    return Array.from(this.playlists.values());
  }

  async getPlaylist(id: number): Promise<Playlist | undefined> {
    return this.playlists.get(id);
  }

  async createPlaylist(insertPlaylist: InsertPlaylist): Promise<Playlist> {
    const id = this.currentPlaylistId++;
    const playlist: Playlist = { 
      ...insertPlaylist, 
      id,
      createdAt: new Date()
    };
    this.playlists.set(id, playlist);
    return playlist;
  }

  async getVideos(): Promise<Video[]> {
    return Array.from(this.videos.values());
  }

  async getVideosByPlaylist(playlistId: number): Promise<Video[]> {
    return Array.from(this.videos.values()).filter(video => video.playlistId === playlistId);
  }

  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    const id = this.currentVideoId++;
    const video: Video = { 
      ...insertVideo, 
      id,
      createdAt: new Date()
    };
    this.videos.set(id, video);
    return video;
  }

  async subscribeNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const id = this.currentNewsletterId++;
    const newsletter: Newsletter = { 
      ...insertNewsletter, 
      id,
      subscribedAt: new Date()
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }
}

export const storage = new MemStorage();
